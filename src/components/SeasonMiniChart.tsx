import { getMonthsForLocale } from "../data/months";
import type { ResolvedSeason } from "../lib/season";
import type { Locale, SeasonStatus } from "../types";

type ChartMonthStatus = Exclude<SeasonStatus, "variable">;

type SeasonMiniChartProps = {
  season: ResolvedSeason;
  selectedMonth: number;
  locale: Locale;
  labels: Record<SeasonStatus, string>;
  periodLabel: string;
};

function getChartMonthStatus(
  season: Pick<ResolvedSeason, "months" | "nearMonths">,
  month: number,
): ChartMonthStatus {
  if (season.months.includes(month)) return "in-season";
  if (season.nearMonths.includes(month)) return "soon";
  return "out";
}

export function SeasonMiniChart({
  season,
  selectedMonth,
  locale,
  labels,
  periodLabel,
}: SeasonMiniChartProps) {
  const monthOptions = getMonthsForLocale(locale);
  const ariaLabel = `${periodLabel}: ${season.seasonLabel}`;

  return (
    <span className="season-chart" data-season-chart role="img" aria-label={ariaLabel}>
      {monthOptions.map((month) => {
        const monthStatus = getChartMonthStatus(season, month.value);
        const isCurrent = month.value === selectedMonth;
        const badgeLabel = month.shortLabel
          .replace(".", "")
          .slice(0, 1)
          .toLocaleUpperCase(locale);

        return (
          <span
            aria-hidden="true"
            className="season-month"
            data-current-month={isCurrent ? "true" : "false"}
            data-month-label={badgeLabel}
            data-season-month
            data-season-state={monthStatus}
            key={month.value}
            title={`${month.label}: ${labels[monthStatus]}`}
          >
            {badgeLabel}
          </span>
        );
      })}
    </span>
  );
}
