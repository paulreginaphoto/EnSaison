import { MapPin } from "lucide-react";
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
  const sortedCountries = [...countryOptions].sort((left, right) =>
    getCountryName(left.code, locale).localeCompare(
      getCountryName(right.code, locale),
      locale,
    ),
  );

  return (
    <label className="control-shell" aria-label={label}>
      <MapPin aria-hidden="true" className="h-4 w-4 text-sage-700" />
      <select
        className="control-select"
        value={selectedCountry}
        onChange={(event) => onCountryChange(event.target.value)}
      >
        {sortedCountries.map((country) => (
          <option key={country.code} value={country.code}>
            {getCountryName(country.code, locale)}
          </option>
        ))}
      </select>
    </label>
  );
}
