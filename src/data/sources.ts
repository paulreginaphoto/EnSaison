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
} as const;

export type DataSourceId = keyof typeof dataSources;
