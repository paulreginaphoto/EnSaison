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

const flagCdnBaseUrl = "https://flagcdn.com/w40";

function CountryFlag({ code }: { code: string }) {
  const normalizedCode = code.toLowerCase();

  return (
    <span aria-hidden="true" className="country-flag" data-country-flag={code}>
      <img
        alt=""
        className="country-flag-image"
        draggable="false"
        loading="lazy"
        src={`${flagCdnBaseUrl}/${normalizedCode}.png`}
      />
    </span>
  );
}

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
  const selectorOptions = useMemo(
    () =>
      sortedCountries.map((country) => ({
        label: country.name,
        prefix: <CountryFlag code={country.code} />,
        value: country.code,
      })),
    [sortedCountries],
  );

  return (
    <SelectorControl
      align="stretch"
      className="control-root-location"
      emptyLabel="Aucun pays trouvé"
      icon={<MapPin aria-hidden="true" className="control-icon" />}
      label={label}
      name="country"
      options={selectorOptions}
      searchable
      searchLabel="Rechercher un pays"
      value={selectedCountry}
      onChange={onCountryChange}
    />
  );
}
