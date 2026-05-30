import type { CategoryFilter } from "../types";

type CategoryTabsProps = {
  selectedCategory: CategoryFilter;
  labels: Record<CategoryFilter, string>;
  onCategoryChange: (category: CategoryFilter) => void;
};

const categories: CategoryFilter[] = [
  "all",
  "fruit",
  "vegetable",
  "mushroom",
  "herb",
  "legume",
  "grain",
  "nut",
  "seed",
  "spice",
];

export function CategoryTabs({
  selectedCategory,
  labels,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            className={`category-tab ${isSelected ? "category-tab-active" : ""}`}
            key={category}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onCategoryChange(category)}
          >
            {labels[category]}
          </button>
        );
      })}
    </div>
  );
}
