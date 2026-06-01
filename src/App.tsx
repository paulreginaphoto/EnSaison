import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Leaf,
  MapPin,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import fruitImage from "./assets/produce/category-fruits.webp";
import heroMarketImage from "./assets/produce/hero-market.webp";
import mushroomImage from "./assets/produce/category-mushrooms.webp";
import vegetableImage from "./assets/produce/category-vegetables.webp";
import { CategoryTabs } from "./components/CategoryTabs";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { SeasonLegend } from "./components/SeasonLegend";
import { SeasonSection } from "./components/SeasonSection";
import { getCurrentMonth, getMonthLabel } from "./data/months";
import {
  countryDataScopes,
  countryOptions,
  getCountryName,
  getProfileForCountry,
  seasonProfiles,
} from "./data/regions";
import { dataSources } from "./data/sources";
import { seasonItems } from "./data/seasonItems";
import { getItemName, getSeasonStatus, normalizeSearch, resolveSeason } from "./lib/season";
import { t } from "./i18n";
import type { CategoryGroup, Locale, SeasonCategory, SeasonView } from "./types";

const defaultCountry = "CH";
const defaultLocale: Locale = "fr";
const defaultCategory: CategoryGroup = "all";
const defaultView: SeasonView = "all";

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
const validViews = new Set<SeasonView>(["now", "all", "out"]);
const validCountries = new Set(countryOptions.map((country) => country.code));

const focusCategories: SeasonCategory[] = [
  "fruit",
  "vegetable",
  "tuber",
  "allium",
  "herb",
  "legume",
  "mushroom",
];

const categoryGroups: Record<CategoryGroup, SeasonCategory[] | null> = {
  all: focusCategories,
  fruit: ["fruit"],
  vegetable: ["vegetable", "tuber", "allium", "herb", "legume"],
  mushroom: ["mushroom"],
  protein: [],
  sea: [],
  pantry: [],
};

const focusCategorySet = new Set(focusCategories);

const featureCategories: ("fruit" | "vegetable" | "mushroom")[] = [
  "fruit",
  "vegetable",
  "mushroom",
];

const categoryArt: Record<
  "fruit" | "vegetable" | "mushroom",
  { image: string; accentClass: string; icon: LucideIcon }
> = {
  fruit: {
    image: fruitImage,
    accentClass: "category-card-fruit",
    icon: Heart,
  },
  vegetable: {
    image: vegetableImage,
    accentClass: "category-card-vegetable",
    icon: Leaf,
  },
  mushroom: {
    image: mushroomImage,
    accentClass: "category-card-mushroom",
    icon: Sprout,
  },
};

const heroIntros: Record<Locale, string> = {
  fr: "Des produits de saison, au bon moment, près de chez vous.",
  en: "Seasonal produce, at the right moment, close to you.",
  es: "Productos de temporada, en el momento justo, cerca de ti.",
  de: "Saisonale Produkte, zum richtigen Zeitpunkt, in deiner Nähe.",
  it: "Prodotti di stagione, al momento giusto, vicino a te.",
  pt: "Produtos da época, no momento certo, perto de si.",
};

function getSeasonResultTitle(locale: Locale, monthLabel: string) {
  if (locale === "fr") return `Saisonnalité en ${monthLabel}`;
  if (locale === "es") return `Temporada en ${monthLabel}`;
  if (locale === "de") return `Saisonalität im ${monthLabel}`;
  if (locale === "it") return `Stagionalità in ${monthLabel}`;
  if (locale === "pt") return `Sazonalidade em ${monthLabel}`;
  return `Seasonality in ${monthLabel}`;
}

function getSeasonResultSubtitle(locale: Locale, countryName: string, viewTitle: string) {
  if (locale === "fr") {
    return `${countryName} · ${viewTitle} · statut du mois choisi et période habituelle pour chaque aliment.`;
  }
  if (locale === "es") {
    return `${countryName} · ${viewTitle} · estado del mes elegido y temporada habitual de cada alimento.`;
  }
  if (locale === "de") {
    return `${countryName} · ${viewTitle} · Status des gewählten Monats und übliche Saison je Lebensmittel.`;
  }
  if (locale === "it") {
    return `${countryName} · ${viewTitle} · stato del mese scelto e stagione abituale per ogni alimento.`;
  }
  if (locale === "pt") {
    return `${countryName} · ${viewTitle} · estado do mês escolhido e época habitual de cada alimento.`;
  }
  return `${countryName} · ${viewTitle} · selected-month status and usual season for each food.`;
}

const featuredItemOrder = new Map(
  ["fraise", "asperge", "radis", "orange"].map((itemId, index) => [itemId, index]),
);

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
    <main className="app-page">
      <div className="dashboard-shell max-w-3xl">
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
      <section className="about-card">
        <h2 className="about-title">{copy.about}</h2>
        <div className="mt-5 space-y-4 text-base leading-7 text-ink/70">
          {copy.aboutCopy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <a className="mt-8 inline-flex text-sm font-semibold text-sage-700" href={homeHref}>
          {copy.back}
        </a>
      </section>
      </div>
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
  const selectedCountryDataScope = countryDataScopes[selectedCountry];
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

  const resolvedItems = useMemo(
    () =>
      seasonItems
        .map((item) => ({
          item,
          season: resolveSeason(item, selectedProfileId, selectedCountry, locale),
        }))
        .map(({ item, season }) => ({
          item,
          season,
          status: getSeasonStatus(season, selectedMonth),
        })),
    [locale, selectedCountry, selectedMonth, selectedProfileId],
  );

  const dashboardItems = useMemo(
    () =>
      resolvedItems.filter(
        ({ item, status }) => focusCategorySet.has(item.category) && status !== "variable",
      ),
    [resolvedItems],
  );

  const filteredItems = useMemo(() => {
    const searchValue = normalizeSearch(search);
    const allowEveryCategoryForSearch = Boolean(searchValue) && selectedCategory === "all";
    const allowedCategories = allowEveryCategoryForSearch
      ? null
      : categoryGroups[selectedCategory];
    const sourceItems = allowEveryCategoryForSearch
      ? resolvedItems.filter(({ status }) => status !== "variable")
      : dashboardItems;

    return sourceItems
      .filter((item) =>
        allowedCategories ? allowedCategories.includes(item.item.category) : true,
      )
      .filter(({ item }) =>
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
      .sort((left, right) => {
        if (!searchValue && selectedCategory === "all") {
          const leftPriority =
            featuredItemOrder.get(left.item.id) ?? Number.POSITIVE_INFINITY;
          const rightPriority =
            featuredItemOrder.get(right.item.id) ?? Number.POSITIVE_INFINITY;

          if (leftPriority !== rightPriority) return leftPriority - rightPriority;
        }

        return getItemName(left.item, locale).localeCompare(
          getItemName(right.item, locale),
          locale,
        );
      });
  }, [dashboardItems, locale, resolvedItems, search, selectedCategory]);

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
  const seasonResultTitle = getSeasonResultTitle(locale, monthLabel);
  const seasonResultSubtitle = getSeasonResultSubtitle(locale, countryName, viewTitle);
  const statusViews: SeasonView[] = ["now", "all", "out"];
  const categorySummaries = featureCategories.map((category) => {
    const allowedCategories = categoryGroups[category] ?? [];
    const items = dashboardItems.filter(({ item }) =>
      allowedCategories.includes(item.category),
    );

    return {
      category,
      count: items.filter(({ status }) => status === "in-season" || status === "soon")
        .length,
    };
  });
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
  const sourceLinks = Array.from(
    new Set([
      ...selectedProfile.sourceIds,
      ...(selectedCountryDataScope?.sourceIds ?? []),
    ]),
  ).map((sourceId) => dataSources[sourceId]);
  return (
    <main className="app-page">
      <div className="dashboard-shell">
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

        <section className="hero-bento" aria-labelledby="dashboard-title">
          <article className="hero-card">
            <div className="hero-copy">
              <div className="hero-meta-row">
                <span>
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                  {countryName}
                </span>
                <span>
                  <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  {monthLabel}
                </span>
              </div>
              <h2 className="hero-title" id="dashboard-title">
                {copy.chooseNow}
              </h2>
              <p className="hero-description">{heroIntros[locale]}</p>
              <div className="hero-actions">
                <a className="hero-cta" href="#season-results">
                  <Sprout aria-hidden="true" className="h-5 w-5" />
                  {locale === "fr" ? "Voir les produits de saison" : copy.seasonal}
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-photo-window">
                <img src={heroMarketImage} alt="" />
              </div>
            </div>
          </article>
        </section>

        <section className="category-bento" aria-label="Catégories rapides">
          {categorySummaries.map(({ category, count }) => {
            const art = categoryArt[category];
            const Icon = art.icon;
            const isSelected = selectedCategory === category;

            return (
              <button
                aria-pressed={isSelected}
                aria-label={`Carte ${copy.categoryGroups[category]}`}
                className={`category-card ${art.accentClass} ${
                  isSelected ? "category-card-active" : ""
                }`}
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
              >
                <span className="category-card-title">{copy.categoryGroups[category]}</span>
                <span className="category-card-count">
                  {count} {copy.matchingFoods}
                </span>
                <Icon aria-hidden="true" className="category-card-mark" />
                <img src={art.image} alt="" className="category-card-icon" />
              </button>
            );
          })}
        </section>

        <section className="filter-panel" aria-label="Filtres rapides">
          <CategoryTabs
            labels={copy.categoryGroups}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <div className="quick-chip-row" aria-label="Statut">
            {statusViews.map((view) => {
              const isSelected = selectedView === view;
              return (
                <button
                  aria-pressed={isSelected}
                  className={`quick-chip ${isSelected ? "quick-chip-active" : ""}`}
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
          <SearchBar
            label={copy.search}
            placeholder={copy.search}
            value={search}
            clearLabel={copy.clearSearch}
            onChange={setSearch}
          />
        </section>

        <div className="results-grid" id="season-results">
          <SeasonSection
            emptyLabel={copy.noResult}
            items={visibleItems}
            labels={itemLabels}
            locale={locale}
            selectedMonth={selectedMonth}
            subtitle={seasonResultSubtitle}
            title={seasonResultTitle}
          />
        </div>

        <footer className="app-footer">
          <span>{copy.footer}</span>
          <span>
            {copy.source}:{" "}
            {sourceLinks.map((source, index) => (
              <span key={source.url}>
                <a href={source.url}>{index + 1}</a>
                {index < sourceLinks.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
          <a href={aboutHref}>{copy.about}</a>
        </footer>
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
