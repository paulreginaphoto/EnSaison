import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export type SelectorOption = {
  value: string;
  label: string;
  prefix?: ReactNode;
};

type SelectorControlProps = {
  align?: "start" | "end" | "stretch";
  className?: string;
  emptyLabel?: string;
  icon: ReactNode;
  label: string;
  name: string;
  onChange: (value: string) => void;
  options: SelectorOption[];
  searchable?: boolean;
  searchLabel?: string;
  value: string;
};

export function SelectorControl({
  align = "start",
  className = "",
  emptyLabel = "Aucun résultat",
  icon,
  label,
  name,
  onChange,
  options,
  searchable = false,
  searchLabel = "Rechercher",
  value,
}: SelectorControlProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredOptions = useMemo(
    () =>
      normalizedQuery
        ? options.filter((option) =>
            option.label.toLocaleLowerCase().includes(normalizedQuery),
          )
        : options,
    [normalizedQuery, options],
  );

  useEffect(() => {
    if (!isOpen) return;

    const selectedIndex = filteredOptions.findIndex(
      (option) => option.value === value,
    );
    setActiveIndex(Math.max(0, selectedIndex));

    window.requestAnimationFrame(() => {
      searchRef.current?.focus();
      listRef.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView({ block: "nearest" });
    });
  }, [filteredOptions, isOpen, value]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  const selectOption = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
    setQuery("");
    buttonRef.current?.focus();
  };

  const moveActiveOption = (direction: 1 | -1) => {
    if (filteredOptions.length === 0) return;
    setActiveIndex((index) =>
      (index + direction + filteredOptions.length) % filteredOptions.length,
    );
  };

  const handleMenuKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      setQuery("");
      buttonRef.current?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActiveOption(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActiveOption(-1);
      return;
    }

    if (event.key === "Enter" && filteredOptions[activeIndex]) {
      event.preventDefault();
      selectOption(filteredOptions[activeIndex].value);
    }
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div
      className={`control-root ${className}`}
      ref={rootRef}
      onKeyDown={isOpen ? handleMenuKeyDown : undefined}
    >
      <button
        aria-controls={isOpen ? listboxId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${label} ${selectedOption?.label ?? ""}`}
        className="control-shell"
        data-control-name={name}
        data-state={isOpen ? "open" : "closed"}
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        onKeyDown={handleButtonKeyDown}
      >
        {icon}
        <span className="control-copy">
          <span className="control-label">{label}</span>
          <span className="control-value">
            {selectedOption?.prefix}
            <span className="control-value-text">{selectedOption?.label}</span>
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`control-chevron ${isOpen ? "control-chevron-open" : ""}`}
        />
      </button>

      {isOpen ? (
        <div className={`control-popover control-popover-${align}`}>
          {searchable ? (
            <label className="control-search-shell">
              <Search aria-hidden="true" className="control-search-icon" />
              <input
                aria-label={searchLabel}
                className="control-search-input"
                placeholder={searchLabel}
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
              />
            </label>
          ) : null}

          <div
            aria-label={label}
            className="control-options"
            id={listboxId}
            ref={listRef}
            role="listbox"
            tabIndex={-1}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value;
                const isActive = index === activeIndex;

                return (
                  <button
                    aria-selected={isSelected}
                    className={`control-option ${isActive ? "control-option-active" : ""}`}
                    data-option-value={option.value}
                    key={option.value}
                    role="option"
                    type="button"
                    onClick={() => selectOption(option.value)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className="control-option-label">
                      {option.prefix}
                      <span className="control-option-text">{option.label}</span>
                    </span>
                    {isSelected ? (
                      <Check aria-hidden="true" className="control-option-check" />
                    ) : null}
                  </button>
                );
              })
            ) : (
              <p className="control-empty">{emptyLabel}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
