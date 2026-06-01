import { MapPin } from "lucide-react";
import { useMemo } from "react";
import { countryOptions, getCountryName } from "../data/regions";
import type { Locale } from "../types";
import { SelectorControl } from "./SelectorControl";

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
    <SelectorControl
      align="stretch"
      className="control-root-location"
      emptyLabel="Aucun pays trouvé"
      icon={<MapPin aria-hidden="true" className="control-icon" />}
      label={label}
      name="country"
      options={sortedCountries.map((country) => ({
        label: country.name,
        value: country.code,
      }))}
      searchable
      searchLabel="Rechercher un pays"
      value={selectedCountry}
      onChange={onCountryChange}
    />
  );
}
