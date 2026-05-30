import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, placeholder, onChange }: SearchBarProps) {
  return (
    <label className="relative block" aria-label="Recherche">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sage-700/75"
      />
      <input
        className="h-14 w-full rounded-[1.35rem] border border-sage-100 bg-white/90 pl-12 pr-4 text-base font-medium text-ink shadow-soft outline-none transition focus:border-sage-500 focus:ring-4 focus:ring-sage-100"
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
