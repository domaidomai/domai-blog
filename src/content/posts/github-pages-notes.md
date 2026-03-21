---
title: GitHub Pages 静态部署的几个关键细节
description: 让 Astro 站点在 GitHub Pages 上稳定运行时，最容易漏掉的是 base 路径和搜索静态资源。
pubDate: 2026-02-25
tags:
  - 示例
featured: true
heroImage: /default-cover.svg
---

静态博客上线到 GitHub Pages 其实不复杂，但有几个细节非常容易被忽略。

## base 不是可选项

如果你的仓库名不是 `<username>.github.io`，那么最终站点会挂在一个子路径下，这时候内部链接、RSS、搜索资源路径都要考虑 `base`。

## 搜索资源也在子路径下面

Pagefind 会把自己的资源输出到构建目录，如果页面引用还是写死 `/pagefind/...`，在仓库子路径下就会直接找不到。

## 自动部署最好交给 Actions

GitHub 官方的 Pages Actions 流程已经很成熟了。对 Astro 来说，最省事的方式就是：

- push 到主分支
- 自动 build
- 自动部署 Pages

把这些动作标准化之后，博客的维护成本基本就只剩下写内容本身。
