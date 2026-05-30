import type { SeasonItem, SeasonStatus } from "../types";
import emptyStateIcon from "../assets/icons/empty-state.svg";
import { SeasonItemRow } from "./SeasonItemRow";

type SectionItem = {
  item: SeasonItem;
  status: SeasonStatus;
};

type SeasonSectionProps = {
  title: string;
  items: SectionItem[];
};

export function SeasonSection({ title, items }: SeasonSectionProps) {
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
          {items.map(({ item, status }) => (
            <SeasonItemRow item={item} key={item.id} status={status} />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <img src={emptyStateIcon} alt="" className="h-16 w-16" />
          <p>Aucun résultat</p>
        </div>
      )}
    </section>
  );
}
