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
    <label className="relative block" aria-label={label}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sage-700/75"
      />
      <input
        autoComplete="off"
        className="h-14 w-full rounded-[1.35rem] border border-sage-100 bg-white/90 pl-12 pr-12 text-base font-medium text-ink shadow-soft outline-none transition-[border-color,box-shadow] focus:border-sage-500 focus:ring-4 focus:ring-sage-100"
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
          className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-ink/55 transition-[background-color,color,transform] hover:bg-sage-50 hover:text-ink active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
          type="button"
          onClick={() => onChange("")}
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      ) : null}
    </label>
  );
}
