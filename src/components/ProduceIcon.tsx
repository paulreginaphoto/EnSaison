import type { SeasonCategory } from "../types";

type ProduceIconProps = {
  icon: string;
  category: SeasonCategory;
};

export function ProduceIcon({ icon, category }: ProduceIconProps) {
  const palette = {
    fruit: {
      bg: "#f5ded1",
      body: "#c46f5f",
      accent: "#7f9b77",
      detail: "#f0b66f",
    },
    vegetable: {
      bg: "#dce9d7",
      body: "#7f9b77",
      accent: "#526b4f",
      detail: "#f0c46d",
    },
    mushroom: {
      bg: "#efe0cc",
      body: "#b98565",
      accent: "#6f5d4d",
      detail: "#fbf7ee",
    },
  }[category];

  if (category === "mushroom") {
    const isTall = icon.includes("morel") || icon.includes("trumpet");

    return (
      <svg className="produce-icon" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="23" fill={palette.bg} />
        <path
          d={isTall ? "M18 34c1-9 2-17 6-24 4 7 6 15 6 24 0 5-12 5-12 0Z" : "M13 24c1-8 8-13 17-11 7 1 11 6 10 12-6 4-20 5-27-1Z"}
          fill={palette.body}
        />
        <path
          d={isTall ? "M19 36h10c2 0 3 2 2 4H17c-1-2 0-4 2-4Z" : "M22 25h10l2 15H19l3-15Z"}
          fill={palette.detail}
        />
        <path
          d={isTall ? "M22 17l5 5m-7 3 7-5m-6 12 8-7" : "M18 22c4 2 12 3 18 0"}
          fill="none"
          stroke={palette.accent}
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    );
  }

  if (category === "vegetable") {
    const isLeaf = icon.includes("leaf") || icon.includes("cabbage") || icon.includes("broccoli");
    const isStem = icon.includes("stem") || icon.includes("bean") || icon.includes("cucumber");

    return (
      <svg className="produce-icon" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="23" fill={palette.bg} />
        {isLeaf ? (
          <>
            <path d="M13 27c2-10 12-16 23-14 1 12-6 21-17 21-4 0-6-2-6-7Z" fill={palette.body} />
            <path d="M18 30c5-5 9-9 17-14" fill="none" stroke={palette.accent} strokeLinecap="round" strokeWidth="2.2" />
          </>
        ) : isStem ? (
          <>
            <path d="M16 32c7-8 12-14 19-20 2 1 3 3 2 5-5 7-11 13-19 20-3-1-4-3-2-5Z" fill={palette.body} />
            <path d="M17 17c4 0 7 2 8 6-5 0-8-2-8-6Z" fill={palette.detail} />
          </>
        ) : (
          <>
            <path d="M17 18c7-5 17-2 18 7 1 8-5 13-12 13-8 0-13-6-11-13 1-3 2-5 5-7Z" fill={palette.body} />
            <path d="M19 15c2-4 5-6 10-6 0 6-3 9-10 9Z" fill={palette.accent} />
          </>
        )}
      </svg>
    );
  }

  const isBerry = icon.includes("berry") || icon.includes("grape");

  return (
    <svg className="produce-icon" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill={palette.bg} />
      {isBerry ? (
        <>
          {[20, 27, 17, 29, 23].map((cx, index) => (
            <circle
              cx={cx}
              cy={[18, 19, 26, 28, 32][index]}
              fill={palette.body}
              key={cx}
              r="5.5"
            />
          ))}
          <path d="M24 14c1-4 4-6 8-6 0 5-3 8-8 8Z" fill={palette.accent} />
        </>
      ) : (
        <>
          <path d="M15 25c0-9 7-14 14-12 7 2 10 8 8 15-2 8-9 13-16 10-4-2-6-6-6-13Z" fill={palette.body} />
          <path d="M22 14c1-5 4-7 9-7 0 5-3 8-9 9Z" fill={palette.accent} />
          <circle cx="29" cy="24" r="4" fill={palette.detail} opacity="0.7" />
        </>
      )}
    </svg>
  );
}
