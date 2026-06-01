import type { ElementType, SVGProps } from "react";
import { Carrot, Cherry } from "lucide-react";

type FeaturedCategory = "fruit" | "vegetable" | "mushroom";

type CategoryFeatureCardProps = {
  accentClass: string;
  category: FeaturedCategory;
  count: number;
  countLabel: string;
  image: string;
  isSelected: boolean;
  label: string;
  onSelect: () => void;
};

type CategoryIconConfig = {
  Icon: ElementType<SVGProps<SVGSVGElement>>;
  name: string;
};

function MushroomCategoryIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M4 11.4C4 7.3 7.6 4 12 4s8 3.3 8 7.4c0 1.6-1 2.7-2.5 2.7h-2.7l.6 4.1c.1.9-.6 1.8-1.5 1.8h-3.8c-.9 0-1.6-.9-1.5-1.8l.6-4.1H6.5C5 14.1 4 13 4 11.4Z" />
      <path d="M8.5 14.1h7" />
      <path d="M8.6 9.4h.01" />
      <path d="M12 7.8h.01" />
      <path d="M15.4 9.4h.01" />
    </svg>
  );
}

const categoryIcons: Record<FeaturedCategory, CategoryIconConfig> = {
  fruit: {
    Icon: Cherry,
    name: "cherry",
  },
  vegetable: {
    Icon: Carrot,
    name: "carrot",
  },
  mushroom: {
    Icon: MushroomCategoryIcon,
    name: "mushroom",
  },
};

export function CategoryFeatureCard({
  accentClass,
  category,
  count,
  countLabel,
  image,
  isSelected,
  label,
  onSelect,
}: CategoryFeatureCardProps) {
  const { Icon, name } = categoryIcons[category];

  return (
    <button
      aria-label={`Carte ${label}`}
      aria-pressed={isSelected}
      className={`category-card ${accentClass} ${
        isSelected ? "category-card-active" : ""
      }`}
      type="button"
      onClick={onSelect}
    >
      <span className="category-card-copy" data-category-card-copy>
        <span className="category-card-title">{label}</span>
        <span className="category-card-count">
          {count} {countLabel}
        </span>
      </span>
      <Icon
        aria-hidden="true"
        className="category-card-mark"
        data-category-card-icon={name}
      />
      <img src={image} alt="" className="category-card-icon" />
    </button>
  );
}
