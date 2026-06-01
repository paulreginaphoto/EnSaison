import { ChevronDown, Languages } from "lucide-react";
import { locales } from "../i18n";
import type { Locale } from "../types";

type LanguageSelectorProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  label: string;
};

export function LanguageSelector({
  locale,
  onLocaleChange,
  label,
}: LanguageSelectorProps) {
  return (
    <label className="control-shell">
      <Languages aria-hidden="true" className="control-icon" />
      <span className="control-copy">
        <span className="control-label">{label}</span>
        <select
          aria-label={label}
          className="control-select"
          name="language"
          value={locale}
          onChange={(event) => onLocaleChange(event.target.value as Locale)}
        >
          {locales.map((entry) => (
            <option key={entry.value} value={entry.value}>
              {entry.label}
            </option>
          ))}
        </select>
      </span>
      <ChevronDown aria-hidden="true" className="control-chevron" />
    </label>
  );
}
