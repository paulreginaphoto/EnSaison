import { MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  const selectedName =
    sortedCountries.find((country) => country.code === selectedCountry)?.name ??
    selectedCountry;
  const [draftCountry, setDraftCountry] = useState(selectedName);
  const listId = `countries-${locale}`;

  useEffect(() => {
    setDraftCountry(selectedName);
  }, [selectedName]);

  const commitCountry = (value: string) => {
    setDraftCountry(value);
    const normalizedValue = value.trim().toLowerCase();
    const match = sortedCountries.find(
      (country) =>
        country.name.toLowerCase() === normalizedValue ||
        country.code.toLowerCase() === normalizedValue,
    );
    if (match) onCountryChange(match.code);
  };

  return (
    <label className="control-shell" aria-label={label}>
      <MapPin aria-hidden="true" className="h-4 w-4 text-sage-700" />
      <input
        autoComplete="off"
        className="control-select"
        inputMode="search"
        list={listId}
        name="country"
        spellCheck={false}
        value={draftCountry}
        onBlur={() => setDraftCountry(selectedName)}
        onChange={(event) => commitCountry(event.target.value)}
      />
      <datalist id={listId}>
        {sortedCountries.map((country) => (
          <option key={country.code} value={country.name}>
            {country.code}
          </option>
        ))}
      </datalist>
    </label>
  );
}
