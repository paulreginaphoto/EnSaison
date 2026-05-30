import type { Locale } from "../types";

export type MonthOption = {
  value: number;
  label: string;
  shortLabel: string;
};

export const months: MonthOption[] = [
  { value: 1, label: "janvier", shortLabel: "janv." },
  { value: 2, label: "février", shortLabel: "févr." },
  { value: 3, label: "mars", shortLabel: "mars" },
  { value: 4, label: "avril", shortLabel: "avr." },
  { value: 5, label: "mai", shortLabel: "mai" },
  { value: 6, label: "juin", shortLabel: "juin" },
  { value: 7, label: "juillet", shortLabel: "juil." },
  { value: 8, label: "août", shortLabel: "août" },
  { value: 9, label: "septembre", shortLabel: "sept." },
  { value: 10, label: "octobre", shortLabel: "oct." },
  { value: 11, label: "novembre", shortLabel: "nov." },
  { value: 12, label: "décembre", shortLabel: "déc." },
];

export const getCurrentMonth = () => new Date().getMonth() + 1;

const localizedMonths: Record<
  Locale,
  { labels: string[]; shortLabels: string[] }
> = {
  fr: {
    labels: months.map((month) => month.label),
    shortLabels: months.map((month) => month.shortLabel),
  },
  en: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    shortLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  },
  es: {
    labels: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    shortLabels: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."],
  },
  de: {
    labels: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
    shortLabels: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."],
  },
  it: {
    labels: [
      "gennaio",
      "febbraio",
      "marzo",
      "aprile",
      "maggio",
      "giugno",
      "luglio",
      "agosto",
      "settembre",
      "ottobre",
      "novembre",
      "dicembre",
    ],
    shortLabels: ["gen.", "feb.", "mar.", "apr.", "mag.", "giu.", "lug.", "ago.", "set.", "ott.", "nov.", "dic."],
  },
  pt: {
    labels: [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ],
    shortLabels: ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."],
  },
};

export const getMonthLabel = (month: number, locale: Locale = "fr") =>
  localizedMonths[locale].labels[month - 1] ?? localizedMonths.fr.labels[4];

export const getMonthShortLabel = (month: number, locale: Locale = "fr") =>
  localizedMonths[locale].shortLabels[month - 1] ??
  localizedMonths.fr.shortLabels[4];

export const getMonthsForLocale = (locale: Locale): MonthOption[] =>
  months.map((month) => ({
    value: month.value,
    label: getMonthLabel(month.value, locale),
    shortLabel: getMonthShortLabel(month.value, locale),
  }));
