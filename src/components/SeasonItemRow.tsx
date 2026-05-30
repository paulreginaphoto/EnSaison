import { categoryLabels, getStatusLabel } from "../lib/season";
import type { SeasonItem, SeasonStatus } from "../types";
import { ProduceIcon } from "./ProduceIcon";

type SeasonItemRowProps = {
  item: SeasonItem;
  status: SeasonStatus;
};

const statusClasses: Record<SeasonStatus, string> = {
  "in-season": "badge-in-season",
  soon: "badge-soon",
  out: "badge-out",
};

export function SeasonItemRow({ item, status }: SeasonItemRowProps) {
  return (
    <li className="item-row">
      <ProduceIcon category={item.category} icon={item.icon} />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-ink">
              {item.name}
            </p>
            <p className="text-sm font-medium text-ink/55">
              {categoryLabels[item.category]}
            </p>
          </div>
          <span className={`season-badge shrink-0 ${statusClasses[status]}`}>
            {getStatusLabel(status)}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-ink/50">
          {item.seasonLabel}
        </p>
      </div>
    </li>
  );
}
