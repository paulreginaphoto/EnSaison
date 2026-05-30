import type { CategoryFilter } from "../types";

type CategoryTabsProps = {
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
};

const categories: { value: CategoryFilter; label: string }[] = [
  { value: "fruit", label: "Fruits" },
  { value: "vegetable", label: "Légumes" },
  { value: "mushroom", label: "Champignons" },
  { value: "all", label: "Tous" },
];

export function CategoryTabs({
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.value;

        return (
          <button
            className={`category-tab ${isSelected ? "category-tab-active" : ""}`}
            key={category.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
