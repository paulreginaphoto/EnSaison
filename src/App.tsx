import { useMemo, useState } from "react";
import { CategoryTabs } from "./components/CategoryTabs";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { SeasonLegend } from "./components/SeasonLegend";
import { SeasonSection } from "./components/SeasonSection";
import { getCurrentMonth, getMonthLabel } from "./data/months";
import { seasonItems } from "./data/seasonItems";
import { getSeasonStatus, normalizeSearch } from "./lib/season";
import type { CategoryFilter } from "./types";

function AboutPage() {
  const homeHref = import.meta.env.BASE_URL;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-8 sm:px-8">
      <Header selectedMonth={getCurrentMonth()} onMonthChange={() => undefined} />
      <section className="mt-10 rounded-[2rem] bg-white/80 p-6 shadow-soft sm:p-8">
        <h2 className="text-2xl font-semibold text-ink">À propos</h2>
        <div className="mt-5 space-y-4 text-base leading-7 text-ink/70">
          <p>
            DeSaison aide à repérer rapidement les produits qui ont du sens à
            Lausanne et en Romandie, sans compte, carte ou tableau compliqué.
          </p>
          <p>
            Les indications sont locales et pratiques: elles servent à faire un
            choix simple au marché, au magasin ou avant de cuisiner.
          </p>
          <p>
            Cette V1 reste volontairement minimale: fruits, légumes,
            champignons, mois, recherche et saisonnalité.
          </p>
        </div>
        <a className="mt-8 inline-flex text-sm font-semibold text-sage-700" href={homeHref}>
          Retour
        </a>
      </section>
    </main>
  );
}

function MainPage() {
  const aboutHref = `${import.meta.env.BASE_URL}about`;
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const searchValue = normalizeSearch(search);

    return seasonItems
      .filter((item) =>
        selectedCategory === "all" ? true : item.category === selectedCategory,
      )
      .filter((item) => normalizeSearch(item.name).includes(searchValue))
      .map((item) => ({
        item,
        status: getSeasonStatus(item, selectedMonth),
      }))
      .sort((left, right) => left.item.name.localeCompare(right.item.name, "fr"));
  }, [search, selectedCategory, selectedMonth]);

  const seasonalItems = filteredItems.filter(({ status }) => status !== "out");
  const outItems = filteredItems.filter(({ status }) => status === "out");

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-5 sm:px-7 sm:py-8">
      <div className="rounded-[2rem] bg-cream/75 p-3 shadow-soft sm:p-5">
        <div className="rounded-[1.6rem] border border-white/75 bg-cream/90 p-4 sm:p-6">
          <Header
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          <div className="mt-5 space-y-3">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <SeasonLegend />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <SeasonSection title="De saison" items={seasonalItems} />
            <SeasonSection title="Hors saison" items={outItems} />
          </div>

          <footer className="mt-6 flex flex-col gap-2 text-sm font-semibold text-ink/48 sm:flex-row sm:items-center sm:justify-between">
            <span>Simple, local, de saison.</span>
            <a className="text-sage-700" href={aboutHref}>
              À propos
            </a>
          </footer>
        </div>
      </div>
      <p className="sr-only">Mois sélectionné: {getMonthLabel(selectedMonth)}</p>
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
