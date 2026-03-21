export const siteConfig = {
  title: "domai 的博客 | 栈边风景",
  subtitle: "用技术折腾点有意思的东西",
  description:
    "一个用 Astro 与 Markdown 构建的静态技术博客，聚焦工程实践、界面设计和长期写作。",
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? "https://domaidomai.github.io",
  basePath: import.meta.env.BASE_URL ?? "/",
  nav: [
    { label: "首页", href: "/" },
    { label: "文章", href: "/posts/" },
    { label: "项目", href: "/projects/" },
    { label: "标签", href: "/tags/" },
    { label: "归档", href: "/archive/" },
    { label: "关于", href: "/about/" },
    { label: "搜索", href: "/search/" },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/domaidomai" },
    { label: "RSS", href: "/rss.xml" },
    { label: "Email", href: "mailto:1611997621@qq.com" },
  ],
  giscus: {
    repo: "domaidomai/domai-blog",
    repoId: "R_kgDORtESJQ",
    category: "General",
    categoryId: "DIC_kwDORtESJc4C49sM",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    lang: "zh-CN",
    lightTheme: "light",
    darkTheme: "dark",
  },
} as const;

