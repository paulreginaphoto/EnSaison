import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { getItemName } from "../lib/season";
import type { SeasonItem, SeasonStatus } from "../types";
import type { ResolvedSeason } from "../lib/season";
import type { Locale, SeasonCategory, SupplyOrigin } from "../types";
import { dataSources } from "../data/sources";
import { ProduceIcon } from "./ProduceIcon";
import { SeasonMiniChart } from "./SeasonMiniChart";

type SeasonItemRowProps = {
  item: SeasonItem;
  status: SeasonStatus;
  season: ResolvedSeason;
  locale: Locale;
  selectedMonth: number;
  labels: {
    categories: Record<SeasonCategory, string>;
    statuses: Record<SeasonStatus, string>;
    confidence: Record<"source" | "model" | "indicative" | "taxonomy", string>;
    sourceShort: string;
    details: string;
    hideDetails: string;
    dataLevel: string;
    supplyOriginLabel: string;
    supplyOrigins: Record<SupplyOrigin, string>;
    seasonPeriod: string;
  };
};

const statusClasses: Record<SeasonStatus, string> = {
  "in-season": "badge-in-season",
  soon: "badge-soon",
  out: "badge-out",
  variable: "badge-variable",
};

const itemThumbnailModules = import.meta.glob<string>(
  "../assets/produce/items/*.webp",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const itemThumbnails: Record<string, string> = Object.fromEntries(
  Object.entries(itemThumbnailModules).map(([path, src]) => [
    decodeURIComponent(path.split("/").pop()?.replace(/\.webp$/, "") ?? ""),
    src,
  ]),
);

export function SeasonItemRow({
  item,
  status,
  season,
  locale,
  selectedMonth,
  labels,
}: SeasonItemRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sourceCount = season.sourceIds.length;
  const detailsLabel = isOpen ? labels.hideDetails : labels.details;

  return (
    <li className="item-row" data-category={item.category} data-season-row data-status={status}>
      {itemThumbnails[item.id] ? (
        <img
          alt=""
          className="item-photo"
          loading="lazy"
          src={itemThumbnails[item.id]}
        />
      ) : (
        <ProduceIcon category={item.category} icon={item.icon} />
      )}
      <div className="item-row-content">
        <div className="item-row-main">
          <div className="min-w-0">
            <p className="item-name">
              {getItemName(item, locale)}
            </p>
            <p className="item-category">
              {labels.categories[item.category]}
            </p>
          </div>
          <span className={`season-badge shrink-0 ${statusClasses[status]}`}>
            {labels.statuses[status]}
          </span>
        </div>
        <p className="item-season">
          <span className="season-period-label">{labels.seasonPeriod}</span>
          <SeasonMiniChart
            labels={labels.statuses}
            locale={locale}
            periodLabel={labels.seasonPeriod}
            season={season}
            selectedMonth={selectedMonth}
          />
          <span className="season-confidence">{labels.confidence[season.confidence]}</span>
          <span className={`season-origin origin-${season.origin}`}>
            {labels.supplyOrigins[season.origin]}
          </span>
        </p>
        <button
          aria-label={`${detailsLabel} (${sourceCount})`}
          aria-expanded={isOpen}
          className="details-button"
          title={detailsLabel}
          type="button"
          onClick={() => setIsOpen((value) => !value)}
        >
          <ChevronRight aria-hidden="true" className="details-chevron" />
        </button>
        {isOpen ? (
          <div className="details-panel">
            <dl className="grid gap-1.5">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{labels.seasonPeriod}</dt>
                <dd>{season.seasonLabel}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{labels.dataLevel}</dt>
                <dd>{labels.confidence[season.confidence]}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{labels.supplyOriginLabel}</dt>
                <dd>{labels.supplyOrigins[season.origin]}</dd>
              </div>
            </dl>
            <div className="mt-2 flex flex-wrap gap-2">
              {season.sourceIds.slice(0, 4).map((sourceId) => {
                const source = dataSources[sourceId as keyof typeof dataSources];
                return (
                  <a
                    aria-label={source?.label ?? labels.sourceShort}
                    className="source-link"
                    href={source?.url}
                    key={sourceId}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {source?.label ?? sourceId}
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </li>
  );
}
