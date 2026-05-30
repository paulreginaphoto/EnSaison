export type Locale = "fr" | "en" | "es" | "de" | "it" | "pt";

export type SeasonCategory =
  | "fruit"
  | "vegetable"
  | "mushroom"
  | "herb"
  | "legume"
  | "grain"
  | "nut"
  | "seed"
  | "spice";

export type SeasonStatus = "in-season" | "soon" | "out";

export type DataConfidence = "source" | "model" | "indicative";

export type SeasonProfileId =
  | "europe-mountain"
  | "europe-temperate"
  | "mediterranean"
  | "north-temperate"
  | "south-temperate"
  | "tropical";

export type SeasonItem = {
  id: string;
  name: string;
  names?: Partial<Record<Locale, string>>;
  category: SeasonCategory;
  icon: string;
  months: number[];
  nearMonths?: number[];
  seasonLabel: string;
  sourceIds?: string[];
  confidence?: DataConfidence;
  profiles?: Partial<
    Record<
      SeasonProfileId,
      {
        months: number[];
        nearMonths?: number[];
        seasonLabel?: string;
        sourceIds?: string[];
        confidence?: DataConfidence;
      }
    >
  >;
};

export type CategoryFilter = SeasonCategory | "all";
