import { useMemo, useState } from "react";
import { CategoryTabs } from "./components/CategoryTabs";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { SeasonLegend } from "./components/SeasonLegend";
import { SeasonSection } from "./components/SeasonSection";
import { getCurrentMonth, getMonthLabel } from "./data/months";
import { getProfileForCountry, seasonProfiles } from "./data/regions";
import { dataSources } from "./data/sources";
import { seasonItems } from "./data/seasonItems";
import { getItemName, getSeasonStatus, normalizeSearch, resolveSeason } from "./lib/season";
import { t } from "./i18n";
import type { CategoryFilter, Locale, SeasonCategory } from "./types";

function AboutPage() {
  const homeHref = import.meta.env.BASE_URL;
  const [locale, setLocale] = useState<Locale>("fr");
  const copy = t(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-8 sm:px-8">
      <Header
        labels={{
          country: copy.country,
          language: copy.language,
          month: copy.month,
        }}
        locale={locale}
        selectedCountry="CH"
        selectedMonth={getCurrentMonth()}
        onCountryChange={() => undefined}
        onLocaleChange={setLocale}
        onMonthChange={() => undefined}
      />
      <section className="mt-10 rounded-[2rem] bg-white/80 p-6 shadow-soft sm:p-8">
        <h2 className="text-2xl font-semibold text-ink">{copy.about}</h2>
        <div className="mt-5 space-y-4 text-base leading-7 text-ink/70">
          {copy.aboutCopy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <a className="mt-8 inline-flex text-sm font-semibold text-sage-700" href={homeHref}>
          {copy.back}
        </a>
      </section>
    </main>
  );
}

function MainPage() {
  const aboutHref = `${import.meta.env.BASE_URL}about`;
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);
  const [locale, setLocale] = useState<Locale>("fr");
  const [selectedCountry, setSelectedCountry] = useState("CH");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");
  const copy = t(locale);
  const selectedProfileId = getProfileForCountry(selectedCountry);
  const selectedProfile = seasonProfiles[selectedProfileId];

  const filteredItems = useMemo(() => {
    const searchValue = normalizeSearch(search);

    return seasonItems
      .filter((item) =>
        selectedCategory === "all" ? true : item.category === selectedCategory,
      )
      .filter((item) =>
        normalizeSearch(
          [
            item.name,
            item.names?.en,
            item.names?.es,
            item.names?.de,
            item.names?.it,
            item.names?.pt,
            getItemName(item, locale),
          ]
            .filter(Boolean)
            .join(" "),
        ).includes(searchValue),
      )
      .map((item) => ({
        item,
        season: resolveSeason(item, selectedProfileId, locale),
      }))
      .map(({ item, season }) => ({
        item,
        season,
        status: getSeasonStatus(season, selectedMonth),
      }))
      .sort((left, right) =>
        getItemName(left.item, locale).localeCompare(
          getItemName(right.item, locale),
          locale,
        ),
      );
  }, [locale, search, selectedCategory, selectedMonth, selectedProfileId]);

  const seasonalItems = filteredItems.filter(({ status }) => status !== "out");
  const outItems = filteredItems.filter(({ status }) => status === "out");
  const categoryLabels: Record<CategoryFilter, string> = {
    all: copy.all,
    ...copy.categories,
  };
  const itemLabels = {
    categories: copy.categories as Record<SeasonCategory, string>,
    statuses: copy.statuses,
    confidence: copy.confidence,
  };
  const sourceLinks = selectedProfile.sourceIds.map((sourceId) => dataSources[sourceId]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-5 sm:px-7 sm:py-8">
      <div className="rounded-[2rem] bg-cream/75 p-3 shadow-soft sm:p-5">
        <div className="rounded-[1.6rem] border border-white/75 bg-cream/90 p-4 sm:p-6">
          <Header
            labels={{
              country: copy.country,
              language: copy.language,
              month: copy.month,
            }}
            locale={locale}
            selectedCountry={selectedCountry}
            selectedMonth={selectedMonth}
            onCountryChange={setSelectedCountry}
            onLocaleChange={setLocale}
            onMonthChange={setSelectedMonth}
          />

          <div className="mt-5 space-y-3">
            <SearchBar
              placeholder={copy.search}
              value={search}
              onChange={setSearch}
            />
            <CategoryTabs
              labels={categoryLabels}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <SeasonLegend labels={copy.statuses} />
          </div>

          <div className="mt-4 rounded-[1.15rem] border border-sage-100 bg-white/65 p-3 text-sm font-semibold text-ink/58">
            <p>
              {selectedProfile.labels[locale]} ·{" "}
              {selectedProfile.confidenceLabel[locale]}
            </p>
            <p className="mt-1 font-medium">{copy.dataNote}</p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <SeasonSection
              emptyLabel={copy.noResult}
              items={seasonalItems}
              labels={itemLabels}
              locale={locale}
              title={copy.inSeason}
            />
            <SeasonSection
              emptyLabel={copy.noResult}
              items={outItems}
              labels={itemLabels}
              locale={locale}
              title={copy.outSeason}
            />
          </div>

          <footer className="mt-6 flex flex-col gap-2 text-sm font-semibold text-ink/48 sm:flex-row sm:items-center sm:justify-between">
            <span>{copy.footer}</span>
            <span>
              {copy.source}:{" "}
              {sourceLinks.map((source, index) => (
                <span key={source.url}>
                  <a className="text-sage-700" href={source.url}>
                    {index + 1}
                  </a>
                  {index < sourceLinks.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
            <a className="text-sage-700" href={aboutHref}>
              {copy.about}
            </a>
          </footer>
        </div>
      </div>
      <p className="sr-only">
        {copy.month}: {getMonthLabel(selectedMonth, locale)}
      </p>
    </main>
  );
}

export default function App() {
  return window.location.pathname.replace(/\/$/, "").endsWith("/about") ? (
    <AboutPage />
  ) : (
    <MainPage />
  );
}
