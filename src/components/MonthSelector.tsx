import { CalendarDays } from "lucide-react";
import { months } from "../data/months";

type MonthSelectorProps = {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
};

export function MonthSelector({
  selectedMonth,
  onMonthChange,
}: MonthSelectorProps) {
  return (
    <label className="control-shell" aria-label="Mois">
      <CalendarDays aria-hidden="true" className="h-4 w-4 text-sage-700" />
      <select
        className="control-select"
        value={selectedMonth}
        onChange={(event) => onMonthChange(Number(event.target.value))}
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </label>
  );
}
