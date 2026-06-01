import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sprout,
} from "lucide-react";
import fruitImage from "./assets/produce/category-fruits.webp";
import mushroomImage from "./assets/produce/category-mushrooms.webp";
import vegetableImage from "./assets/produce/category-vegetables.webp";
import { CategoryFeatureCard } from "./components/CategoryFeatureCard";
import { CategoryTabs } from "./components/CategoryTabs";
import { Header } from "./components/Header";
import { ProduceIcon } from "./components/ProduceIcon";
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
import { getItemThumbnail } from "./lib/itemThumbnails";
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
  { image: string; accentClass: string }
> = {
  fruit: {
    image: fruitImage,
    accentClass: "category-card-fruit",
  },
  vegetable: {
    image: vegetableImage,
    accentClass: "category-card-vegetable",
  },
  mushroom: {
    image: mushroomImage,
    accentClass: "category-card-mushroom",
  },
};

function getHeroTitle(locale: Locale, monthLabel: string) {
  if (locale === "fr") return `Le meilleur de ${monthLabel}`;
  if (locale === "es") return `Lo mejor de ${monthLabel}`;
  if (locale === "de") return `Das Beste im ${monthLabel}`;
  if (locale === "it") return `Il meglio di ${monthLabel}`;
  if (locale === "pt") return `O melhor de ${monthLabel}`;
  return `The best of ${monthLabel}`;
}

function getHeroDescription(locale: Locale, countryName: string) {
  if (locale === "fr") {
    return `Découvrez les fruits, légumes et champignons naturellement de saison en ${countryName}.`;
  }
  if (locale === "es") {
    return `Descubre frutas, verduras y setas naturalmente de temporada en ${countryName}.`;
  }
  if (locale === "de") {
    return `Entdecke Obst, Gemüse und Pilze, die in ${countryName} natürlich Saison haben.`;
  }
  if (locale === "it") {
    return `Scopri frutta, verdure e funghi naturalmente di stagione in ${countryName}.`;
  }
  if (locale === "pt") {
    return `Descubra frutas, legumes e cogumelos naturalmente da época em ${countryName}.`;
  }
  return `Discover fruit, vegetables and mushrooms naturally in season in ${countryName}.`;
}

function getHeroCta(locale: Locale, monthLabel: string) {
  if (locale === "fr") return `Voir les produits de ${monthLabel}`;
  if (locale === "es") return `Ver los productos de ${monthLabel}`;
  if (locale === "de") return `Produkte im ${monthLabel} ansehen`;
  if (locale === "it") return `Vedi i prodotti di ${monthLabel}`;
  if (locale === "pt") return `Ver produtos de ${monthLabel}`;
  return `See ${monthLabel} produce`;
}

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
  const heroTitle = getHeroTitle(locale, monthLabel);
  const heroDescription = getHeroDescription(locale, countryName);
  const heroCta = getHeroCta(locale, monthLabel);

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
  const heroSeasonItems = useMemo(
    () =>
      dashboardItems
        .filter(
          ({ season, status }) =>
            status === "in-season" &&
            (season.origin === "local" || season.origin === "regional"),
        )
        .sort((left, right) => {
          const leftPriority =
            featuredItemOrder.get(left.item.id) ?? Number.POSITIVE_INFINITY;
          const rightPriority =
            featuredItemOrder.get(right.item.id) ?? Number.POSITIVE_INFINITY;

          if (leftPriority !== rightPriority) return leftPriority - rightPriority;

          return getItemName(left.item, locale).localeCompare(
            getItemName(right.item, locale),
            locale,
          );
        })
        .slice(0, 3)
        .map((entry) => ({
          ...entry,
          thumbnail: getItemThumbnail(entry.item.id),
        })),
    [dashboardItems, locale],
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
      return status === "in-season";
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
    supplyOriginLabel: copy.supplyOriginLabel,
    supplyOrigins: copy.supplyOrigins,
    seasonPeriod: copy.seasonPeriod,
  };
  const sourceLinks = Array.from(
    new Set([
      ...selectedProfile.sourceIds,
      ...(selectedCountryDataScope?.sourceIds ?? []),
    ]),
  ).map((sourceId) => dataSources[sourceId]);
  const showSeasonalProducts = () => {
    setSelectedCategory(defaultCategory);
    setSelectedView("now");
    setSearch("");
  };
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
                {heroTitle}
              </h2>
              <p className="hero-description">{heroDescription}</p>
              <div className="hero-actions">
                <a className="hero-cta" href="#season-results" onClick={showSeasonalProducts}>
                  <Sprout aria-hidden="true" className="h-5 w-5" />
                  {heroCta}
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="hero-season-window">
                {heroSeasonItems.map(({ item, season, status, thumbnail }, index) => (
                  <figure
                    className={`hero-season-tile ${
                      index === 0 ? "hero-season-tile-feature" : ""
                    }`}
                    data-hero-season-item
                    data-hero-season-rank={index + 1}
                    data-item-id={item.id}
                    data-origin={season.origin}
                    data-status={status}
                    key={item.id}
                  >
                    {thumbnail ? (
                      <img
                        alt=""
                        loading={index === 0 ? "eager" : "lazy"}
                        src={thumbnail}
                      />
                    ) : (
                      <span className="hero-season-icon-shell">
                        <ProduceIcon category={item.category} icon={item.icon} />
                      </span>
                    )}
                    <figcaption className="hero-season-label">
                      {getItemName(item, locale)}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="category-bento" aria-label="Catégories rapides">
          {categorySummaries.map(({ category, count }) => {
            const art = categoryArt[category];
            const isSelected = selectedCategory === category;
            const categoryLabel = copy.categoryGroups[category];
            const categoryCountLabel = copy.categoryGroups[category].toLocaleLowerCase(
              locale,
            );

            return (
              <CategoryFeatureCard
                accentClass={art.accentClass}
                category={category}
                count={count}
                countLabel={categoryCountLabel}
                image={art.image}
                isSelected={isSelected}
                key={category}
                label={categoryLabel}
                onSelect={() => setSelectedCategory(category)}
              />
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
