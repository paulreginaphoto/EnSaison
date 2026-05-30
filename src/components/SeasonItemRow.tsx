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
  return (
    <li className="item-row">
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
          <span>
            · {labels.sourceShort}:{" "}
            {season.sourceIds.slice(0, 2).map((sourceId, index) => {
              const source = dataSources[sourceId as keyof typeof dataSources];
              return (
                <span key={sourceId}>
                  <a
                    className="text-sage-700"
                    href={source?.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {index + 1}
                  </a>
                  {index < Math.min(season.sourceIds.length, 2) - 1 ? ", " : ""}
                </span>
              );
            })}
          </span>
        </p>
      </div>
    </li>
  );
}
