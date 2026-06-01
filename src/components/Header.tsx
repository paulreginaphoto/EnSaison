import appLogo from "../assets/icons/app-logo.svg";
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
    <header className="site-header">
      <a href={homeHref} className="brand-lockup" aria-label="DeSaison">
        <img src={appLogo} alt="" className="brand-logo" />
        <h1 className="sr-only">DeSaison</h1>
      </a>

      <div className="header-controls">
        <LocationSelector
          label={labels.country}
          locale={locale}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
        <MonthSelector
          label={labels.month}
          locale={locale}
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
        />
        <LanguageSelector
          label={labels.language}
          locale={locale}
          onLocaleChange={onLocaleChange}
        />
      </div>
    </header>
  );
}
