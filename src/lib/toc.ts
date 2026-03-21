export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface TocGroup {
  heading: TocHeading;
  children: TocHeading[];
}

export function filterTableOfContentsHeadings(headings: TocHeading[], maxDepth = 3) {
  return headings.filter((heading) => heading.depth <= maxDepth);
}

export function buildTableOfContentsGroups(headings: TocHeading[], maxDepth = 3) {
  const filteredHeadings = filterTableOfContentsHeadings(headings, maxDepth);

  if (filteredHeadings.length === 0) {
    return [];
  }

  const rootDepth = Math.min(...filteredHeadings.map((heading) => heading.depth));
  const groups: TocGroup[] = [];
  let currentGroup: TocGroup | null = null;

  for (const heading of filteredHeadings) {
    if (heading.depth === rootDepth || currentGroup === null) {
      currentGroup = {
        heading,
        children: [],
      };
      groups.push(currentGroup);
      continue;
    }

    currentGroup.children.push(heading);
  }

  return groups;
}
