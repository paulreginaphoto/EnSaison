import type { Locale, SeasonProfileId } from "../types";
import type { DataSourceId } from "./sources";

export type CountryOption = {
  code: string;
  profileId: SeasonProfileId;
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
