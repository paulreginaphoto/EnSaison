export const dataSources = {
  "usda-snaped": {
    label: "USDA SNAP-Ed Seasonal Produce Guide",
    url: "https://snaped.fns.usda.gov/resources/nutrition-education-materials/seasonal-produce-guide",
  },
  "eufic-europe": {
    label: "EUFIC European seasonal fruit and vegetables map",
    url: "https://www.eufic.org/en/explore-seasonal-fruit-and-vegetables-in-europe",
  },
  "ec-calendar": {
    label: "European Commission fruit and vegetables calendar",
    url: "https://agriculture.ec.europa.eu/farming/crop-productions-and-plant-based-products/fruit-and-vegetables/fruit-and-vegetables-calendar_en",
  },
  "fao-crop-calendar": {
    label: "FAO Crop Calendar",
    url: "https://www.fao.org/sustainable-development-goals-helpdesk/transform/article-detail/crop-calendar/en",
  },
  "fao-infoods": {
    label: "FAO/INFOODS Food Composition",
    url: "https://www.fao.org/food-composition/en/",
  },
  langual: {
    label: "LanguaL international food description framework",
    url: "https://www.langual.org/",
  },
  "usda-fdc": {
    label: "USDA FoodData Central",
    url: "https://fdc.nal.usda.gov/food-search/",
  },
  "france-agriculture": {
    label: "French Ministry of Agriculture seasonal products",
    url: "https://agriculture.gouv.fr/produits-de-saison",
  },
  "japan-maff-tohoku": {
    label: "Japan MAFF Tohoku seasonal foods",
    url: "https://www.maff.go.jp/tohoku/monosiritai/syokutaku/tabemono.html",
  },
  "australia-health-produce": {
    label: "Australian Government Healthy Aussie Produce",
    url: "https://www.health.gov.au/our-work/healthy-aussie-produce",
  },
} as const;

export type DataSourceId = keyof typeof dataSources;
