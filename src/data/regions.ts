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
  BR: {
    labels: {
      fr: "Bresil: donnees indicatives; les references CEAGESP refletent surtout un signal de marche de Sao Paulo, pas tout le pays.",
      en: "Brazil: indicative data; CEAGESP references mainly reflect a Sao Paulo market signal, not the whole country.",
      es: "Brasil: datos indicativos; las referencias CEAGESP reflejan sobre todo el mercado de Sao Paulo, no todo el pais.",
      de: "Brasilien: indikative Daten; CEAGESP verweist vor allem auf den Markt Sao Paulo, nicht auf das ganze Land.",
      it: "Brasile: dati indicativi; i riferimenti CEAGESP riflettono soprattutto il mercato di Sao Paulo, non tutto il Paese.",
      pt: "Brasil: dados indicativos; as referencias CEAGESP refletem sobretudo o mercado de Sao Paulo, nao todo o pais.",
    },
    sourceIds: ["brazil-ceagesp-seasonality"],
  },
  CA: {
    labels: {
      fr: "Canada: donnees indicatives; les references Foodland Ontario aident, mais ne remplacent pas une precision province par province.",
      en: "Canada: indicative data; Foodland Ontario references help, but they do not replace province-by-province precision.",
      es: "Canada: datos indicativos; Foodland Ontario ayuda, pero no sustituye una precision provincia por provincia.",
      de: "Kanada: indikative Daten; Foodland Ontario hilft, ersetzt aber keine Genauigkeit nach Provinz.",
      it: "Canada: dati indicativi; Foodland Ontario aiuta, ma non sostituisce una precisione provincia per provincia.",
      pt: "Canada: dados indicativos; Foodland Ontario ajuda, mas nao substitui precisao provincia por provincia.",
    },
    sourceIds: ["foodland-ontario-availability"],
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
