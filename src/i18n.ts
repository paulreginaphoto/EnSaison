import type { Locale, SeasonCategory, SeasonStatus } from "./types";

type Dictionary = {
  appTagline: string;
  about: string;
  back: string;
  soon: string;
  inSeason: string;
  outSeason: string;
  noResult: string;
  search: string;
  country: string;
  language: string;
  month: string;
  seasonal: string;
  footer: string;
  dataNote: string;
  source: string;
  sourceShort: string;
  all: string;
  categories: Record<SeasonCategory, string>;
  statuses: Record<SeasonStatus, string>;
  confidence: Record<"source" | "model" | "indicative", string>;
  aboutCopy: [string, string, string];
};

export const locales: { value: Locale; label: string }[] = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" },
];

export const dictionary: Record<Locale, Dictionary> = {
  fr: {
    appTagline: "Simple, local, de saison.",
    about: "À propos",
    back: "Retour",
    soon: "Bientôt",
    inSeason: "De saison",
    outSeason: "Hors saison",
    noResult: "Aucun résultat",
    search: "Rechercher un aliment…",
    country: "Pays",
    language: "Langue",
    month: "Mois",
    seasonal: "De saison",
    footer: "Simple, local, sourcé.",
    dataNote: "Repère saisonnier indicatif: les récoltes varient selon climat, altitude et production locale.",
    source: "Sources",
    sourceShort: "source",
    all: "Tous",
    categories: {
      fruit: "Fruits",
      vegetable: "Légumes",
      mushroom: "Champignons",
      herb: "Herbes",
      legume: "Légumineuses",
      grain: "Céréales",
      nut: "Noix",
      seed: "Graines",
      spice: "Épices",
    },
    statuses: {
      "in-season": "De saison",
      soon: "Bientôt",
      out: "Hors saison",
    },
    confidence: {
      source: "sourcé",
      model: "modélisé",
      indicative: "indicatif",
    },
    aboutCopy: [
      "DeSaison aide à repérer rapidement les aliments de saison selon le pays ou le grand profil climatique choisi.",
      "Les données sont séparées par source et par niveau de confiance afin d’éviter de présenter une approximation comme une certitude locale.",
      "L’objectif final est une couverture mondiale complète; cette version pose l’architecture multilingue et le catalogue sourcé qui pourra être enrichi pays par pays.",
    ],
  },
  en: {
    appTagline: "Simple, local, seasonal.",
    about: "About",
    back: "Back",
    soon: "Soon",
    inSeason: "In season",
    outSeason: "Out of season",
    noResult: "No results",
    search: "Search any food…",
    country: "Country",
    language: "Language",
    month: "Month",
    seasonal: "In season",
    footer: "Simple, local, sourced.",
    dataNote: "Indicative season guide: harvests vary by climate, altitude and local production.",
    source: "Sources",
    sourceShort: "source",
    all: "All",
    categories: {
      fruit: "Fruits",
      vegetable: "Vegetables",
      mushroom: "Mushrooms",
      herb: "Herbs",
      legume: "Legumes",
      grain: "Grains",
      nut: "Nuts",
      seed: "Seeds",
      spice: "Spices",
    },
    statuses: {
      "in-season": "In season",
      soon: "Soon",
      out: "Out",
    },
    confidence: {
      source: "sourced",
      model: "modeled",
      indicative: "indicative",
    },
    aboutCopy: [
      "DeSaison helps people quickly see seasonal foods for the selected country or climate profile.",
      "Data is split by source and confidence level so an approximation is not presented as local certainty.",
      "The final goal is complete worldwide coverage; this version adds the multilingual architecture and sourced catalogue that can be enriched country by country.",
    ],
  },
  es: {
    appTagline: "Simple, local, de temporada.",
    about: "Acerca de",
    back: "Volver",
    soon: "Pronto",
    inSeason: "De temporada",
    outSeason: "Fuera",
    noResult: "Sin resultados",
    search: "Buscar un alimento…",
    country: "País",
    language: "Idioma",
    month: "Mes",
    seasonal: "De temporada",
    footer: "Simple, local, con fuentes.",
    dataNote: "Guía estacional indicativa: las cosechas varían por clima, altitud y producción local.",
    source: "Fuentes",
    sourceShort: "fuente",
    all: "Todos",
    categories: {
      fruit: "Frutas",
      vegetable: "Verduras",
      mushroom: "Hongos",
      herb: "Hierbas",
      legume: "Legumbres",
      grain: "Cereales",
      nut: "Frutos secos",
      seed: "Semillas",
      spice: "Especias",
    },
    statuses: {
      "in-season": "De temporada",
      soon: "Pronto",
      out: "Fuera",
    },
    confidence: {
      source: "con fuente",
      model: "modelado",
      indicative: "indicativo",
    },
    aboutCopy: [
      "DeSaison ayuda a ver rápidamente alimentos de temporada según el país o perfil climático.",
      "Los datos muestran fuente y confianza para no convertir una aproximación en certeza local.",
      "La meta final es cobertura mundial completa; esta versión añade la arquitectura multilingüe y el catálogo con fuentes.",
    ],
  },
  de: {
    appTagline: "Einfach, lokal, saisonal.",
    about: "Info",
    back: "Zurück",
    soon: "Bald",
    inSeason: "Saisonal",
    outSeason: "Außer Saison",
    noResult: "Kein Ergebnis",
    search: "Lebensmittel suchen…",
    country: "Land",
    language: "Sprache",
    month: "Monat",
    seasonal: "Saisonal",
    footer: "Einfach, lokal, belegt.",
    dataNote: "Orientierende Saisonangaben: Ernten variieren je nach Klima, Höhe und lokaler Produktion.",
    source: "Quellen",
    sourceShort: "Quelle",
    all: "Alle",
    categories: {
      fruit: "Obst",
      vegetable: "Gemüse",
      mushroom: "Pilze",
      herb: "Kräuter",
      legume: "Hülsenfrüchte",
      grain: "Getreide",
      nut: "Nüsse",
      seed: "Samen",
      spice: "Gewürze",
    },
    statuses: {
      "in-season": "Saisonal",
      soon: "Bald",
      out: "Außer Saison",
    },
    confidence: {
      source: "belegt",
      model: "modelliert",
      indicative: "indikativ",
    },
    aboutCopy: [
      "DeSaison zeigt schnell saisonale Lebensmittel für das gewählte Land oder Klimaprofil.",
      "Daten sind nach Quelle und Vertrauensgrad getrennt, damit Näherungen nicht als lokale Gewissheit erscheinen.",
      "Ziel bleibt vollständige weltweite Abdeckung; diese Version schafft Architektur und belegten Katalog.",
    ],
  },
  it: {
    appTagline: "Semplice, locale, di stagione.",
    about: "Info",
    back: "Indietro",
    soon: "Presto",
    inSeason: "Di stagione",
    outSeason: "Fuori stagione",
    noResult: "Nessun risultato",
    search: "Cerca un alimento…",
    country: "Paese",
    language: "Lingua",
    month: "Mese",
    seasonal: "Di stagione",
    footer: "Semplice, locale, con fonti.",
    dataNote: "Guida stagionale indicativa: i raccolti variano per clima, altitudine e produzione locale.",
    source: "Fonti",
    sourceShort: "fonte",
    all: "Tutti",
    categories: {
      fruit: "Frutta",
      vegetable: "Verdure",
      mushroom: "Funghi",
      herb: "Erbe",
      legume: "Legumi",
      grain: "Cereali",
      nut: "Frutta secca",
      seed: "Semi",
      spice: "Spezie",
    },
    statuses: {
      "in-season": "Di stagione",
      soon: "Presto",
      out: "Fuori",
    },
    confidence: {
      source: "con fonte",
      model: "modellato",
      indicative: "indicativo",
    },
    aboutCopy: [
      "DeSaison aiuta a vedere rapidamente gli alimenti stagionali per paese o profilo climatico.",
      "I dati mostrano fonte e confidenza per non presentare una stima come certezza locale.",
      "L’obiettivo resta una copertura mondiale completa; questa versione aggiunge architettura multilingue e catalogo con fonti.",
    ],
  },
  pt: {
    appTagline: "Simples, local, sazonal.",
    about: "Sobre",
    back: "Voltar",
    soon: "Em breve",
    inSeason: "Da época",
    outSeason: "Fora de época",
    noResult: "Sem resultados",
    search: "Pesquisar alimento…",
    country: "País",
    language: "Idioma",
    month: "Mês",
    seasonal: "Da época",
    footer: "Simples, local, com fontes.",
    dataNote: "Guia sazonal indicativo: colheitas variam por clima, altitude e produção local.",
    source: "Fontes",
    sourceShort: "fonte",
    all: "Todos",
    categories: {
      fruit: "Frutas",
      vegetable: "Legumes",
      mushroom: "Cogumelos",
      herb: "Ervas",
      legume: "Leguminosas",
      grain: "Cereais",
      nut: "Nozes",
      seed: "Sementes",
      spice: "Especiarias",
    },
    statuses: {
      "in-season": "Da época",
      soon: "Em breve",
      out: "Fora",
    },
    confidence: {
      source: "com fonte",
      model: "modelado",
      indicative: "indicativo",
    },
    aboutCopy: [
      "DeSaison ajuda a ver rapidamente alimentos sazonais para o país ou perfil climático escolhido.",
      "Os dados mostram fonte e confiança para não tratar uma aproximação como certeza local.",
      "A meta final é cobertura mundial completa; esta versão adiciona arquitetura multilíngue e catálogo com fontes.",
    ],
  },
};

export const t = (locale: Locale) => dictionary[locale];
