# 栈边风景

一个基于 Astro、Markdown、Pagefind 和 GitHub Pages 的中文静态技术博客模板。

## 本地开发

```bash
npm install
npm run dev
```

## 构建与验证

```bash
npm test
npm run build
```

## 部署到 GitHub Pages

1. 在 GitHub 仓库里开启 Pages，并选择 `GitHub Actions` 作为 Source。
2. 如果仓库名不是 `<username>.github.io`，构建时会自动推导 `base`。
3. 如果你要手动覆盖地址，可以设置环境变量：
   - `PUBLIC_SITE_URL`
   - `PUBLIC_BASE_PATH`

## 内容维护

- 文章目录：`src/content/posts`
- 项目目录：`src/content/projects`
- 站点配置：`src/config/site.ts`

## 评论配置

把 `src/config/site.ts` 里的 Giscus 配置补齐后，文章页会自动出现评论区。
