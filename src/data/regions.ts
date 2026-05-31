import type { Locale, SeasonProfileId } from "../types";
import type { DataSourceId } from "./sources";

export type CountryOption = {
  code: string;
  profileId: SeasonProfileId;
};

export type CountryDataScope = {
  labels: Record<Locale, string>;
  sourceIds: DataSourceId[];
};

export const seasonProfiles: Record<
  SeasonProfileId,
  {
    labels: Record<Locale, string>;
    confidenceLabel: Record<Locale, string>;
    sourceIds: DataSourceId[];
  }
> = {
  "europe-mountain": {
    labels: {
      fr: "Europe montagne",
      en: "Mountain Europe",
      es: "Europa de montaña",
      de: "Bergregion Europa",
      it: "Europa alpina",
      pt: "Europa de montanha",
    },
    confidenceLabel: {
      fr: "local indicatif",
      en: "local guide",
      es: "guía local",
      de: "lokaler Leitwert",
      it: "guida locale",
      pt: "guia local",
    },
    sourceIds: ["eufic-europe", "ec-calendar"],
  },
  "europe-temperate": {
    labels: {
      fr: "Europe tempérée",
      en: "Temperate Europe",
      es: "Europa templada",
      de: "Gemäßigtes Europa",
      it: "Europa temperata",
      pt: "Europa temperada",
    },
    confidenceLabel: {
      fr: "source Europe",
      en: "Europe source",
      es: "fuente Europa",
      de: "Europa-Quelle",
      it: "fonte Europa",
      pt: "fonte Europa",
    },
    sourceIds: ["eufic-europe", "ec-calendar"],
  },
  mediterranean: {
    labels: {
      fr: "Méditerranéen",
      en: "Mediterranean",
      es: "Mediterráneo",
      de: "Mittelmeerraum",
      it: "Mediterraneo",
      pt: "Mediterrâneo",
    },
    confidenceLabel: {
      fr: "source climat",
      en: "climate source",
      es: "fuente climática",
      de: "Klimaquelle",
      it: "fonte climatica",
      pt: "fonte climática",
    },
    sourceIds: ["eufic-europe", "ec-calendar"],
  },
  "north-temperate": {
    labels: {
      fr: "Nord tempéré",
      en: "Northern temperate",
      es: "Norte templado",
      de: "Nördlich gemäßigt",
      it: "Nord temperato",
      pt: "Norte temperado",
    },
    confidenceLabel: {
      fr: "source + modèle",
      en: "source + model",
      es: "fuente + modelo",
      de: "Quelle + Modell",
      it: "fonte + modello",
      pt: "fonte + modelo",
    },
    sourceIds: ["usda-snaped", "fao-crop-calendar"],
  },
  "south-temperate": {
    labels: {
      fr: "Sud tempéré",
      en: "Southern temperate",
      es: "Sur templado",
      de: "Südlich gemäßigt",
      it: "Sud temperato",
      pt: "Sul temperado",
    },
    confidenceLabel: {
      fr: "modèle hémisphère",
      en: "hemisphere model",
      es: "modelo hemisférico",
      de: "Hemisphärenmodell",
      it: "modello emisfero",
      pt: "modelo hemisférico",
    },
    sourceIds: ["fao-crop-calendar"],
  },
  tropical: {
    labels: {
      fr: "Tropical",
      en: "Tropical",
      es: "Tropical",
      de: "Tropisch",
      it: "Tropicale",
      pt: "Tropical",
    },
    confidenceLabel: {
      fr: "indicatif tropical",
      en: "tropical guide",
      es: "guía tropical",
      de: "Tropen-Leitwert",
      it: "guida tropicale",
      pt: "guia tropical",
    },
    sourceIds: ["fao-crop-calendar"],
  },
};

export const countryDataScopes: Partial<Record<string, CountryDataScope>> = {
  AD: {
    labels: {
      fr: "Andorre: proxy Catalogne/Pyrenees utilise prudemment, avec le calendrier officiel catalan le plus proche; ce n'est pas un calendrier agricole national andorran.",
      en: "Andorra: Catalonia/Pyrenees proxy used cautiously, with the nearest official Catalan calendar; this is not an Andorran national harvest calendar.",
      es: "Andorra: proxy Cataluna/Pirineos usado con cautela, con el calendario oficial catalan mas cercano; no es un calendario agricola nacional andorrano.",
      de: "Andorra: Katalonien-/Pyrenaeen-Proxy mit Vorsicht genutzt, mit dem naechsten offiziellen katalanischen Kalender; kein nationaler andorranischer Erntekalender.",
      it: "Andorra: proxy Catalogna/Pirenei usato con cautela, con il calendario catalano ufficiale piu vicino; non e un calendario agricolo nazionale andorrano.",
      pt: "Andorra: proxy Catalunha/Pireneus usado com cautela, com o calendario oficial catalao mais proximo; nao e um calendario agricola nacional andorrano.",
    },
    sourceIds: [
      "catalonia-agriculture-season-calendar",
      "catalonia-salut-nearest-calendar-guidance",
      "eu-andorra-customs-union",
    ],
  },
  AT: {
    labels: {
      fr: "Autriche: calendrier national du portail public de sante, utile pour les produits regionaux offerts selon les mois.",
      en: "Austria: national public-health portal calendar, useful for regionally offered produce by month.",
      es: "Austria: calendario nacional del portal publico de salud, util para productos regionales disponibles por mes.",
      de: "Osterreich: nationaler Kalender des offentlichen Gesundheitsportals, nutzlich fur regional angebotene Produkte nach Monat.",
      it: "Austria: calendario nazionale del portale pubblico della salute, utile per prodotti regionali disponibili per mese.",
      pt: "Austria: calendario nacional do portal publico de saude, util para produtos regionais disponiveis por mes.",
    },
    sourceIds: ["austria-gesundheit-season-calendar"],
  },
  AU: {
    labels: {
      fr: "Australie: calendrier national indicatif, utile pour une lecture rapide mais pas precis Etat par Etat.",
      en: "Australia: indicative national calendar, useful for a quick read but not state-by-state precision.",
      es: "Australia: calendario nacional indicativo, util para una lectura rapida pero no preciso por estado.",
      de: "Australien: indikativer nationaler Kalender, hilfreich fur einen schnellen Blick, aber nicht bundesstaatengenau.",
      it: "Australia: calendario nazionale indicativo, utile per una lettura rapida ma non preciso Stato per Stato.",
      pt: "Australia: calendario nacional indicativo, util para uma leitura rapida, mas sem precisao por estado.",
    },
    sourceIds: ["australia-health-produce", "seasonal-food-guide-australia"],
  },
  BE: {
    labels: {
      fr: "Belgique: calendrier Vlaanderen/VLAM par mois pour fruits et legumes disponibles; utile comme reference belge, pas une prevision meteo ou magasin.",
      en: "Belgium: Vlaanderen/VLAM month-by-month calendar for available fruit and vegetables; useful as a Belgian reference, not a weather or shop forecast.",
      es: "Belgica: calendario mensual Vlaanderen/VLAM de frutas y verduras disponibles; util como referencia belga, no como prevision meteorologica o de tienda.",
      de: "Belgien: Vlaanderen/VLAM-Monatskalender fur verfugbares Obst und Gemuse; nutzlich als belgische Referenz, nicht als Wetter- oder Ladenprognose.",
      it: "Belgio: calendario mensile Vlaanderen/VLAM per frutta e verdura disponibili; utile come riferimento belga, non come previsione meteo o di negozio.",
      pt: "Belgica: calendario mensal Vlaanderen/VLAM de frutas e legumes disponiveis; util como referencia belga, nao como previsao meteorologica ou de loja.",
    },
    sourceIds: ["belgium-vlaanderen-vlam-season-calendar"],
  },
  BD: {
    labels: {
      fr: "Bangladesh: calendriers BAMIS du Department of Agricultural Extension et saisons agricoles Banglapedia; les fenetres restent nationales et peuvent varier selon district, mousson, variete et irrigation.",
      en: "Bangladesh: BAMIS Department of Agricultural Extension crop calendars and Banglapedia agricultural seasons; windows are national and can vary by district, monsoon, variety and irrigation.",
      es: "Bangladesh: calendarios de cultivos BAMIS del Department of Agricultural Extension y estaciones agricolas de Banglapedia; las ventanas son nacionales y pueden variar por distrito, monzon, variedad e irrigacion.",
      de: "Bangladesch: BAMIS-Anbaukalender des Department of Agricultural Extension und Banglapedia-Agrarsaisons; die Fenster sind national und koennen je nach Distrikt, Monsun, Sorte und Bewaesserung variieren.",
      it: "Bangladesh: calendari colturali BAMIS del Department of Agricultural Extension e stagioni agricole Banglapedia; le finestre sono nazionali e possono variare per distretto, monsone, varieta e irrigazione.",
      pt: "Bangladesh: calendarios de culturas BAMIS do Department of Agricultural Extension e epocas agricolas da Banglapedia; as janelas sao nacionais e podem variar por distrito, moncao, variedade e irrigacao.",
    },
    sourceIds: [
      "bangladesh-bamis-crop-weather-calendar",
      "bangladesh-banglapedia-crop-seasons",
      "bangladesh-banglapedia-fruit",
      "bangladesh-apo-postharvest-fruit-vegetables",
    ],
  },
  ID: {
    labels: {
      fr: "Indonesie: tableau World Bank/Indonesia de disponibilite locale des fruits et legumes; utile comme signal national pratique, pas une precision ile par ile ni varietale.",
      en: "Indonesia: World Bank/Indonesia table of local fruit and vegetable availability; useful as practical national guidance, not island-by-island or variety-level precision.",
      es: "Indonesia: tabla World Bank/Indonesia de disponibilidad local de frutas y verduras; util como orientacion nacional practica, no precision por isla ni por variedad.",
      de: "Indonesien: World-Bank/Indonesia-Tabelle lokaler Obst- und Gemueseverfuegbarkeit; praktische nationale Orientierung, keine Genauigkeit nach Insel oder Sorte.",
      it: "Indonesia: tabella World Bank/Indonesia sulla disponibilita locale di frutta e verdura; utile come guida nazionale pratica, non precisione isola per isola o per varieta.",
      pt: "Indonesia: tabela World Bank/Indonesia de disponibilidade local de frutas e legumes; util como orientacao nacional pratica, nao precisao por ilha nem por variedade.",
    },
    sourceIds: ["indonesia-worldbank-local-produce-seasons"],
  },
  BR: {
    labels: {
      fr: "Bresil: table CEAGESP 2026 de quantites ETSP, utile pour un signal de marche de Sao Paulo; pas une precision Etat par Etat.",
      en: "Brazil: CEAGESP 2026 ETSP quantity table, useful as a Sao Paulo market signal; not state-by-state precision.",
      es: "Brasil: tabla CEAGESP 2026 de cantidades ETSP, util como senal del mercado de Sao Paulo; no precision estado por estado.",
      de: "Brasilien: CEAGESP-ETSP-Mengentabelle 2026, nutzlich als Marktsignal Sao Paulo; keine bundesstaatliche Genauigkeit.",
      it: "Brasile: tabella CEAGESP 2026 delle quantita ETSP, utile come segnale del mercato di Sao Paulo; non precisione Stato per Stato.",
      pt: "Brasil: tabela CEAGESP 2026 de quantidades ETSP, util como sinal do mercado de Sao Paulo; nao precisao estado por estado.",
    },
    sourceIds: ["brazil-ceagesp-seasonality"],
  },
  BG: {
    labels: {
      fr: "Bulgarie: guide pratique BB-Team des fruits et legumes de saison par grandes saisons; source locale utile, pas calendrier gouvernemental ni precision mensuelle agricole.",
      en: "Bulgaria: BB-Team practical guide to seasonal fruit and vegetables by broad season; useful local source, not a government calendar or month-level agricultural precision.",
      es: "Bulgaria: guia practica BB-Team de frutas y verduras de temporada por grandes estaciones; fuente local util, no calendario gubernamental ni precision agricola mensual.",
      de: "Bulgarien: praktischer BB-Team-Leitfaden zu saisonalem Obst und Gemuese nach breiten Jahreszeiten; nutzliche lokale Quelle, kein Regierungskalender und keine monatliche Agrargenauigkeit.",
      it: "Bulgaria: guida pratica BB-Team a frutta e verdura stagionali per grandi stagioni; fonte locale utile, non calendario governativo ne precisione agricola mensile.",
      pt: "Bulgaria: guia pratico BB-Team de frutas e legumes sazonais por grandes estacoes; fonte local util, nao calendario governamental nem precisao agricola mensal.",
    },
    sourceIds: ["bulgaria-bbteam-season-guide"],
  },
  CA: {
    labels: {
      fr: "Canada: donnees Foodland Ontario source-backed pour les produits frais presents dans le catalogue; cela ne remplace pas une precision province par province.",
      en: "Canada: source-backed Foodland Ontario data for fresh produce present in the catalogue; this does not replace province-by-province precision.",
      es: "Canada: datos Foodland Ontario con fuente para productos frescos presentes en el catalogo; no sustituyen una precision provincia por provincia.",
      de: "Kanada: quellengestuetzte Foodland-Ontario-Daten fuer die im Katalog vorhandenen Frischprodukte; das ersetzt keine Genauigkeit nach Provinz.",
      it: "Canada: dati Foodland Ontario supportati da fonte per prodotti freschi presenti nel catalogo; non sostituiscono una precisione provincia per provincia.",
      pt: "Canada: dados Foodland Ontario com fonte para produtos frescos presentes no catalogo; nao substituem precisao provincia por provincia.",
    },
    sourceIds: ["foodland-ontario-availability"],
  },
  CZ: {
    labels: {
      fr: "Tchequie: calendrier MZe 2026 des periodes de maturation, recolte et stockage pour fruits, legumes et pommes de terre cultives en Republique tcheque.",
      en: "Czechia: 2026 MZe calendar for ripening, harvest and storage periods of fruits, vegetables and potatoes grown in the Czech Republic.",
      es: "Chequia: calendario MZe 2026 de maduracion, cosecha y almacenamiento de frutas, verduras y patatas cultivadas en la Republica Checa.",
      de: "Tschechien: MZe-Kalender 2026 fuer Reife-, Ernte- und Lagerzeiten von in Tschechien angebautem Obst, Gemuese und Kartoffeln.",
      it: "Cechia: calendario MZe 2026 dei periodi di maturazione, raccolta e conservazione di frutta, verdura e patate coltivate nella Repubblica Ceca.",
      pt: "Chequia: calendario MZe 2026 de maturacao, colheita e armazenamento de frutas, legumes e batatas cultivados na Republica Checa.",
    },
    sourceIds: ["czech-mze-harvest-storage-calendar"],
  },
  DK: {
    labels: {
      fr: "Danemark: affiches mensuelles officielles de la Fødevarestyrelsen pour un echantillon de fruits et legumes de saison.",
      en: "Denmark: official Danish Food Agency monthly posters for a sample of seasonal fruit and vegetables.",
      es: "Dinamarca: carteles mensuales oficiales de la Agencia Danesa de Alimentos para una muestra de frutas y verduras de temporada.",
      de: "Danemark: offizielle Monatsplakate der danischen Lebensmittelbehorde fur eine Auswahl saisonaler Obst- und Gemusearten.",
      it: "Danimarca: poster mensili ufficiali dell'Agenzia alimentare danese per un campione di frutta e verdura di stagione.",
      pt: "Dinamarca: cartazes mensais oficiais da Agencia Dinamarquesa de Alimentos para uma amostra de frutas e legumes da epoca.",
    },
    sourceIds: ["denmark-foedevarestyrelsen-season-posters"],
  },
  EE: {
    labels: {
      fr: "Estonie: calendrier Gardest 2026 de semis et recolte des legumes, utilisant les mois de recolte prete; guide pratique de jardinage, pas calendrier gouvernemental ni disponibilite magasin.",
      en: "Estonia: Gardest 2026 vegetable sowing and harvest calendar, using ready-to-harvest months; practical gardening guide, not a government calendar or shop availability forecast.",
      es: "Estonia: calendario Gardest 2026 de siembra y cosecha de verduras, usando meses listos para cosechar; guia practica de huerto, no calendario gubernamental ni disponibilidad de tienda.",
      de: "Estland: Gardest-Gemueseaussaat- und Erntekalender 2026 mit erntereifen Monaten; praktischer Gartenleitfaden, kein Regierungskalender und keine Ladenverfuegbarkeit.",
      it: "Estonia: calendario Gardest 2026 di semina e raccolta degli ortaggi, usando i mesi pronti per la raccolta; guida pratica di orticoltura, non calendario governativo o disponibilita in negozio.",
      pt: "Estonia: calendario Gardest 2026 de sementeira e colheita de legumes, usando meses prontos para colheita; guia pratico de horta, nao calendario governamental nem disponibilidade em loja.",
    },
    sourceIds: ["estonia-gardest-vegetable-calendar"],
  },
  FI: {
    labels: {
      fr: "Finlande: guide Luontoon des aliments de saison par grandes periodes; utile pour une lecture nationale pratique, pas une precision mensuelle agricole.",
      en: "Finland: Luontoon guide to seasonal foods by broad season; useful as practical national guidance, not month-level agricultural precision.",
      es: "Finlandia: guia Luontoon de alimentos de temporada por grandes estaciones; util como orientacion nacional practica, no precision agricola mensual.",
      de: "Finnland: Luontoon-Leitfaden zu saisonalen Lebensmitteln nach groben Jahreszeiten; praktische nationale Orientierung, keine monatsscharfe Agrarprognose.",
      it: "Finlandia: guida Luontoon agli alimenti di stagione per grandi periodi; utile come orientamento nazionale pratico, non precisione agricola mensile.",
      pt: "Finlandia: guia Luontoon de alimentos sazonais por grandes epocas; util como orientacao nacional pratica, nao precisao agricola mensal.",
    },
    sourceIds: ["finland-luontoon-seasonal-food"],
  },
  SI: {
    labels: {
      fr: "Slovenie: calendrier saisonnier du gouvernement pour les achats publics verts, avec offre forte et offre disponible pour legumes, fruits et pommes.",
      en: "Slovenia: government green-procurement seasonal calendar, with strong and available supply periods for vegetables, fruit and apples.",
      es: "Eslovenia: calendario estacional gubernamental de compras publicas verdes, con periodos de oferta fuerte y disponible para verduras, frutas y manzanas.",
      de: "Slowenien: staatlicher Saisonkalender fuer gruenes oeffentliches Beschaffungswesen, mit starken und verfuegbaren Angebotszeiten fuer Gemuese, Obst und Aepfel.",
      it: "Slovenia: calendario stagionale governativo per gli appalti pubblici verdi, con periodi di offerta forte e disponibile per verdure, frutta e mele.",
      pt: "Eslovenia: calendario sazonal governamental de compras publicas verdes, com periodos de oferta forte e disponivel para legumes, frutas e macas.",
    },
    sourceIds: ["slovenia-gov-green-procurement-season-calendar"],
  },
  SK: {
    labels: {
      fr: "Slovaquie: calendrier saisonnier du ministere de l'Education pour la restauration scolaire, distinguant produits frais et disponibles en stockage.",
      en: "Slovakia: Ministry of Education school-catering seasonal calendar, distinguishing fresh produce from stored availability.",
      es: "Eslovaquia: calendario estacional del Ministerio de Educacion para comedores escolares, que distingue productos frescos y disponibilidad almacenada.",
      de: "Slowakei: Saisonkalender des Bildungsministeriums fuer die Schulverpflegung, der frische Produkte und Lagerverfuegbarkeit unterscheidet.",
      it: "Slovacchia: calendario stagionale del Ministero dell'Istruzione per la ristorazione scolastica, che distingue prodotti freschi e disponibilita da stoccaggio.",
      pt: "Eslovaquia: calendario sazonal do Ministerio da Educacao para alimentacao escolar, distinguindo produtos frescos e disponibilidade armazenada.",
    },
    sourceIds: ["slovakia-minedu-school-season-calendar"],
  },
  MT: {
    labels: {
      fr: "Malte: calendrier AgroKatina de Friends of the Earth Malta pour fruits et legumes locaux; source pratique ONG, pas calendrier gouvernemental.",
      en: "Malta: Friends of the Earth Malta AgroKatina calendar for local fruit and vegetables; practical NGO source, not a government calendar.",
      es: "Malta: calendario AgroKatina de Friends of the Earth Malta para frutas y verduras locales; fuente practica de ONG, no calendario gubernamental.",
      de: "Malta: AgroKatina-Kalender von Friends of the Earth Malta fuer lokales Obst und Gemuese; praktische NGO-Quelle, kein Regierungskalender.",
      it: "Malta: calendario AgroKatina di Friends of the Earth Malta per frutta e verdura locali; fonte pratica ONG, non calendario governativo.",
      pt: "Malta: calendario AgroKatina da Friends of the Earth Malta para frutas e legumes locais; fonte pratica de ONG, nao calendario governamental.",
    },
    sourceIds: ["malta-foe-agrokatina-calendar"],
  },
  EG: {
    labels: {
      fr: "Egypte: calendriers Miresda fruits, agrumes et legumes pour l'offre export/fournisseur egyptienne; source pratique, pas calendrier gouvernemental ni precision par gouvernorat.",
      en: "Egypt: Miresda fruit, citrus and vegetable calendars for Egyptian export/supplier availability; practical source, not a government calendar or governorate-level precision.",
      es: "Egipto: calendarios Miresda de frutas, citricos y verduras para disponibilidad exportadora/proveedora egipcia; fuente practica, no calendario gubernamental ni precision por gobernacion.",
      de: "Aegypten: Miresda-Kalender fuer Obst, Zitrusfruechte und Gemuese aus aegyptischer Export-/Lieferantenverfuegbarkeit; praktische Quelle, kein Regierungskalender und keine Gouvernorats-Praezision.",
      it: "Egitto: calendari Miresda di frutta, agrumi e verdura per disponibilita export/fornitore egiziana; fonte pratica, non calendario governativo ne precisione per governatorato.",
      pt: "Egito: calendarios Miresda de frutas, citrinos e legumes para disponibilidade egipcia de exportacao/fornecedor; fonte pratica, nao calendario governamental nem precisao por governadoria.",
    },
    sourceIds: ["egypt-miresda-season-calendars"],
  },
  MA: {
    labels: {
      fr: "Maroc: calendrier Zalar Agri de production fruitiere marocaine par mois; source producteur/export pratique, pas calendrier gouvernemental ni precision par region.",
      en: "Morocco: Zalar Agri month-by-month Moroccan fruit production calendar; practical producer/export source, not a government calendar or region-level precision.",
      es: "Marruecos: calendario mensual de produccion fruticola marroqui de Zalar Agri; fuente practica de productor/exportador, no calendario gubernamental ni precision regional.",
      de: "Marokko: monatlicher Zalar-Agri-Kalender fuer marokkanische Obstproduktion; praktische Produzenten-/Exportquelle, kein Regierungskalender und keine regionale Praezision.",
      it: "Marocco: calendario mensile Zalar Agri della produzione frutticola marocchina; fonte pratica produttore/export, non calendario governativo ne precisione regionale.",
      pt: "Marrocos: calendario mensal da Zalar Agri para producao fruticola marroquina; fonte pratica de produtor/exportador, nao calendario governamental nem precisao regional.",
    },
    sourceIds: ["morocco-zalar-fruit-production-calendar"],
  },
  KE: {
    labels: {
      fr: "Kenya: calendrier Berito Fresh de disponibilite mensuelle pour fruits, legumes, pois, herbes et piments; source fournisseur pratique, pas calendrier gouvernemental ni precision par comte.",
      en: "Kenya: Berito Fresh monthly availability calendar for fruit, vegetables, peas, herbs and chilies; practical supplier source, not a government calendar or county-level precision.",
      es: "Kenia: calendario mensual de disponibilidad de Berito Fresh para frutas, verduras, guisantes, hierbas y chiles; fuente practica de proveedor, no calendario gubernamental ni precision por condado.",
      de: "Kenia: monatlicher Berito-Fresh-Verfuegbarkeitskalender fuer Obst, Gemuese, Erbsen, Kraeuter und Chilis; praktische Lieferantenquelle, kein Regierungskalender und keine County-Praezision.",
      it: "Kenya: calendario mensile Berito Fresh di disponibilita per frutta, verdura, piselli, erbe e peperoncini; fonte pratica fornitore, non calendario governativo ne precisione per contea.",
      pt: "Quenia: calendario mensal de disponibilidade da Berito Fresh para frutas, legumes, ervilhas, ervas e pimentas; fonte pratica de fornecedor, nao calendario governamental nem precisao por condado.",
    },
    sourceIds: ["kenya-berito-fresh-season-calendar"],
  },
  VN: {
    labels: {
      fr: "Vietnam: calendrier Greatfoods de disponibilite saisonniere pour fruits et legumes vietnamiens; source fournisseur/export pratique, pas calendrier gouvernemental ni precision par province.",
      en: "Vietnam: Greatfoods seasonal availability calendar for Vietnamese fruit and vegetables; practical supplier/export source, not a government calendar or province-level precision.",
      es: "Vietnam: calendario de disponibilidad estacional de Greatfoods para frutas y verduras vietnamitas; fuente practica de proveedor/exportador, no calendario gubernamental ni precision provincial.",
      de: "Vietnam: Greatfoods-Saisonkalender fuer vietnamesisches Obst und Gemuese; praktische Lieferanten-/Exportquelle, kein Regierungskalender und keine Provinz-Praezision.",
      it: "Vietnam: calendario stagionale Greatfoods per frutta e verdura vietnamite; fonte pratica fornitore/export, non calendario governativo ne precisione provinciale.",
      pt: "Vietname: calendario sazonal da Greatfoods para frutas e legumes vietnamitas; fonte pratica de fornecedor/exportador, nao calendario governamental nem precisao provincial.",
    },
    sourceIds: ["vietnam-greatfoods-season-calendar"],
  },
  NG: {
    labels: {
      fr: "Nigeria: calendrier Kitchen Butterfly des fruits et legumes de saison au Nigeria; source culinaire pratique, pas calendrier gouvernemental ni precision par Etat.",
      en: "Nigeria: Kitchen Butterfly seasonal fruit and vegetable calendar for Nigeria; practical culinary source, not a government calendar or state-level precision.",
      es: "Nigeria: calendario Kitchen Butterfly de frutas y verduras de temporada en Nigeria; fuente culinaria practica, no calendario gubernamental ni precision por estado.",
      de: "Nigeria: Kitchen-Butterfly-Saisonkalender fuer Obst und Gemuese in Nigeria; praktische kulinarische Quelle, kein Regierungskalender und keine Bundesstaat-Praezision.",
      it: "Nigeria: calendario Kitchen Butterfly di frutta e verdura stagionale in Nigeria; fonte culinaria pratica, non calendario governativo ne precisione per Stato.",
      pt: "Nigeria: calendario Kitchen Butterfly de frutas e legumes sazonais na Nigeria; fonte culinaria pratica, nao calendario governamental nem precisao por estado.",
    },
    sourceIds: ["nigeria-kitchenbutterfly-season-calendar"],
  },
  GH: {
    labels: {
      fr: "Ghana: guide mensuel Green Views des produits de saison, complete par le rapport GhanaVeg/HortiFresh sur la saisonnalite du marche horticole; source pratique nationale, pas calendrier gouvernemental ni precision par region.",
      en: "Ghana: Green Views month-by-month seasonal produce guide, supplemented by the GhanaVeg/HortiFresh horticulture market seasonality report; practical national source, not a government calendar or regional precision.",
      es: "Ghana: guia mensual Green Views de productos de temporada, complementada por el informe GhanaVeg/HortiFresh sobre estacionalidad del mercado horticola; fuente nacional practica, no calendario gubernamental ni precision regional.",
      de: "Ghana: monatlicher Green-Views-Saisonfuehrer fuer Erzeugnisse, ergaenzt durch den GhanaVeg/HortiFresh-Bericht zur Saisonalitaet im Gartenbaumarkt; praktische nationale Quelle, kein Regierungskalender und keine regionale Genauigkeit.",
      it: "Ghana: guida mensile Green Views ai prodotti stagionali, integrata dal rapporto GhanaVeg/HortiFresh sulla stagionalita del mercato orticolo; fonte nazionale pratica, non calendario governativo ne precisione regionale.",
      pt: "Gana: guia mensal Green Views de produtos sazonais, complementado pelo relatorio GhanaVeg/HortiFresh sobre sazonalidade do mercado horticola; fonte nacional pratica, nao calendario governamental nem precisao regional.",
    },
    sourceIds: ["ghana-greenviews-season-guide", "ghana-ghanaveg-market-report"],
  },
  GR: {
    labels: {
      fr: "Grece: calendrier mensuel Food For Health pour fruits et legumes courants, recoupe avec le profil mediterraneen de la Commission europeenne; guide nutritionnel national, pas calendrier agricole gouvernemental.",
      en: "Greece: Food For Health monthly calendar for common fruit and vegetables, cross-checked with the European Commission Mediterranean profile; national nutrition guidance, not a government agricultural calendar.",
      es: "Grecia: calendario mensual Food For Health de frutas y verduras comunes, contrastado con el perfil mediterraneo de la Comision Europea; guia nutricional nacional, no calendario agricola gubernamental.",
      de: "Griechenland: monatlicher Food-For-Health-Kalender fur gangiges Obst und Gemuse, mit dem mediterranen Profil der Europaischen Kommission abgeglichen; nationale Ernahrungsorientierung, kein staatlicher Agrarkalender.",
      it: "Grecia: calendario mensile Food For Health per frutta e verdura comuni, confrontato con il profilo mediterraneo della Commissione europea; guida nutrizionale nazionale, non calendario agricolo governativo.",
      pt: "Grecia: calendario mensal Food For Health para frutas e legumes comuns, cruzado com o perfil mediterranico da Comissao Europeia; orientacao nutricional nacional, nao calendario agricola governamental.",
    },
    sourceIds: ["greece-foodforhealth-season-calendar", "ec-calendar"],
  },
  HR: {
    labels: {
      fr: "Croatie: calendrier Plodovi.hr des fruits, legumes et herbes de saison en Croatie; source pratique de circuit court local, pas calendrier gouvernemental ni precision par region.",
      en: "Croatia: Plodovi.hr calendar for seasonal fruit, vegetables and herbs in Croatia; practical local short-supply-chain source, not a government calendar or regional precision.",
      es: "Croacia: calendario Plodovi.hr de frutas, verduras y hierbas de temporada en Croacia; fuente local practica de cadena corta, no calendario gubernamental ni precision regional.",
      de: "Kroatien: Plodovi.hr-Kalender fuer saisonales Obst, Gemuese und Kraeuter in Kroatien; praktische lokale Kurzlieferketten-Quelle, kein Regierungskalender und keine regionale Genauigkeit.",
      it: "Croazia: calendario Plodovi.hr di frutta, verdura ed erbe di stagione in Croazia; fonte locale pratica di filiera corta, non calendario governativo ne precisione regionale.",
      pt: "Croacia: calendario Plodovi.hr de frutas, legumes e ervas da epoca na Croacia; fonte local pratica de cadeia curta, nao calendario governamental nem precisao regional.",
    },
    sourceIds: ["croatia-plodovi-season-calendar"],
  },
  HU: {
    labels: {
      fr: "Hongrie: table mensuelle Novenytar pour fruits et legumes de saison; source pratique locale, pas calendrier gouvernemental agricole ni precision par comitat.",
      en: "Hungary: Novenytar monthly table for seasonal fruit and vegetables; practical local source, not a government agricultural calendar or county-level precision.",
      es: "Hungria: tabla mensual Novenytar de frutas y verduras de temporada; fuente local practica, no calendario agricola gubernamental ni precision por condado.",
      de: "Ungarn: monatliche Novenytar-Tabelle fur saisonales Obst und Gemuse; praktische lokale Quelle, kein staatlicher Agrarkalender und keine Komitatsgenauigkeit.",
      it: "Ungheria: tabella mensile Novenytar per frutta e verdura di stagione; fonte locale pratica, non calendario agricolo governativo ne precisione per contea.",
      pt: "Hungria: tabela mensal Novenytar de frutas e legumes da epoca; fonte local pratica, nao calendario agricola governamental nem precisao por condado.",
    },
    sourceIds: ["hungary-novenytar-season-table"],
  },
  IN: {
    labels: {
      fr: "Inde: donnees nationales agregees; les saisons varient fortement selon les Etats, l'altitude et les moussons.",
      en: "India: aggregated national data; seasons vary strongly by state, altitude and monsoon pattern.",
      es: "India: datos nacionales agregados; las temporadas varian mucho por estado, altitud y monzon.",
      de: "Indien: aggregierte nationale Daten; Saisons variieren stark nach Bundesstaat, Hohe und Monsun.",
      it: "India: dati nazionali aggregati; le stagioni variano molto per Stato, altitudine e monsone.",
      pt: "India: dados nacionais agregados; as estacoes variam muito por estado, altitude e moncoes.",
    },
    sourceIds: [
      "india-apeda-produce",
      "india-desagri-vegetable-harvest",
      "india-desagri-fruit-harvest",
      "india-nhb-litchi",
    ],
  },
  IS: {
    labels: {
      fr: "Islande: calendrier SFG/Islenskt graenmeti des legumes islandais, incluant serres geothermiques et cultures exterieures; utile pour l'offre locale, pas pour les fruits importes.",
      en: "Iceland: SFG/Islenskt graenmeti calendar for Icelandic vegetables, including geothermal greenhouse and outdoor crops; useful for local supply, not imported fruit.",
      es: "Islandia: calendario SFG/Islenskt graenmeti de verduras islandesas, incluidas producciones en invernadero geotermico y al aire libre; util para oferta local, no frutas importadas.",
      de: "Island: SFG/Islenskt-graenmeti-Kalender fuer islaendisches Gemuese, einschliesslich geothermischer Gewaechshaeuser und Freilandkulturen; nuetzlich fuer lokales Angebot, nicht fuer importiertes Obst.",
      it: "Islanda: calendario SFG/Islenskt graenmeti per ortaggi islandesi, incluse serre geotermiche e colture all'aperto; utile per l'offerta locale, non per frutta importata.",
      pt: "Islandia: calendario SFG/Islenskt graenmeti de legumes islandeses, incluindo estufas geotermicas e culturas ao ar livre; util para oferta local, nao fruta importada.",
    },
    sourceIds: ["iceland-sfg-vegetable-calendar"],
  },
  IE: {
    labels: {
      fr: "Irlande: calendrier Bord Bia Best in Season pour produits frais irlandais, incluant saison pleine, entrees/sorties de saison et stockage.",
      en: "Ireland: Bord Bia Best in Season calendar for Irish fresh produce, including full season, coming in/out of season and storage.",
      es: "Irlanda: calendario Bord Bia Best in Season para productos frescos irlandeses, con plena temporada, entrada/salida de temporada y almacenamiento.",
      de: "Irland: Bord Bia Best in Season-Kalender fur irische Frischprodukte, mit Hauptsaison, Saisonubergangen und Lagerware.",
      it: "Irlanda: calendario Bord Bia Best in Season per prodotti freschi irlandesi, con piena stagione, entrata/uscita stagione e conservazione.",
      pt: "Irlanda: calendario Bord Bia Best in Season para produtos frescos irlandeses, com epoca plena, entrada/saida de epoca e armazenamento.",
    },
    sourceIds: ["ireland-bord-bia-best-in-season"],
  },
  LI: {
    labels: {
      fr: "Liechtenstein: proxy suisse BLW utilise prudemment, car le LLV indique que le droit alimentaire suisse s'applique via le traite douanier; ce n'est pas un calendrier agricole national liechtensteinois.",
      en: "Liechtenstein: Swiss BLW proxy used cautiously, because LLV states Swiss food law applies via the customs treaty; this is not an independent Liechtenstein national harvest calendar.",
      es: "Liechtenstein: proxy suizo BLW usado con cautela, porque LLV indica que la legislacion alimentaria suiza se aplica por el tratado aduanero; no es un calendario agricola nacional independiente.",
      de: "Liechtenstein: Schweizer BLW-Proxy mit Vorsicht genutzt, weil laut LLV Schweizer Lebensmittelrecht durch den Zollvertrag gilt; kein eigenstaendiger nationaler Erntekalender Liechtensteins.",
      it: "Liechtenstein: proxy svizzero BLW usato con cautela, poiche LLV indica che il diritto alimentare svizzero si applica tramite il trattato doganale; non e un calendario agricolo nazionale indipendente.",
      pt: "Liechtenstein: proxy suico BLW usado com cautela, porque o LLV indica que a lei alimentar suica se aplica pelo tratado aduaneiro; nao e calendario agricola nacional independente.",
    },
    sourceIds: ["swiss-blw-season-table", "liechtenstein-llv-swiss-food-law"],
  },
  LU: {
    labels: {
      fr: "Luxembourg: calendrier 2024 du ministere de l'Agriculture pour fruits, legumes et noix regionaux, distinguant produits frais et produits stockes.",
      en: "Luxembourg: 2024 Ministry of Agriculture calendar for regional fruit, vegetables and nuts, distinguishing fresh produce and stored produce.",
      es: "Luxemburgo: calendario 2024 del Ministerio de Agricultura para frutas, verduras y frutos secos regionales, distinguiendo productos frescos y almacenados.",
      de: "Luxemburg: Saisonkalender 2024 des Landwirtschaftsministeriums fuer regionales Obst, Gemuese und Nuesse, mit frischer Ware und Lagerware.",
      it: "Lussemburgo: calendario 2024 del Ministero dell'Agricoltura per frutta, verdura e frutta secca regionali, distinguendo prodotti freschi e conservati.",
      pt: "Luxemburgo: calendario 2024 do Ministerio da Agricultura para frutas, legumes e frutos secos regionais, distinguindo produtos frescos e armazenados.",
    },
    sourceIds: ["luxembourg-agriculture-season-calendar"],
  },
  LV: {
    labels: {
      fr: "Lettonie: calendriers publics IUB/Zemkopibas ministrija pour les produits locaux, utilises en achats alimentaires publics; les mois optimaux sont de saison, le stockage ou la disponibilite plus couteuse est proche saison.",
      en: "Latvia: public IUB/Ministry of Agriculture local produce calendars used for public food procurement; optimal months are in season, storage or higher-cost availability is near season.",
      es: "Letonia: calendarios publicos IUB/Ministerio de Agricultura para productos locales usados en compras alimentarias publicas; meses optimos como temporada y almacenamiento/disponibilidad mas costosa como cercano.",
      de: "Lettland: oeffentliche IUB-/Landwirtschaftsministerium-Kalender fuer lokale Produkte im oeffentlichen Lebensmitteleinkauf; optimale Monate sind Saison, Lagerung oder teurere Verfuegbarkeit ist nahe Saison.",
      it: "Lettonia: calendari pubblici IUB/Ministero dell'Agricoltura per prodotti locali usati negli acquisti alimentari pubblici; mesi ottimali in stagione, stoccaggio o disponibilita piu costosa come quasi stagione.",
      pt: "Letonia: calendarios publicos IUB/Ministerio da Agricultura para produtos locais usados em compras alimentares publicas; meses otimos em epoca, armazenamento ou disponibilidade mais cara como perto da epoca.",
    },
    sourceIds: ["latvia-iub-zm-season-calendars"],
  },
  MC: {
    labels: {
      fr: "Monaco: proxy France mediterraneenne utilise prudemment, car Monaco et la France ont une union douaniere; ce n'est pas un calendrier agricole monegasque autonome.",
      en: "Monaco: Mediterranean France proxy used cautiously, because Monaco and France have a customs union; this is not an independent Monegasque harvest calendar.",
      es: "Monaco: proxy de Francia mediterranea usado con cautela, porque Monaco y Francia tienen una union aduanera; no es un calendario agricola monegasco independiente.",
      de: "Monaco: mediterraner Frankreich-Proxy mit Vorsicht genutzt, weil Monaco und Frankreich eine Zollunion haben; kein eigenstaendiger monegassischer Erntekalender.",
      it: "Monaco: proxy della Francia mediterranea usato con cautela, poiche Monaco e Francia hanno un'unione doganale; non e un calendario agricolo monegasco indipendente.",
      pt: "Monaco: proxy da Franca mediterranica usado com cautela, porque Monaco e Franca tem uma uniao aduaneira; nao e um calendario agricola monegasco independente.",
    },
    sourceIds: ["france-agriculture", "monaco-france-customs-union"],
  },
  SM: {
    labels: {
      fr: "Saint-Marin: proxy Italie utilise prudemment, car Saint-Marin est enclave en Italie et a une union douaniere avec l'UE; ce n'est pas un calendrier agricole national saint-marinais.",
      en: "San Marino: Italy proxy used cautiously, because San Marino is enclaved in Italy and has a customs union with the EU; this is not a Sammarinese national harvest calendar.",
      es: "San Marino: proxy de Italia usado con cautela, porque San Marino esta enclavado en Italia y tiene una union aduanera con la UE; no es un calendario agricola nacional sanmarinense.",
      de: "San Marino: Italien-Proxy mit Vorsicht genutzt, weil San Marino von Italien umgeben ist und eine Zollunion mit der EU hat; kein nationaler san-marinesischer Erntekalender.",
      it: "San Marino: proxy dell'Italia usato con cautela, perche San Marino e enclavato in Italia e ha un'unione doganale con l'UE; non e un calendario agricolo nazionale sammarinese.",
      pt: "San Marino: proxy da Italia usado com cautela, porque San Marino esta encravado na Italia e tem uma uniao aduaneira com a UE; nao e um calendario agricola nacional sanmarinense.",
    },
    sourceIds: ["italy-crea-seasonal-produce", "san-marino-eu-customs-union"],
  },
  VA: {
    labels: {
      fr: "Vatican: proxy Rome/Italie utilise prudemment, car l'Etat est une enclave et ses approvisionnements passent par des relations avec l'Italie; ce n'est pas un calendrier agricole national du Vatican.",
      en: "Vatican City: Rome/Italy proxy used cautiously, because the State is an enclave and its supplies depend on relations with Italy; this is not a Vatican national harvest calendar.",
      es: "Ciudad del Vaticano: proxy Roma/Italia usado con cautela, porque el Estado es un enclave y sus suministros dependen de relaciones con Italia; no es un calendario agricola nacional vaticano.",
      de: "Vatikanstadt: Rom-/Italien-Proxy mit Vorsicht genutzt, weil der Staat eine Enklave ist und seine Versorgung von Beziehungen zu Italien abhaengt; kein nationaler vatikanischer Erntekalender.",
      it: "Citta del Vaticano: proxy Roma/Italia usato con cautela, perche lo Stato e un'enclave e i suoi approvvigionamenti dipendono dai rapporti con l'Italia; non e un calendario agricolo nazionale vaticano.",
      pt: "Cidade do Vaticano: proxy Roma/Italia usado com cautela, porque o Estado e um enclave e o abastecimento depende de relacoes com a Italia; nao e um calendario agricola nacional vaticano.",
    },
    sourceIds: [
      "italy-crea-seasonal-produce",
      "vatican-state-enclave-supplies",
      "vatican-italy-customs-cooperation",
    ],
  },
  LT: {
    labels: {
      fr: "Lituanie: calendrier Commission europeenne en lituanien, section climat maritime incluant explicitement la Lituanie; source par grandes saisons, pas calendrier agricole national mois par mois.",
      en: "Lithuania: European Commission Lithuanian calendar, maritime climate section explicitly including Lithuania; broad-season source, not a national month-by-month agricultural calendar.",
      es: "Lituania: calendario lituano de la Comision Europea, seccion de clima maritimo que incluye explicitamente Lituania; fuente por grandes estaciones, no calendario agricola nacional mensual.",
      de: "Litauen: litauischer Kalender der Europaeischen Kommission, maritime Klimazone mit ausdruecklicher Nennung Litauens; Quelle nach breiten Jahreszeiten, kein nationaler Monats-Agrarkalender.",
      it: "Lituania: calendario lituano della Commissione europea, sezione clima marittimo che include esplicitamente la Lituania; fonte per grandi stagioni, non calendario agricolo nazionale mensile.",
      pt: "Lituania: calendario lituano da Comissao Europeia, secao de clima maritimo que inclui explicitamente a Lituania; fonte por grandes epocas, nao calendario agricola nacional mensal.",
    },
    sourceIds: ["lithuania-ec-maritime-calendar", "ec-calendar"],
  },
  MX: {
    labels: {
      fr: "Mexique: donnees sourcees surtout pour le quatrieme trimestre; le reste reste indicatif.",
      en: "Mexico: source-backed mainly for the fourth quarter; the rest remains indicative.",
      es: "Mexico: datos con fuente sobre todo para el cuarto trimestre; el resto sigue siendo indicativo.",
      de: "Mexiko: Quellenbelege vor allem fur das vierte Quartal; der Rest bleibt indikativ.",
      it: "Messico: dati con fonte soprattutto per il quarto trimestre; il resto resta indicativo.",
      pt: "Mexico: dados com fonte sobretudo para o quarto trimestre; o restante continua indicativo.",
    },
    sourceIds: ["mexico-profeco-seasonal-q4"],
  },
  NO: {
    labels: {
      fr: "Norvege: calendrier national Frukt.no/OFG pour produits norvegiens en saison, utile pour la disponibilite locale par mois.",
      en: "Norway: Frukt.no/OFG national calendar for Norwegian produce in season, useful for local month-by-month availability.",
      es: "Noruega: calendario nacional Frukt.no/OFG de productos noruegos de temporada, util para disponibilidad local por mes.",
      de: "Norwegen: nationaler Frukt.no/OFG-Kalender fur norwegische Saisonprodukte, nutzlich fur lokale Monatsverfugbarkeit.",
      it: "Norvegia: calendario nazionale Frukt.no/OFG per prodotti norvegesi di stagione, utile per disponibilita locale mese per mese.",
      pt: "Noruega: calendario nacional Frukt.no/OFG para produtos noruegueses da epoca, util para disponibilidade local mensal.",
    },
    sourceIds: ["norway-frukt-season-calendar"],
  },
  NZ: {
    labels: {
      fr: "Nouvelle-Zelande: guides nationaux 5+ A Day et Vegetables.co.nz pour disponibilite saisonniere locale; les mois peuvent varier selon region, meteo et stockage.",
      en: "New Zealand: national 5+ A Day and Vegetables.co.nz guides for local seasonal availability; months can vary by region, weather and storage.",
      es: "Nueva Zelanda: guias nacionales de 5+ A Day y Vegetables.co.nz sobre disponibilidad local de temporada; los meses pueden variar por region, clima y almacenamiento.",
      de: "Neuseeland: nationale 5+ A Day- und Vegetables.co.nz-Leitfaeden zur lokalen saisonalen Verfuegbarkeit; Monate koennen je nach Region, Wetter und Lagerung variieren.",
      it: "Nuova Zelanda: guide nazionali 5+ A Day e Vegetables.co.nz sulla disponibilita locale stagionale; i mesi possono variare per regione, meteo e conservazione.",
      pt: "Nova Zelandia: guias nacionais 5+ A Day e Vegetables.co.nz sobre disponibilidade local sazonal; os meses podem variar por regiao, clima e armazenamento.",
    },
    sourceIds: [
      "new-zealand-5aday-season-guide",
      "new-zealand-5aday-availability-chart",
      "new-zealand-vegetables-seasonability-chart",
    ],
  },
  PT: {
    labels: {
      fr: "Portugal: donnees GPP de calendrier de production national 2016; utile pour la saison de production, pas une disponibilite magasin actuelle.",
      en: "Portugal: GPP national 2016 production-calendar data; useful for production season, not current shop availability.",
      es: "Portugal: datos GPP del calendario nacional de produccion 2016; utiles para temporada de produccion, no disponibilidad actual en tienda.",
      de: "Portugal: nationale GPP-Produktionskalenderdaten 2016; nutzlich fur Produktionssaisons, nicht aktuelle Ladenverfugbarkeit.",
      it: "Portogallo: dati GPP del calendario nazionale di produzione 2016; utili per la stagione produttiva, non per la disponibilita attuale in negozio.",
      pt: "Portugal: dados GPP do calendario nacional de producao de 2016; uteis para epoca de producao, nao disponibilidade atual em loja.",
    },
    sourceIds: ["portugal-gpp-plant-products"],
  },
  PL: {
    labels: {
      fr: "Pologne: guide KOWR Kupuj Swiadomie 2025 pour fruits et legumes, mappe par grandes saisons avec stockage et conservation; moins precis qu'un calendrier mois par mois.",
      en: "Poland: KOWR Kupuj Swiadomie 2025 fruit and vegetable guide, mapped by broad seasons with storage and preservation; less precise than a month-by-month calendar.",
      es: "Polonia: guia KOWR Kupuj Swiadomie 2025 de frutas y verduras, mapeada por grandes estaciones con almacenamiento y conservacion; menos precisa que un calendario mensual.",
      de: "Polen: KOWR-Kupuj-Swiadomie-Leitfaden 2025 fur Obst und Gemuse, nach breiten Jahreszeiten mit Lagerung und Konservierung abgebildet; weniger genau als ein Monatskalender.",
      it: "Polonia: guida KOWR Kupuj Swiadomie 2025 per frutta e verdura, mappata per grandi stagioni con conservazione; meno precisa di un calendario mensile.",
      pt: "Polonia: guia KOWR Kupuj Swiadomie 2025 de frutas e legumes, mapeado por grandes estacoes com armazenamento e conservacao; menos preciso que um calendario mensal.",
    },
    sourceIds: ["poland-kowr-conscious-consumer-guide"],
  },
  PK: {
    labels: {
      fr: "Pakistan: fenetres nationales PHDEC pour fruits et legumes majeurs, completees prudemment par le calendrier rabi PBS; les saisons varient selon province, altitude, stockage et irrigation.",
      en: "Pakistan: PHDEC national windows for major fruit and vegetables, cautiously complemented by the PBS rabi crop calendar; seasons vary by province, altitude, storage and irrigation.",
      es: "Pakistan: ventanas nacionales de PHDEC para frutas y verduras principales, complementadas con cautela por el calendario rabi de PBS; las temporadas varian por provincia, altitud, almacenamiento e irrigacion.",
      de: "Pakistan: nationale PHDEC-Fenster fuer wichtige Obst- und Gemuesearten, vorsichtig ergaenzt durch den PBS-Rabi-Anbaukalender; Saisons variieren nach Provinz, Hoehe, Lagerung und Bewaesserung.",
      it: "Pakistan: finestre nazionali PHDEC per i principali prodotti ortofrutticoli, integrate con cautela dal calendario rabi PBS; le stagioni variano per provincia, altitudine, conservazione e irrigazione.",
      pt: "Paquistao: janelas nacionais da PHDEC para frutas e legumes principais, complementadas com cautela pelo calendario rabi do PBS; as epocas variam por provincia, altitude, armazenamento e irrigacao.",
    },
    sourceIds: ["pakistan-phdec-horticulture-introduction", "pakistan-pbs-rabi-crop-calendar"],
  },
  PH: {
    labels: {
      fr: "Philippines: calendrier DOST-FNRI des fruits de saison; utile pour les fruits locaux, pas encore pour les legumes ni pour une precision par ile.",
      en: "Philippines: DOST-FNRI in-season fruits calendar; useful for local fruits, not yet for vegetables or island-by-island precision.",
      es: "Filipinas: calendario DOST-FNRI de frutas de temporada; util para frutas locales, aun no para verduras ni precision por isla.",
      de: "Philippinen: DOST-FNRI-Saisonkalender fuer Obst; nuetzlich fuer lokales Obst, noch nicht fuer Gemuese oder inselgenaue Angaben.",
      it: "Filippine: calendario DOST-FNRI della frutta di stagione; utile per frutta locale, non ancora per verdure o precisione isola per isola.",
      pt: "Filipinas: calendario DOST-FNRI de frutas sazonais; util para frutas locais, ainda nao para legumes nem precisao por ilha.",
    },
    sourceIds: ["philippines-fnri-fruit-calendar"],
  },
  TH: {
    labels: {
      fr: "Thailande: calendrier Thai Fresh Fruit/Pisitichai pour fruits, legumes et herbes thaies; utile comme guide pratique national, pas une source gouvernementale ni une precision province par province.",
      en: "Thailand: Thai Fresh Fruit/Pisitichai calendar for Thai fruit, vegetables and herbs; useful as practical national guidance, not a government source or province-by-province precision.",
      es: "Tailandia: calendario Thai Fresh Fruit/Pisitichai de frutas, verduras y hierbas tailandesas; util como guia nacional practica, no fuente gubernamental ni precision por provincia.",
      de: "Thailand: Thai-Fresh-Fruit/Pisitichai-Kalender fuer thailaendisches Obst, Gemuese und Kraeuter; praktische nationale Orientierung, keine Regierungsquelle oder Provinzgenauigkeit.",
      it: "Thailandia: calendario Thai Fresh Fruit/Pisitichai per frutta, verdure ed erbe thailandesi; utile come guida nazionale pratica, non fonte governativa o precisione per provincia.",
      pt: "Tailandia: calendario Thai Fresh Fruit/Pisitichai de frutas, legumes e ervas tailandesas; util como guia nacional pratico, nao fonte governamental nem precisao por provincia.",
    },
    sourceIds: ["thai-fresh-fruit-season-calendar"],
  },
  ZA: {
    labels: {
      fr: "Afrique du Sud: guide Heleen Meyer des fruits et legumes par saisons australes; utile comme guide pratique national, pas calendrier gouvernemental ni precision par province.",
      en: "South Africa: Heleen Meyer guide to fruit and vegetables by southern-hemisphere seasons; useful as practical national guidance, not a government calendar or province-level precision.",
      es: "Sudafrica: guia Heleen Meyer de frutas y verduras por estaciones australes; util como guia nacional practica, no calendario gubernamental ni precision por provincia.",
      de: "Suedafrika: Heleen-Meyer-Leitfaden fuer Obst und Gemuese nach suedlichen Jahreszeiten; praktische nationale Orientierung, kein Regierungskalender oder Provinzpraezision.",
      it: "Sudafrica: guida Heleen Meyer per frutta e verdura secondo le stagioni australi; utile come guida nazionale pratica, non calendario governativo o precisione provinciale.",
      pt: "Africa do Sul: guia Heleen Meyer de frutas e legumes por estacoes austrais; util como guia nacional pratico, nao calendario governamental nem precisao por provincia.",
    },
    sourceIds: ["south-africa-heleen-meyer-season-guide"],
  },
  TR: {
    labels: {
      fr: "Turquie: calendrier mensuel MEB/MEGEP des fruits et legumes avec colonnes maintenant, bientot et fin de saison; source pedagogique nationale, pas prevision agricole regionale.",
      en: "Turkey: MEB/MEGEP monthly fruit and vegetable calendar with now, coming soon and leaving-season columns; national training material, not a regional agricultural forecast.",
      es: "Turquia: calendario mensual MEB/MEGEP de frutas y verduras con columnas ahora, pronto y fin de temporada; material pedagogico nacional, no prevision agricola regional.",
      de: "Tuerkei: monatlicher MEB/MEGEP-Kalender fuer Obst und Gemuese mit Jetzt-, Bald- und Saisonende-Spalten; nationales Schulungsmaterial, keine regionale Agrarprognose.",
      it: "Turchia: calendario mensile MEB/MEGEP di frutta e verdura con colonne ora, presto e fine stagione; materiale formativo nazionale, non previsione agricola regionale.",
      pt: "Turquia: calendario mensal MEB/MEGEP de frutas e legumes com colunas agora, em breve e fim de epoca; material pedagogico nacional, nao previsao agricola regional.",
    },
    sourceIds: ["turkey-meb-megep-produce-sales-calendar"],
  },
  UY: {
    labels: {
      fr: "Uruguay: calendrier Montevideo/MGAP de saisonnalite des fruits et legumes selon les mois; rouge = offre abondante, bleu = offre moyenne, pas precision par departement.",
      en: "Uruguay: Montevideo/MGAP monthly fruit and vegetable seasonality calendar; red means abundant supply, blue means medium supply, not department-level precision.",
      es: "Uruguay: calendario mensual Montevideo/MGAP de estacionalidad de frutas y hortalizas; rojo indica oferta abundante, azul oferta media, no precision por departamento.",
      de: "Uruguay: monatlicher Montevideo/MGAP-Saisonalitaetskalender fuer Obst und Gemuese; Rot bedeutet reichliches Angebot, Blau mittleres Angebot, keine Departement-Praezision.",
      it: "Uruguay: calendario mensile Montevideo/MGAP di stagionalita per frutta e verdura; rosso indica offerta abbondante, blu offerta media, non precisione per dipartimento.",
      pt: "Uruguai: calendario mensal Montevideo/MGAP de sazonalidade de frutas e horticolas; vermelho indica oferta abundante, azul oferta media, nao precisao por departamento.",
    },
    sourceIds: ["uruguay-montevideo-mgap-season-calendar"],
  },
  AR: {
    labels: {
      fr: "Argentine: guide officiel Argentina.gob.ar des fruits et legumes par grandes saisons; source nationale utile, pas precision par province ni par microclimat.",
      en: "Argentina: official Argentina.gob.ar guide to fruit and vegetables by broad seasons; useful national guidance, not province-level or microclimate precision.",
      es: "Argentina: guia oficial Argentina.gob.ar de frutas y verduras por grandes estaciones; orientacion nacional util, no precision por provincia ni microclima.",
      de: "Argentinien: offizieller Argentina.gob.ar-Leitfaden fuer Obst und Gemuese nach breiten Jahreszeiten; nationale Orientierung, keine Provinz- oder Mikroklima-Praezision.",
      it: "Argentina: guida ufficiale Argentina.gob.ar per frutta e verdura per grandi stagioni; orientamento nazionale utile, non precisione per provincia o microclima.",
      pt: "Argentina: guia oficial Argentina.gob.ar de frutas e legumes por grandes estacoes; orientacao nacional util, nao precisao por provincia nem microclima.",
    },
    sourceIds: ["argentina-agriculture-seasonal-produce"],
  },
  PE: {
    labels: {
      fr: "Perou: calendrier officiel MIDAGRI/Agromercado de disponibilite de recolte pour 17 produits cles; signal national, pas precision par region, altitude ni vallee.",
      en: "Peru: official MIDAGRI/Agromercado harvest-availability calendar for 17 key products; national signal, not region-, altitude- or valley-level precision.",
      es: "Peru: calendario oficial MIDAGRI/Agromercado de disponibilidad de cosecha para 17 productos clave; senal nacional, no precision por region, altitud ni valle.",
      de: "Peru: offizieller MIDAGRI/Agromercado-Ernteverfuegbarkeitskalender fuer 17 Schluesselprodukte; nationales Signal, keine regionale, Hoehen- oder Tal-Praezision.",
      it: "Peru: calendario ufficiale MIDAGRI/Agromercado di disponibilita di raccolta per 17 prodotti chiave; segnale nazionale, non precisione per regione, altitudine o valle.",
      pt: "Peru: calendario oficial MIDAGRI/Agromercado de disponibilidade de colheita para 17 produtos-chave; sinal nacional, nao precisao por regiao, altitude nem vale.",
    },
    sourceIds: ["peru-agromercado-harvest-calendar"],
  },
  CO: {
    labels: {
      fr: "Colombie: calendriers officiels MADR/ENA de semis et recoltes 2010-2016 pour cultures transitoires; signal national historique par culture, pas disponibilite retail actuelle ni precision departementale.",
      en: "Colombia: official MADR/ENA 2010-2016 sowing and harvest calendars for transitory crops; historical national crop signal, not current retail availability or department-level precision.",
      es: "Colombia: calendarios oficiales MADR/ENA 2010-2016 de siembras y cosechas para cultivos transitorios; senal nacional historica por cultivo, no disponibilidad retail actual ni precision departamental.",
      de: "Kolumbien: offizielle MADR/ENA-Aussaat- und Erntekalender 2010-2016 fuer einjaehrige Kulturen; historisches nationales Kultursignal, keine aktuelle Ladenverfuegbarkeit oder Departement-Praezision.",
      it: "Colombia: calendari ufficiali MADR/ENA 2010-2016 di semina e raccolta per colture transitorie; segnale nazionale storico per coltura, non disponibilita retail attuale ne precisione dipartimentale.",
      pt: "Colombia: calendarios oficiais MADR/ENA 2010-2016 de semeadura e colheita para culturas transitorias; sinal nacional historico por cultura, nao disponibilidade retail atual nem precisao departamental.",
    },
    sourceIds: ["colombia-madr-ena-harvest-calendar"],
  },
  TN: {
    labels: {
      fr: "Tunisie: calendrier ADAPT/AICS 2025 des fruits et legumes de saison tunisiens, mois par mois; signal national de sensibilisation, pas precision par gouvernorat, variete ni circuit retail.",
      en: "Tunisia: ADAPT/AICS 2025 month-by-month calendar of Tunisian seasonal fruit and vegetables; national consumer guidance, not governorate-, variety- or retail-channel precision.",
      es: "Tunez: calendario ADAPT/AICS 2025 mensual de frutas y verduras tunecinas de temporada; orientacion nacional para consumidores, no precision por gobernacion, variedad ni canal retail.",
      de: "Tunesien: monatlicher ADAPT/AICS-Kalender 2025 fuer tunesisches saisonales Obst und Gemuese; nationale Verbraucherorientierung, keine Praezision nach Gouvernement, Sorte oder Handel.",
      it: "Tunisia: calendario mensile ADAPT/AICS 2025 di frutta e verdura tunisine di stagione; guida nazionale per consumatori, non precisione per governatorato, varieta o canale retail.",
      pt: "Tunisia: calendario mensal ADAPT/AICS 2025 de frutas e legumes tunisinos da epoca; orientacao nacional ao consumidor, nao precisao por governadoria, variedade nem canal retail.",
    },
    sourceIds: ["tunisia-adapt-aics-season-calendar"],
  },
  RO: {
    labels: {
      fr: "Roumanie: calendrier Commission europeenne en roumain, section climat tempere incluant explicitement la Roumanie; source par grandes saisons, pas calendrier agricole national mois par mois.",
      en: "Romania: European Commission Romanian calendar, temperate climate section explicitly including Romania; broad-season source, not a national month-by-month agricultural calendar.",
      es: "Rumania: calendario rumano de la Comision Europea, seccion de clima templado que incluye explicitamente Rumania; fuente por grandes estaciones, no calendario agricola nacional mensual.",
      de: "Rumaenien: rumaenischer Kalender der Europaeischen Kommission, gemaessigte Klimazone mit ausdruecklicher Nennung Rumaeniens; Quelle nach breiten Jahreszeiten, kein nationaler Monats-Agrarkalender.",
      it: "Romania: calendario rumeno della Commissione europea, sezione clima temperato che include esplicitamente la Romania; fonte per grandi stagioni, non calendario agricolo nazionale mensile.",
      pt: "Romenia: calendario romeno da Comissao Europeia, secao de clima temperado que inclui explicitamente a Romenia; fonte por grandes epocas, nao calendario agricola nacional mensal.",
    },
    sourceIds: ["romania-ec-temperate-calendar", "ec-calendar"],
  },
  SE: {
    labels: {
      fr: "Suede: guide ICA des legumes, fruits et baies suedoises de saison; utile comme guide national pratique, pas une source gouvernementale ni une precision regionale.",
      en: "Sweden: ICA guide to Swedish vegetables, fruit and berries in season; useful as practical national guidance, not a government source or regional precision.",
      es: "Suecia: guia de ICA de verduras, frutas y bayas suecas de temporada; util como guia nacional practica, no como fuente gubernamental ni precision regional.",
      de: "Schweden: ICA-Leitfaden zu schwedischem Gemuese, Obst und Beeren der Saison; praktische nationale Orientierung, keine Regierungsquelle oder regionale Genauigkeit.",
      it: "Svezia: guida ICA a verdure, frutta e bacche svedesi di stagione; utile come guida nazionale pratica, non come fonte governativa o precisione regionale.",
      pt: "Suecia: guia ICA de legumes, frutas e bagas suecas da epoca; util como orientacao nacional pratica, nao como fonte governamental nem precisao regional.",
    },
    sourceIds: ["sweden-ica-season-guide"],
  },
};

const allCountryCodes =
  "AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW";

const countryCodes = allCountryCodes.split(" ");

const southTemperate = new Set([
  "AR",
  "AU",
  "CL",
  "NZ",
  "UY",
  "ZA",
  "LS",
  "SZ",
  "FK",
  "GS",
]);

const tropical = new Set([
  "AO",
  "AI",
  "AG",
  "AW",
  "BS",
  "BB",
  "BZ",
  "BJ",
  "BO",
  "BR",
  "BF",
  "BI",
  "CV",
  "KH",
  "CM",
  "KY",
  "CF",
  "TD",
  "CO",
  "KM",
  "CG",
  "CD",
  "CR",
  "CI",
  "CU",
  "CW",
  "DJ",
  "DM",
  "DO",
  "EC",
  "SV",
  "GQ",
  "ER",
  "ET",
  "FJ",
  "GF",
  "PF",
  "GA",
  "GM",
  "GH",
  "GD",
  "GP",
  "GT",
  "GN",
  "GW",
  "GY",
  "HT",
  "HN",
  "IN",
  "ID",
  "JM",
  "KE",
  "KI",
  "LA",
  "LR",
  "MG",
  "MW",
  "MY",
  "MV",
  "ML",
  "MQ",
  "MR",
  "MU",
  "MX",
  "MZ",
  "MM",
  "NA",
  "NI",
  "NE",
  "NG",
  "PA",
  "PG",
  "PY",
  "PE",
  "PH",
  "PR",
  "RE",
  "RW",
  "WS",
  "ST",
  "SN",
  "SC",
  "SL",
  "SG",
  "SB",
  "SO",
  "SS",
  "LK",
  "SD",
  "SR",
  "TZ",
  "TH",
  "TL",
  "TG",
  "TO",
  "TT",
  "UG",
  "VU",
  "VE",
  "VN",
  "YE",
  "ZM",
  "ZW",
]);

const mediterranean = new Set([
  "CY",
  "GR",
  "IT",
  "MC",
  "MT",
  "PT",
  "ES",
  "TR",
  "MA",
  "DZ",
  "TN",
  "LY",
  "EG",
  "IL",
  "LB",
  "SY",
]);

const mountain = new Set(["CH", "AT", "LI", "NP", "BT"]);

const europeTemperate = new Set([
  "BE",
  "BG",
  "HR",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "HU",
  "IE",
  "LV",
  "LT",
  "LU",
  "NL",
  "NO",
  "PL",
  "RO",
  "RS",
  "SK",
  "SI",
  "SE",
  "GB",
]);

export const countryOptions: CountryOption[] = countryCodes.map((code) => ({
  code,
  profileId: getProfileForCountry(code),
}));

export function getProfileForCountry(code: string): SeasonProfileId {
  if (mountain.has(code)) return "europe-mountain";
  if (mediterranean.has(code)) return "mediterranean";
  if (europeTemperate.has(code)) return "europe-temperate";
  if (southTemperate.has(code)) return "south-temperate";
  if (tropical.has(code)) return "tropical";
  return "north-temperate";
}

export function getCountryName(code: string, locale: Locale) {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}
