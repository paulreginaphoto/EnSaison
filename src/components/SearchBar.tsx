import { Search, X } from "lucide-react";

type SearchBarProps = {
  value: string;
  placeholder: string;
  label: string;
  clearLabel: string;
  onChange: (value: string) => void;
};

export function SearchBar({
  value,
  placeholder,
  label,
  clearLabel,
  onChange,
}: SearchBarProps) {
  return (
    <label className="search-shell" aria-label={label}>
      <Search
        aria-hidden="true"
        className="search-icon"
      />
      <input
        autoComplete="off"
        className="search-input"
        name="food-search"
        placeholder={placeholder}
        spellCheck={false}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button
          aria-label={clearLabel}
          className="search-clear"
          type="button"
          onClick={() => onChange("")}
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
    </label>
  );
}
