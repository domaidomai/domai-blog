import { describe, expect, it } from "vitest";
import { hasMermaidDiagram } from "../src/lib/mermaid";

describe("mermaid helpers", () => {
  it("detects fenced mermaid blocks in markdown content", () => {
    const markdown = `
## 流程图

\`\`\`mermaid
flowchart TD
  A[Start] --> B[End]
\`\`\`
`;

    expect(hasMermaidDiagram(markdown)).toBe(true);
  });

  it("ignores regular fenced code blocks", () => {
    const markdown = `
\`\`\`ts
console.log("hello");
\`\`\`
`;

    expect(hasMermaidDiagram(markdown)).toBe(false);
  });

  it("supports mermaid fences with leading spaces", () => {
    const markdown = `
  \`\`\`mermaid
  graph LR
    A --> B
  \`\`\`
`;

    expect(hasMermaidDiagram(markdown)).toBe(true);
  });
});
