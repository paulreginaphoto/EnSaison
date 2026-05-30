import { CalendarDays } from "lucide-react";
import { getMonthsForLocale } from "../data/months";
import type { Locale } from "../types";

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
    <label className="control-shell" aria-label={label}>
      <CalendarDays aria-hidden="true" className="h-4 w-4 text-sage-700" />
      <select
        className="control-select"
        value={selectedMonth}
        onChange={(event) => onMonthChange(Number(event.target.value))}
      >
        {getMonthsForLocale(locale).map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </label>
  );
}
