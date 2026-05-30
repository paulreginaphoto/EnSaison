import appIcon from "../assets/icons/app-icon.svg";
import type { Locale } from "../types";
import { LanguageSelector } from "./LanguageSelector";
import { LocationSelector } from "./LocationSelector";
import { MonthSelector } from "./MonthSelector";

type HeaderProps = {
  locale: Locale;
  selectedMonth: number;
  selectedCountry: string;
  labels: {
    country: string;
    language: string;
    month: string;
  };
  onCountryChange: (country: string) => void;
  onLocaleChange: (locale: Locale) => void;
  onMonthChange: (month: number) => void;
};

export function Header({
  locale,
  selectedMonth,
  selectedCountry,
  labels,
  onCountryChange,
  onLocaleChange,
  onMonthChange,
}: HeaderProps) {
  const homeHref = import.meta.env.BASE_URL;

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <a href={homeHref} className="flex items-center gap-3" aria-label="DeSaison">
        <img src={appIcon} alt="" className="h-12 w-12" />
        <div>
          <h1 className="text-3xl font-semibold leading-none text-ink">
            DeSaison
          </h1>
        </div>
      </a>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
        <LocationSelector
          label={labels.country}
          locale={locale}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
        <LanguageSelector
          label={labels.language}
          locale={locale}
          onLocaleChange={onLocaleChange}
        />
        <MonthSelector
          label={labels.month}
          locale={locale}
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
        />
      </div>
    </header>
  );
}
