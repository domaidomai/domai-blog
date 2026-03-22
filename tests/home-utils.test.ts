import { describe, expect, it } from "vitest";
import { buildHomeProfileStats } from "../src/lib/home";

describe("home helpers", () => {
  it("builds Chinese profile stats for the homepage showcase card", () => {
    const stats = buildHomeProfileStats({ postCount: 12, projectCount: 3 });

    expect(stats).toEqual([
      { label: "文章数", value: "12" },
      { label: "项目数", value: "3" },
    ]);
  });

  it("formats larger counts with locale separators", () => {
    const stats = buildHomeProfileStats({ postCount: 1280, projectCount: 24 });

    expect(stats[0]?.value).toBe("1,280");
    expect(stats[1]?.value).toBe("24");
  });
});
