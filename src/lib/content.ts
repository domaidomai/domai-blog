type EntryData = {
  title: string;
  pubDate: Date;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
};

export type ContentEntryLike<TData extends EntryData = EntryData> = {
  id: string;
  data: TData;
};

export type ArchiveGroup<TEntry extends ContentEntryLike = ContentEntryLike> = {
  key: string;
  label: string;
  entries: TEntry[];
};

const compareEntriesByDateDesc = <TEntry extends ContentEntryLike>(
  left: TEntry,
  right: TEntry,
) => right.data.pubDate.getTime() - left.data.pubDate.getTime();

export const getPublishedEntries = <TEntry extends ContentEntryLike>(
  entries: TEntry[],
) => entries.filter((entry) => !entry.data.draft).sort(compareEntriesByDateDesc);

export const getFeaturedEntries = <TEntry extends ContentEntryLike>(
  entries: TEntry[],
  limit = 3,
) =>
  getPublishedEntries(entries)
    .filter((entry) => entry.data.featured)
    .slice(0, limit);

export const collectTagCounts = <TEntry extends ContentEntryLike>(entries: TEntry[]) => {
  const counts = new Map<string, number>();

  for (const entry of getPublishedEntries(entries)) {
    for (const tag of entry.data.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((left, right) => right.count - left.count || left.tag.localeCompare(right.tag));
};

export const buildArchiveGroups = <TEntry extends ContentEntryLike>(
  entries: TEntry[],
): ArchiveGroup<TEntry>[] => {
  const archiveMap = new Map<string, ArchiveGroup<TEntry>>();

  for (const entry of getPublishedEntries(entries)) {
    const year = entry.data.pubDate.getFullYear();
    const month = entry.data.pubDate.getMonth() + 1;
    const key = `${year}-${String(month).padStart(2, "0")}`;

    if (!archiveMap.has(key)) {
      archiveMap.set(key, {
        key,
        label: `${year}年${month}月`,
        entries: [],
      });
    }

    archiveMap.get(key)?.entries.push(entry);
  }

  return [...archiveMap.values()].sort((left, right) => right.key.localeCompare(left.key));
};

export const getAdjacentEntries = <TEntry extends ContentEntryLike>(
  entries: TEntry[],
  currentId: string,
) => {
  const publishedEntries = getPublishedEntries(entries);
  const currentIndex = publishedEntries.findIndex((entry) => entry.id === currentId);

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: publishedEntries[currentIndex - 1] ?? null,
    next: publishedEntries[currentIndex + 1] ?? null,
  };
};

