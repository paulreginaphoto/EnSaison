import type { SeasonItem, SeasonStatus } from "../types";

export const categoryLabels = {
  fruit: "Fruit",
  vegetable: "Légume",
  mushroom: "Champignon",
} as const;

export const getSeasonStatus = (
  item: SeasonItem,
  selectedMonth: number,
): SeasonStatus => {
  if (item.months.includes(selectedMonth)) {
    return "in-season";
  }

  if (item.nearMonths?.includes(selectedMonth)) {
    return "soon";
  }

  return "out";
};

export const getStatusLabel = (status: SeasonStatus) => {
  if (status === "in-season") return "De saison";
  if (status === "soon") return "Bientôt";
  return "Hors saison";
};

export const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
