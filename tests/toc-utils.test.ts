import { describe, expect, it } from "vitest";
import { buildTableOfContentsGroups, filterTableOfContentsHeadings } from "../src/lib/toc";

describe("table of contents helpers", () => {
  it("keeps only headings up to depth 3 for the article directory", () => {
    const headings = [
      { depth: 1, slug: "intro", text: "介绍" },
      { depth: 2, slug: "setup", text: "准备" },
      { depth: 3, slug: "deploy", text: "部署" },
      { depth: 4, slug: "hidden", text: "不显示" },
    ];

    expect(filterTableOfContentsHeadings(headings)).toEqual([
      { depth: 1, slug: "intro", text: "介绍" },
      { depth: 2, slug: "setup", text: "准备" },
      { depth: 3, slug: "deploy", text: "部署" },
    ]);
  });

  it("groups headings by the first visible directory level for collapsible sections", () => {
    const headings = [
      { depth: 2, slug: "overview", text: "概览" },
      { depth: 3, slug: "overview-detail", text: "概览细节" },
      { depth: 3, slug: "overview-code", text: "概览代码" },
      { depth: 2, slug: "deploy", text: "部署" },
      { depth: 3, slug: "github-pages", text: "GitHub Pages" },
      { depth: 4, slug: "hidden", text: "不显示" },
    ];

    expect(buildTableOfContentsGroups(headings)).toEqual([
      {
        heading: { depth: 2, slug: "overview", text: "概览" },
        children: [
          { depth: 3, slug: "overview-detail", text: "概览细节" },
          { depth: 3, slug: "overview-code", text: "概览代码" },
        ],
      },
      {
        heading: { depth: 2, slug: "deploy", text: "部署" },
        children: [{ depth: 3, slug: "github-pages", text: "GitHub Pages" }],
      },
    ]);
  });
});
