import { useState } from "react";
import { getItemName } from "../lib/season";
import type { SeasonItem, SeasonStatus } from "../types";
import type { ResolvedSeason } from "../lib/season";
import type { Locale, SeasonCategory } from "../types";
import { dataSources } from "../data/sources";
import { ProduceIcon } from "./ProduceIcon";

type SeasonItemRowProps = {
  item: SeasonItem;
  status: SeasonStatus;
  season: ResolvedSeason;
  locale: Locale;
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

const statusClasses: Record<SeasonStatus, string> = {
  "in-season": "badge-in-season",
  soon: "badge-soon",
  out: "badge-out",
  variable: "badge-variable",
};

export function SeasonItemRow({
  item,
  status,
  season,
  locale,
  labels,
}: SeasonItemRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sourceCount = season.sourceIds.length;

  return (
    <li className="item-row" data-season-row>
      <ProduceIcon category={item.category} icon={item.icon} />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-ink">
              {getItemName(item, locale)}
            </p>
            <p className="text-sm font-medium text-ink/55">
              {labels.categories[item.category]}
            </p>
          </div>
          <span className={`season-badge shrink-0 ${statusClasses[status]}`}>
            {labels.statuses[status]}
          </span>
        </div>
        <p className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium text-ink/50">
          <span>{season.seasonLabel}</span>
          <span>· {labels.confidence[season.confidence]}</span>
        </p>
        <button
          aria-expanded={isOpen}
          className="mt-2 text-left text-sm font-semibold text-sage-700 underline-offset-4 transition hover:text-ink hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
          type="button"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? labels.hideDetails : `${labels.details} (${sourceCount})`}
        </button>
        {isOpen ? (
          <div className="mt-3 rounded-xl bg-linen/65 p-3 text-sm text-ink/65">
            <dl className="grid gap-1.5">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{labels.seasonPeriod}</dt>
                <dd>{season.seasonLabel}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-ink">{labels.dataLevel}</dt>
                <dd>{labels.confidence[season.confidence]}</dd>
              </div>
            </dl>
            <div className="mt-2 flex flex-wrap gap-2">
              {season.sourceIds.slice(0, 4).map((sourceId) => {
                const source = dataSources[sourceId as keyof typeof dataSources];
                return (
                  <a
                    aria-label={source?.label ?? labels.sourceShort}
                    className="rounded-lg bg-white/80 px-2 py-1 font-semibold text-sage-700 transition hover:text-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-sage-100"
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
