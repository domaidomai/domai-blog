const MERMAID_FENCE_PATTERN = /(^|\n)\s*```mermaid[\t ]*(\r?\n|$)/i;

export function hasMermaidDiagram(markdown: string): boolean {
  return MERMAID_FENCE_PATTERN.test(markdown);
}
