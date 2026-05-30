import { getMonthShortLabel } from "../data/months";
import type {
  DataConfidence,
  Locale,
  SeasonCategory,
  SeasonItem,
  SeasonProfileId,
  SeasonStatus,
} from "../types";

export type ResolvedSeason = {
  months: number[];
  nearMonths: number[];
  seasonLabel: string;
  sourceIds: string[];
  confidence: DataConfidence;
  mode: "harvest" | "year-round" | "variable";
};

export const getSeasonStatus = (
  season: Pick<ResolvedSeason, "months" | "nearMonths">,
  selectedMonth: number,
): SeasonStatus => {
  if ("mode" in season && season.mode === "variable") {
    return "variable";
  }

  if (season.months.includes(selectedMonth)) {
    return "in-season";
  }

  if (season.nearMonths.includes(selectedMonth)) {
    return "soon";
  }

  return "out";
};

export const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

const shiftMonth = (month: number, offset: number) =>
  ((((month - 1 + offset) % 12) + 12) % 12) + 1;

const uniqueSortedMonths = (values: number[]) =>
  Array.from(new Set(values)).sort((left, right) => left - right);

const getNearMonthsFromMonths = (months: number[]) =>
  uniqueSortedMonths([
    ...months.map((month) => shiftMonth(month, -1)),
    ...months.map((month) => shiftMonth(month, 1)),
  ]).filter((month) => !months.includes(month));

const tropicalAlways = new Set([
  "avocat",
  "banane",
  "mangue",
  "ananas",
  "papaye",
  "plantain",
  "citron vert",
  "noix de coco",
  "gingembre",
  "curcuma",
]);

export function resolveSeason(
  item: SeasonItem,
  profileId: SeasonProfileId,
  locale: Locale,
): ResolvedSeason {
  const explicit = item.profiles?.[profileId];
  const mode = item.seasonMode ?? "harvest";

  if (mode === "variable") {
    return {
      months: [],
      nearMonths: [],
      seasonLabel: variableSeasonLabel(locale),
      sourceIds: item.sourceIds ?? ["fao-infoods", "langual", "usda-fdc"],
      confidence: item.confidence ?? "taxonomy",
      mode,
    };
  }

  const baseMonths = explicit?.months ?? item.months;
  const months =
    profileId === "south-temperate" && !explicit
      ? baseMonths.map((month) => shiftMonth(month, 6))
      : profileId === "tropical" && !explicit && tropicalAlways.has(item.id)
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        : baseMonths;

  const nearMonths =
    explicit?.nearMonths ??
    (profileId === "south-temperate" && !explicit
      ? (item.nearMonths ?? getNearMonthsFromMonths(item.months)).map((month) =>
          shiftMonth(month, 6),
        )
      : item.nearMonths ?? getNearMonthsFromMonths(months));

  return {
    months: uniqueSortedMonths(months),
    nearMonths: uniqueSortedMonths(nearMonths),
    seasonLabel:
      explicit?.seasonLabel ??
      formatSeasonRange(uniqueSortedMonths(months), locale),
    sourceIds: explicit?.sourceIds ?? item.sourceIds ?? ["eufic-europe"],
    confidence:
      explicit?.confidence ??
      (profileId === "south-temperate" || profileId === "tropical"
        ? "model"
        : item.confidence ?? "indicative"),
    mode,
  };
}

function variableSeasonLabel(locale: Locale) {
  if (locale === "fr") return "variable selon pays";
  if (locale === "es") return "variable por país";
  if (locale === "de") return "je nach Land";
  if (locale === "it") return "varia per paese";
  if (locale === "pt") return "varia por país";
  return "varies by country";
}

export function formatSeasonRange(months: number[], locale: Locale) {
  if (months.length === 12) {
    return locale === "fr"
      ? "toute l’année"
      : locale === "es"
        ? "todo el año"
        : locale === "de"
          ? "ganzjährig"
          : locale === "it"
            ? "tutto l’anno"
            : locale === "pt"
              ? "todo o ano"
              : "year-round";
  }

  if (months.length === 0) return "—";

  const first = months[0];
  const last = months[months.length - 1];
  return `${getMonthShortLabel(first, locale)} – ${getMonthShortLabel(last, locale)}`;
}

export function getItemName(item: SeasonItem, locale: Locale) {
  return item.names?.[locale] ?? item.names?.en ?? item.name;
}

export function getCategoryIconKey(category: SeasonCategory) {
  if (category === "mushroom") return "mushroom-cap";
  if (category === "fruit" || category === "nut") return "fruit-round";
  if (category === "grain" || category === "seed" || category === "legume") {
    return "vegetable-bean";
  }
  if (category === "herb" || category === "spice") return "vegetable-leaf";
  return "vegetable-root";
}
