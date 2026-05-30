import type { SeasonStatus } from "../types";

const legend: { status: SeasonStatus; className: string }[] = [
  { status: "in-season", className: "badge-in-season" },
  { status: "soon", className: "badge-soon" },
  { status: "out", className: "badge-out" },
  { status: "variable", className: "badge-variable" },
];

type SeasonLegendProps = {
  labels: Record<SeasonStatus, string>;
};

export function SeasonLegend({ labels }: SeasonLegendProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Légende de saison">
      {legend.map((entry) => (
        <span key={entry.status} className={`season-badge ${entry.className}`}>
          {labels[entry.status]}
        </span>
      ))}
    </div>
  );
}
