const legend = [
  { label: "De saison", className: "badge-in-season" },
  { label: "Bientôt", className: "badge-soon" },
  { label: "Hors saison", className: "badge-out" },
];

export function SeasonLegend() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Légende de saison">
      {legend.map((entry) => (
        <span key={entry.label} className={`season-badge ${entry.className}`}>
          {entry.label}
        </span>
      ))}
    </div>
  );
}
