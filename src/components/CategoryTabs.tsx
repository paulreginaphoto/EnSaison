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
  "protein",
  "sea",
  "pantry",
];

export function CategoryTabs({
  selectedCategory,
  labels,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" aria-label="Catégories">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            className={`category-tab ${isSelected ? "category-tab-active" : ""}`}
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
