---
title: Command Palette Search（示例示例
description: 一个为内容型站点设计的搜索入口，把 Pagefind 结果做成更像产品交互的体验。
pubDate: 2026-03-16
tags:
  - search
  - astro
  - design
featured: true
techStack:
  - Astro
  - Pagefind
  - TypeScript
repoUrl: https://github.com/yourname/command-palette-search
demoUrl: https://example.com/command-palette-search
heroImage: /og-default.svg
---

这个项目的目标不是“把搜索框放上去”，而是让搜索真正成为站点里的高频入口。

## 核心思路

静态站没有后端搜索服务，所以我把能力放在了 Pagefind 上，再通过前端界面调整结果展示方式。

## 为什么值得单独做成项目页

因为它同时涉及：

- 构建流程
- 资源路径
- 交互反馈
- 搜索结果密度

这类项目如果只在首页放一个链接，会很难体现它的价值。
