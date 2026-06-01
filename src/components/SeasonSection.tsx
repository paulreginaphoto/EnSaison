import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
  subtitle: string;
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

const sectionActions: Record<Locale, { showAll: string; showLess: string }> = {
  fr: { showAll: "Voir tout", showLess: "Voir moins" },
  en: { showAll: "Show all", showLess: "Show less" },
  es: { showAll: "Ver todo", showLess: "Ver menos" },
  de: { showAll: "Alles zeigen", showLess: "Weniger" },
  it: { showAll: "Vedi tutto", showLess: "Vedi meno" },
  pt: { showAll: "Ver tudo", showLess: "Ver menos" },
};

export function SeasonSection({
  title,
  subtitle,
  items,
  locale,
  emptyLabel,
  labels,
}: SeasonSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const canExpand = items.length > 4;
  const visibleItems = isExpanded ? items : items.slice(0, 4);
  const actions = sectionActions[locale];
  const headingId = "season-results-title";

  return (
    <section className="section-shell" aria-labelledby={headingId}>
      <div className="section-heading">
        <div className="min-w-0">
          <h2 id={headingId}>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <span className="section-count">{items.length}</span>
      </div>

      {items.length > 0 ? (
        <>
          <ul>
            {visibleItems.map(({ item, status, season }) => (
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
          {canExpand ? (
            <button
              aria-expanded={isExpanded}
              className="show-all-button"
              type="button"
              onClick={() => setIsExpanded((value) => !value)}
            >
              {isExpanded ? actions.showLess : actions.showAll}
              <ChevronDown aria-hidden="true" className="show-all-icon" />
            </button>
          ) : null}
        </>
      ) : (
        <div className="empty-state">
          <img src={emptyStateIcon} alt="" className="h-16 w-16" />
          <p>{emptyLabel}</p>
        </div>
      )}
    </section>
  );
}
