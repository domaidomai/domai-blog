import { describe, expect, it } from "vitest";
import { getLanguage, translateUI, formatUIDate } from "../src/lib/locale";

describe("interface language", () => {
  it("falls back to Chinese for missing or unsupported preferences", () => {
    expect(getLanguage(null)).toBe("zh-CN");
    expect(getLanguage("fr")).toBe("zh-CN");
    expect(getLanguage("en")).toBe("en");
  });
  it("translates interface text without changing original content or whitespace", () => {
    expect(translateUI("\n  首页\n", "en")).toBe("\n  Home\n");
    expect(translateUI("模型调用与Prompt", "en")).toBe("模型调用与Prompt");
    expect(translateUI("首页", "zh-CN")).toBe("首页");
  });
  it("translates dynamic interface messages while preserving tag and series names", () => {
    expect(translateUI("这个标签下共收录 3 条内容。", "en")).toBe("3 items with this tag.");
    expect(translateUI("系列 · Agent学习", "en")).toBe("Series · Agent学习");
    expect(translateUI("折叠 工程实践 子目录", "en")).toBe("Toggle subsections: 工程实践");
  });
  it("formats dates consistently without a device timezone changing the date", () => {
    expect(formatUIDate("2026-10-26", "en")).toBe("October 26, 2026");
    expect(formatUIDate("2026-10-26", "zh-CN")).toBe("2026年10月26日");
  });
});
