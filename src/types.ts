export type SeasonCategory = "fruit" | "vegetable" | "mushroom";

export type SeasonStatus = "in-season" | "soon" | "out";

export type SeasonItem = {
  id: string;
  name: string;
  category: SeasonCategory;
  icon: string;
  months: number[];
  nearMonths?: number[];
  seasonLabel: string;
};

export type CategoryFilter = SeasonCategory | "all";
