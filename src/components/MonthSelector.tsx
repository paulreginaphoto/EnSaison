import { CalendarDays } from "lucide-react";
import { getMonthsForLocale } from "../data/months";
import type { Locale } from "../types";
import { SelectorControl } from "./SelectorControl";

type MonthSelectorProps = {
  locale: Locale;
  selectedMonth: number;
  onMonthChange: (month: number) => void;
  label: string;
};

export function MonthSelector({
  locale,
  selectedMonth,
  onMonthChange,
  label,
}: MonthSelectorProps) {
  return (
    <SelectorControl
      icon={<CalendarDays aria-hidden="true" className="control-icon" />}
      label={label}
      name="month"
      options={getMonthsForLocale(locale).map((month) => ({
        label: month.label,
        value: String(month.value),
      }))}
      value={String(selectedMonth)}
      onChange={(value) => onMonthChange(Number(value))}
    />
  );
}
