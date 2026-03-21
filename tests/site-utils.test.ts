import { describe, expect, it } from "vitest";
import { normalizeBasePath, resolveContentImage, withBasePath } from "../src/lib/site";

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

  it("falls back to the default cover image when no image is provided", () => {
    expect(resolveContentImage(undefined, "/blog/")).toBe("/blog/default-cover.svg");
  });

  it("keeps remote cover images unchanged", () => {
    expect(resolveContentImage("https://example.com/cover.png", "/blog/")).toBe("https://example.com/cover.png");
  });
});
