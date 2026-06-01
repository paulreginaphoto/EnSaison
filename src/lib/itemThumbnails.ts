const itemThumbnailModules = import.meta.glob<string>(
  "../assets/produce/items/*.webp",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const itemThumbnails: Record<string, string> = Object.fromEntries(
  Object.entries(itemThumbnailModules).map(([path, src]) => [
    decodeURIComponent(path.split("/").pop()?.replace(/\.webp$/, "") ?? ""),
    src,
  ]),
);

export const getItemThumbnail = (itemId: string) => itemThumbnails[itemId];
