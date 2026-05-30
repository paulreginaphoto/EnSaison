# Data Sources and Coverage

DeSaison must avoid pretending that a broad climate estimate is a precise local harvest calendar.

## Sources Used

- USDA SNAP-Ed Seasonal Produce Guide  
  https://snaped.fns.usda.gov/resources/nutrition-education-materials/seasonal-produce-guide

- EUFIC seasonal fruit and vegetables in Europe  
  https://www.eufic.org/en/explore-seasonal-fruit-and-vegetables-in-europe

- European Commission fruit and vegetables calendar  
  https://agriculture.ec.europa.eu/farming/crop-productions-and-plant-based-products/fruit-and-vegetables/fruit-and-vegetables-calendar_en

- FAO Crop Calendar  
  https://www.fao.org/sustainable-development-goals-helpdesk/transform/article-detail/crop-calendar/en

- FAO/INFOODS Food Composition  
  https://www.fao.org/food-composition/en/

- LanguaL international food description framework  
  https://www.langual.org/

- USDA FoodData Central  
  https://fdc.nal.usda.gov/food-search/

- French Ministry of Agriculture seasonal products  
  https://agriculture.gouv.fr/produits-de-saison

- Spanish Ministry of Agriculture seasonal fruit calendar
  https://www.mapa.gob.es/es/alimentacion/temas/desperdicio/12calendario_frutas_completo_tcm30-623768.pdf

- Spanish Ministry of Agriculture seasonal vegetable calendar
  https://www.mapa.gob.es/es/alimentacion/temas/desperdicio/11calendario_verduras_completo_tcm30-623767.pdf

- BZfE German seasonal fruit and vegetable calendar
  https://www.bzfe.de/kueche-und-alltag/einkaufen/der-saisonkalender

- Voedingscentrum Dutch seasonal vegetable and fruit calendar
  https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/gezonde-voeding-en-voedingsstoffen/wat-zijn-seizoensgroenten-en-seizoensfruit.aspx

- British Dietetic Association UK seasonal fruit and vegetable guide
  https://www.bda.uk.com/food-health/your-health/sustainable-diets/seasonal-fruit-and-veg-a-handy-guide.html

- CREA Sapermangiare Italian seasonal produce calendar
  https://sapermangiare.an.crea.gov.it/528/prodotti-di-stagione.html

- Japan MAFF Tohoku seasonal foods  
  https://www.maff.go.jp/tohoku/monosiritai/syokutaku/tabemono.html

- Australian Government Healthy Aussie Produce  
  https://www.health.gov.au/our-work/healthy-aussie-produce

- Swiss Federal Office for Agriculture seasonal fruit and vegetable table
  https://www.blw.admin.ch/dam/blw/de/dokumente/Markt/Marktbeobachtung/Fruechte%20und%20Gemuese/Saisontabelle/FG_Saisontabelle.pdf.download.pdf/Schweizer%20Saisontabelle%20Fr%C3%BCchte%20und%20Gem%C3%BCse%20sowie%20Aktionen.pdf

- Foodland Ontario availability guide
  https://www.ontario.ca/foodland/page/availability-guide

- Seasonal Food Guide Australia
  https://seasonalfoodguide.com/

- CEAGESP seasonality purchasing tables
  https://ceagesp.gov.br/sala-imprensa/sazonalidade-de-compras/

- APEDA fresh fruits and vegetables overview
  https://apeda.gov.in/FreshFruitsAndVegetables

- India Department of Agriculture harvesting season of major vegetables
  https://desagri.gov.in/en/document-report/6-harvesting-season-of-major-vegetables/

- India National Horticulture Board litchi availability note
  https://www.nhb.gov.in/model-project-reports/Horticulture%20Crops/Litchi/Litchi1.htm

- Mexico PROFECO fourth-quarter seasonal fruit and vegetable guide
  https://www.gob.mx/profeco/prensa/recomienda-profeco-consumo-de-frutas-y-verduras-de-temporada?idiom=es

## What The App Can Say Safely

- Seasonal availability varies by exact location, altitude, growing conditions, weather, storage, greenhouse use and import habits.
- Country selection maps each country to a broad climate/season profile.
- European produce uses European climate-region sources where possible, and is labeled as indicative unless a country-level source is attached.
- Northern-temperate produce uses USDA and European references where possible.
- Southern-temperate profiles are hemisphere-shifted from northern-temperate data unless an item has explicit regional data.
- Tropical profiles are indicative and should be replaced item-by-item with country-level sources as the catalogue grows.
- Animal products, prepared foods, drinks, condiments and processed staples are classified from food taxonomy sources. They are shown as variable unless the app has a reliable country-level seasonal signal.
- Item rows display source links, so users can distinguish a climate model from a country-level source.

## Current Coverage

The app now supports:

- all ISO-3166 country codes in the selector;
- 6 UI languages: French, English, Spanish, German, Italian and Portuguese;
- 25 food categories: alliums, beverages, condiments, dairy, eggs, fats/oils, fish, fruits, insects, herbs, legumes, meat, grains, mushrooms, nuts, poultry, prepared foods, seafood, seaweed, seeds, snacks, spices, sweeteners, tubers and vegetables;
- 241 food entries after the fourth worldwide expansion pass;
- confidence labels per item: sourced, modeled, indicative or taxonomy-only.
- country overrides for 43 countries, including France, Switzerland, United Kingdom, Italy, Germany, Netherlands, Spain, Mexico, United States, Canada, Australia, India, Brazil and Japan;
- 34 European countries now have 58 regional produce overrides backed by EUFIC and European Commission references, marked as indicative rather than fully local;
- Germany and the Netherlands keep their European seasonal months but now include country-specific reference links, still marked indicative until transcribed item by item;
- Spain has source-backed MAPA month-by-month overrides for 46 fruit and vegetable items already present in the catalogue, using higher commercialization as in-season and lower commercialization as soon/near season;
- Mexico has source-backed PROFECO fourth-quarter overrides for 22 fruit and vegetable items already present in the catalogue; this is a Q4 source, not a complete annual Mexico calendar;
- the United States has source-backed USDA SNAP-Ed seasonal overrides for 50 produce items already present in the catalogue, mapped from USDA spring/summer/fall/winter lists;
- the United Kingdom has source-backed BDA month-by-month overrides for 46 produce items already present in the catalogue;
- Italy has source-backed CREA month-by-month overrides for the catalogue items that directly match the CREA calendar;
- France keeps 57 source-backed produce entries from the French Ministry of Agriculture, and Switzerland keeps 57 source-backed produce entries from the Swiss Federal Office for Agriculture.

Run `npm run audit:data` to regenerate `docs/data-coverage-report.md`. The audit counts countries, food entries, categories, source references, country overrides, country-specific references, country override confidence, top country coverage and missing aliases so the remaining worldwide coverage gap stays visible.

## Not Complete Yet

The user objective remains broader than the current evidence. A truly complete worldwide app still needs:

- authoritative country-level harvest calendars for every country;
- item-level local data for tropical, southern-temperate, arid regions and most countries beyond the first France/Japan overrides;
- a larger item-level catalogue for regional cultivars, prepared foods and country-specific staples;
- source-by-source audit trails per item and per country.

Until those are added, DeSaison should keep showing confidence labels and source notes.
