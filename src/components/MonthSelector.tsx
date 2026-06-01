import { CalendarDays, ChevronDown } from "lucide-react";
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
    <label className="control-shell">
      <CalendarDays aria-hidden="true" className="control-icon" />
      <span className="control-copy">
        <span className="control-label">{label}</span>
        <select
          aria-label={label}
          className="control-select"
          name="month"
          value={selectedMonth}
          onChange={(event) => onMonthChange(Number(event.target.value))}
        >
          {getMonthsForLocale(locale).map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </span>
      <ChevronDown aria-hidden="true" className="control-chevron" />
    </label>
  );
}
