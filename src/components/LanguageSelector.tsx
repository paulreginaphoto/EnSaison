import { Languages } from "lucide-react";
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
    <label className="control-shell" aria-label={label}>
      <Languages aria-hidden="true" className="h-4 w-4 text-sage-700" />
      <select
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
    </label>
  );
}
