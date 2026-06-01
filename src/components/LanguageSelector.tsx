import { Languages } from "lucide-react";
import { locales } from "../i18n";
import type { Locale } from "../types";
import { SelectorControl } from "./SelectorControl";

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
    <SelectorControl
      align="end"
      icon={<Languages aria-hidden="true" className="control-icon" />}
      label={label}
      name="language"
      options={locales.map((entry) => ({
        label: entry.label,
        value: entry.value,
      }))}
      value={locale}
      onChange={(value) => onLocaleChange(value as Locale)}
    />
  );
}
