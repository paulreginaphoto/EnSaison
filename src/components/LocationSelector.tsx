import { ChevronDown, MapPin } from "lucide-react";
import { useMemo } from "react";
import { countryOptions, getCountryName } from "../data/regions";
import type { Locale } from "../types";

type LocationSelectorProps = {
  locale: Locale;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  label: string;
};

export function LocationSelector({
  locale,
  selectedCountry,
  onCountryChange,
  label,
}: LocationSelectorProps) {
  const sortedCountries = useMemo(
    () =>
      [...countryOptions]
        .map((country) => ({
          code: country.code,
          name: getCountryName(country.code, locale),
        }))
        .sort((left, right) => left.name.localeCompare(right.name, locale)),
    [locale],
  );
  return (
    <label className="control-shell control-shell-location">
      <MapPin aria-hidden="true" className="control-icon" />
      <span className="control-copy">
        <span className="control-label">{label}</span>
        <select
          aria-label={label}
          className="control-select"
          name="country"
          value={selectedCountry}
          onChange={(event) => onCountryChange(event.target.value)}
        >
          {sortedCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </span>
      <ChevronDown aria-hidden="true" className="control-chevron" />
    </label>
  );
}
