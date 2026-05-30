import appIcon from "../assets/icons/app-icon.svg";
import { LocationSelector } from "./LocationSelector";
import { MonthSelector } from "./MonthSelector";

type HeaderProps = {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
};

export function Header({ selectedMonth, onMonthChange }: HeaderProps) {
  const homeHref = import.meta.env.BASE_URL;

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <a href={homeHref} className="flex items-center gap-3" aria-label="De Saison">
        <img src={appIcon} alt="" className="h-12 w-12" />
        <div>
          <h1 className="text-3xl font-semibold leading-none text-ink">
            De Saison
          </h1>
        </div>
      </a>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
        <LocationSelector />
        <MonthSelector
          selectedMonth={selectedMonth}
          onMonthChange={onMonthChange}
        />
      </div>
    </header>
  );
}
