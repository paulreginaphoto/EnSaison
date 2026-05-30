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

export const getMonthLabel = (month: number) =>
  months.find((entry) => entry.value === month)?.label ?? "mai";
