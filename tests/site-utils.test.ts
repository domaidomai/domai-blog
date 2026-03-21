import { describe, expect, it } from "vitest";
import { normalizeBasePath, withBasePath } from "../src/lib/site";

describe("site path helpers", () => {
  it("normalizes an empty base path to root", () => {
    expect(normalizeBasePath("")).toBe("/");
  });

  it("removes a trailing slash for nested GitHub Pages deployments", () => {
    expect(normalizeBasePath("/blog/")).toBe("/blog");
  });

  it("prefixes paths with the normalized base path", () => {
    expect(withBasePath("/search", "/blog/")).toBe("/blog/search");
  });
});
