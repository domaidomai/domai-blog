import { describe, expect, it } from "vitest";
import {
  buildArchiveGroups,
  collectTagCounts,
  getAdjacentEntries,
  getFeaturedEntries,
  getPublishedEntries,
} from "../src/lib/content";

const posts = [
  {
    id: "alpha",
    data: {
      title: "Alpha",
      pubDate: new Date("2026-03-12"),
      tags: ["astro", "blog"],
      featured: true,
      draft: false,
    },
  },
  {
    id: "beta",
    data: {
      title: "Beta",
      pubDate: new Date("2026-02-10"),
      tags: ["astro"],
      featured: false,
      draft: true,
    },
  },
  {
    id: "gamma",
    data: {
      title: "Gamma",
      pubDate: new Date("2026-01-05"),
      tags: ["css", "blog"],
      featured: true,
      draft: false,
    },
  },
];

const projects = [
  {
    id: "delta",
    data: {
      title: "Delta",
      pubDate: new Date("2026-03-01"),
      tags: ["astro", "design"],
      featured: true,
      draft: false,
    },
  },
];

describe("content helpers", () => {
  it("filters drafts and sorts published entries by descending publication date", () => {
    const published = getPublishedEntries(posts);

    expect(published.map((entry) => entry.id)).toEqual(["alpha", "gamma"]);
  });

  it("returns featured published entries limited by count", () => {
    const featured = getFeaturedEntries(posts, 1);

    expect(featured).toHaveLength(1);
    expect(featured[0]?.id).toBe("alpha");
  });

  it("builds archive groups with newest month first", () => {
    const groups = buildArchiveGroups(posts);

    expect(groups.map((group) => group.label)).toEqual(["2026年3月", "2026年1月"]);
    expect(groups[0]?.entries.map((entry) => entry.id)).toEqual(["alpha"]);
  });

  it("collects tag counts across posts and projects", () => {
    const tags = collectTagCounts([...posts, ...projects]);

    expect(tags).toEqual([
      { tag: "astro", count: 2 },
      { tag: "blog", count: 2 },
      { tag: "css", count: 1 },
      { tag: "design", count: 1 },
    ]);
  });

  it("returns previous and next entries relative to a post within the published order", () => {
    const adjacent = getAdjacentEntries(posts, "gamma");

    expect(adjacent.previous?.id).toBe("alpha");
    expect(adjacent.next).toBeNull();
  });
});

