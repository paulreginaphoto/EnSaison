import { useEffect, useMemo, useState } from "react";
import { CategoryTabs } from "./components/CategoryTabs";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { SeasonLegend } from "./components/SeasonLegend";
import { SeasonSection } from "./components/SeasonSection";
import { getCurrentMonth, getMonthLabel } from "./data/months";
import { countryOptions, getCountryName, getProfileForCountry, seasonProfiles } from "./data/regions";
import { dataSources } from "./data/sources";
import { seasonItems } from "./data/seasonItems";
import { getItemName, getSeasonStatus, normalizeSearch, resolveSeason } from "./lib/season";
import { t } from "./i18n";
import type { CategoryGroup, Locale, SeasonCategory, SeasonView } from "./types";

const defaultCountry = "CH";
const defaultLocale: Locale = "fr";
const defaultCategory: CategoryGroup = "all";
const defaultView: SeasonView = "now";

const validLocales = new Set<Locale>(["fr", "en", "es", "de", "it", "pt"]);
const validCategories = new Set<CategoryGroup>([
  "all",
  "fruit",
  "vegetable",
  "mushroom",
  "protein",
  "sea",
  "pantry",
]);
const validViews = new Set<SeasonView>(["now", "all", "variable", "out"]);
const validCountries = new Set(countryOptions.map((country) => country.code));

const categoryGroups: Record<CategoryGroup, SeasonCategory[] | null> = {
  all: null,
  fruit: ["fruit"],
  vegetable: ["vegetable", "tuber", "allium", "herb", "legume"],
  mushroom: ["mushroom"],
  protein: ["meat", "poultry", "egg", "dairy", "legume", "insect"],
  sea: ["fish", "seafood", "seaweed"],
  pantry: [
    "grain",
    "nut",
    "seed",
    "spice",
    "fat",
    "beverage",
    "sweetener",
    "condiment",
    "prepared",
    "snack",
  ],
};

const readInitialState = () => {
  const params = new URLSearchParams(window.location.search);
  const parsedMonth = Number(params.get("month"));
  const localeParam = params.get("lang") as Locale | null;
  const categoryParam = params.get("category") as CategoryGroup | null;
  const viewParam = params.get("view") as SeasonView | null;
  const countryParam = params.get("country")?.toUpperCase() ?? defaultCountry;

  return {
    month:
      Number.isInteger(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12
        ? parsedMonth
        : getCurrentMonth(),
    locale: localeParam && validLocales.has(localeParam) ? localeParam : defaultLocale,
    country: validCountries.has(countryParam) ? countryParam : defaultCountry,
    category:
      categoryParam && validCategories.has(categoryParam)
        ? categoryParam
        : defaultCategory,
    view: viewParam && validViews.has(viewParam) ? viewParam : defaultView,
    search: params.get("q") ?? "",
  };
};

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
  const initialState = useMemo(readInitialState, []);
  const [selectedMonth, setSelectedMonth] = useState(initialState.month);
  const [locale, setLocale] = useState<Locale>(initialState.locale);
  const [selectedCountry, setSelectedCountry] = useState(initialState.country);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryGroup>(initialState.category);
  const [selectedView, setSelectedView] = useState<SeasonView>(initialState.view);
  const [search, setSearch] = useState(initialState.search);
  const copy = t(locale);
  const selectedProfileId = getProfileForCountry(selectedCountry);
  const selectedProfile = seasonProfiles[selectedProfileId];
  const countryName = getCountryName(selectedCountry, locale);
  const monthLabel = getMonthLabel(selectedMonth, locale);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCountry !== defaultCountry) params.set("country", selectedCountry);
    if (locale !== defaultLocale) params.set("lang", locale);
    if (selectedMonth !== getCurrentMonth()) {
      params.set("month", String(selectedMonth));
    }
    if (selectedCategory !== defaultCategory) {
      params.set("category", selectedCategory);
    }
    if (selectedView !== defaultView) params.set("view", selectedView);
    if (search.trim()) params.set("q", search.trim());

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
  }, [locale, search, selectedCategory, selectedCountry, selectedMonth, selectedView]);

  const filteredItems = useMemo(() => {
    const searchValue = normalizeSearch(search);
    const allowedCategories = categoryGroups[selectedCategory];

    return seasonItems
      .filter((item) =>
        allowedCategories ? allowedCategories.includes(item.category) : true,
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
        season: resolveSeason(item, selectedProfileId, selectedCountry, locale),
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
  }, [locale, search, selectedCategory, selectedCountry, selectedMonth, selectedProfileId]);

  const visibleItems = filteredItems.filter(({ status }) => {
    if (selectedView === "now") {
      return status === "in-season" || status === "soon";
    }
    if (selectedView === "variable") return status === "variable";
    if (selectedView === "out") return status === "out";
    return true;
  });
  const viewTitle =
    selectedView === "now"
      ? copy.inSeason
      : selectedView === "variable"
        ? copy.statuses.variable
        : selectedView === "out"
          ? copy.outSeason
          : copy.all;
  const statusViews: SeasonView[] = ["now", "all", "variable", "out"];
  const itemLabels = {
    categories: copy.categories as Record<SeasonCategory, string>,
    statuses: copy.statuses,
    confidence: copy.confidence,
    sourceShort: copy.sourceShort,
    details: copy.details,
    hideDetails: copy.hideDetails,
    dataLevel: copy.dataLevel,
    seasonPeriod: copy.seasonPeriod,
  };
  const sourceLinks = selectedProfile.sourceIds.map((sourceId) => dataSources[sourceId]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-5 sm:px-7 sm:py-8">
      <div className="rounded-[1.7rem] bg-cream/75 p-2.5 shadow-soft sm:p-4">
        <div className="rounded-[1.3rem] border border-white/75 bg-cream/90 p-4 sm:p-6">
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

          <section className="mt-6 rounded-[1.25rem] bg-white/70 p-4 shadow-row">
            <p className="text-sm font-semibold text-ink/55">
              {countryName} · {monthLabel}
            </p>
            <h2 className="mt-1 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              {copy.chooseNow}
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-ink/62">
              {visibleItems.length} {copy.matchingFoods} · {copy.profilePrefix}:{" "}
              {selectedProfile.labels[locale]} ·{" "}
              {selectedProfile.confidenceLabel[locale].toLowerCase()}
            </p>
          </section>

          <div className="mt-4 space-y-3">
            <SearchBar
              label={copy.search}
              placeholder={copy.search}
              value={search}
              clearLabel={copy.clearSearch}
              onChange={setSearch}
            />
            <CategoryTabs
              labels={copy.categoryGroups}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" aria-label="Statut">
              {statusViews.map((view) => {
                const isSelected = selectedView === view;
                return (
                  <button
                    aria-pressed={isSelected}
                    className={`category-tab ${isSelected ? "category-tab-active" : ""}`}
                    key={view}
                    type="button"
                    onClick={() => setSelectedView(view)}
                  >
                    {copy.seasonViews[view]}
                  </button>
                );
              })}
            </div>
            <SeasonLegend labels={copy.statuses} />
          </div>

          <div className="mt-5 grid gap-4">
            <SeasonSection
              emptyLabel={copy.noResult}
              items={visibleItems}
              labels={itemLabels}
              locale={locale}
              title={viewTitle}
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
