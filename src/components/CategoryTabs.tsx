import type { CategoryGroup } from "../types";

type CategoryTabsProps = {
  selectedCategory: CategoryGroup;
  labels: Record<CategoryGroup, string>;
  onCategoryChange: (category: CategoryGroup) => void;
};

const categories: CategoryGroup[] = [
  "all",
  "fruit",
  "vegetable",
  "mushroom",
];

export function CategoryTabs({
  selectedCategory,
  labels,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="quick-chip-row" aria-label="Catégories">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            className={`quick-chip ${isSelected ? "quick-chip-active" : ""}`}
            key={category}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onCategoryChange(category)}
          >
            {labels[category]}
          </button>
        );
      })}
    </div>
  );
}
