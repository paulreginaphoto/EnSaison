export type Locale = "fr" | "en" | "es" | "de" | "it" | "pt";

export type SeasonCategory =
  | "allium"
  | "beverage"
  | "condiment"
  | "dairy"
  | "egg"
  | "fat"
  | "fish"
  | "fruit"
  | "insect"
  | "herb"
  | "legume"
  | "meat"
  | "grain"
  | "mushroom"
  | "nut"
  | "poultry"
  | "prepared"
  | "seafood"
  | "seaweed"
  | "seed"
  | "snack"
  | "spice"
  | "sweetener"
  | "tuber"
  | "vegetable";

export type SeasonStatus = "in-season" | "soon" | "out" | "variable";

export type DataConfidence = "source" | "model" | "indicative" | "taxonomy";

export type SeasonMode = "harvest" | "year-round" | "variable";

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
  seasonMode?: SeasonMode;
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
        seasonMode?: SeasonMode;
      }
    >
  >;
  countries?: Partial<
    Record<
      string,
      {
        months: number[];
        nearMonths?: number[];
        seasonLabel?: string;
        sourceIds?: string[];
        confidence?: DataConfidence;
        seasonMode?: SeasonMode;
      }
    >
  >;
};

export type CategoryFilter = SeasonCategory | "all";

export type CategoryGroup =
  | "all"
  | "fruit"
  | "vegetable"
  | "mushroom"
  | "protein"
  | "sea"
  | "pantry";

export type SeasonView = "now" | "all" | "variable" | "out";
