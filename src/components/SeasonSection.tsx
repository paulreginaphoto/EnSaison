import type { SeasonItem, SeasonStatus } from "../types";
import type { ResolvedSeason } from "../lib/season";
import type { Locale, SeasonCategory } from "../types";
import emptyStateIcon from "../assets/icons/empty-state.svg";
import { SeasonItemRow } from "./SeasonItemRow";

type SectionItem = {
  item: SeasonItem;
  status: SeasonStatus;
  season: ResolvedSeason;
};

type SeasonSectionProps = {
  title: string;
  items: SectionItem[];
  locale: Locale;
  emptyLabel: string;
  labels: {
    categories: Record<SeasonCategory, string>;
    statuses: Record<SeasonStatus, string>;
    confidence: Record<"source" | "model" | "indicative" | "taxonomy", string>;
    sourceShort: string;
    details: string;
    hideDetails: string;
    dataLevel: string;
    seasonPeriod: string;
  };
};

export function SeasonSection({
  title,
  items,
  locale,
  emptyLabel,
  labels,
}: SeasonSectionProps) {
  return (
    <section className="section-shell" aria-labelledby={`${title}-title`}>
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-semibold text-ink" id={`${title}-title`}>
          {title}
        </h2>
        <span className="text-sm font-semibold text-ink/45">{items.length}</span>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-2.5">
          {items.map(({ item, status, season }) => (
            <SeasonItemRow
              item={item}
              key={item.id}
              labels={labels}
              locale={locale}
              season={season}
              status={status}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <img src={emptyStateIcon} alt="" className="h-16 w-16" />
          <p>{emptyLabel}</p>
        </div>
      )}
    </section>
  );
}
