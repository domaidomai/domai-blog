export type Language = "zh-CN" | "en";
export const getLanguage = (value: string | null): Language => value === "en" ? "en" : "zh-CN";

const english: Record<string, string> = {
  "首页": "Home", "文章": "Articles", "项目": "Projects", "标签": "Tags", "归档": "Archive", "关于": "About", "搜索": "Search",
  "主导航": "Main navigation", "深浅切换": "Light / Dark", "切换深色模式": "Toggle light and dark mode",
  "domai 的博客 | 栈边风景": "domai's Blog | Views from the Stack",
  "用技术折腾点有意思的东西": "Building interesting things with technology",
  "中文技术博客": "A developer's notebook", "记录学习，动手做点东西。": "Keep learning. Keep building.",
  "一个记录 Java、AI 全栈和 Agent 学习过程的静态博客，写工程实践，也写一些带未来感的脑洞实验。": "Notes on Java, AI development, and agents, with hands-on projects and a few experiments along the way.",
  "进入文章": "Read articles", "查看项目": "Explore projects", "站内搜索": "Search this site",
  "精选项目": "Featured projects", "首页精选": "Featured", "更多项目": "More projects", "最新文章": "Latest articles", "全部文章": "All articles",
  "文章数": "Articles", "项目数": "Projects", "常写内容": "Topics", "Email": "Email",
  "系列 ·": "Series ·",
  "AI 全栈 · JAVA · 古法编程非遗继承": "AI development · Java · Still writing code by hand",
  "2038年，编程已死。人类不再手敲代码，只写Prompt。": "2038. Programming is dead. Humans no longer type code; they write prompts.",
  "AI 提效，原理深耕。AI 再厉害也取代不了人类，毕竟它写的 bug 都没我多。": "AI for speed, fundamentals for depth. AI still can't replace me: I write more bugs than it does.",
  "AI 全栈": "AI development", "Agent 学习": "Agent development", "工程实验": "Engineering experiments",
  "仓库": "Source", "演示": "Live demo", "查看仓库": "View source", "访问演示": "Try the demo", "项目概览": "Project overview",
  "我做的一些工具，附体验链接和开发记录。": "Tools I've built, with live demos and development notes.",
  "学习笔记、开发记录和问题复盘，按发布时间排列。": "Learning notes, development logs, and lessons learned, ordered by publication date.",
  "按月份查看文章和项目。": "Browse articles and projects by month.",
  "标签会同时覆盖文章和项目，让站点的信息结构更像一个持续生长的知识库。": "Browse articles and projects by topic.",
  "相关文章": "Related articles", "相关项目": "Related projects", "这个标签下暂时没有文章。": "No articles with this tag yet.", "这个标签下暂时没有项目。": "No projects with this tag yet.",
  "我是 domai，在这里记录 Java、AI 和 Agent 的学习过程，也分享自己做的小工具。": "I'm domai. I write about learning Java, AI, and agents, and share the tools I build.",
  "写什么": "What I write", "怎么写": "How I write", "正在做什么": "What I'm building",
  "Java、AI 应用、Agent，以及开发过程中遇到的问题和解决过程。": "Java, AI applications, agents, and the problems and solutions I find along the way.",
  "把学到的原理、动手做的过程和踩过的坑记下来，方便以后查阅。": "I document what I learn, how I build, and what goes wrong, so I can come back to it later.",
  "目前做了图片转拼豆图纸工具和自评测试网站，可以到项目页体验。": "I've built an image-to-bead-pattern tool and a self-assessment site. You can try them on the projects page.",
  "本页目录": "On this page", "评论": "Comments", "评论暂未开放。": "Comments are not available yet.",
  "更新的文章": "Newer article", "更早的文章": "Older article", "已经是最新一篇了": "You're reading the latest article", "这里就是第一篇": "You've reached the first article",
  "输入关键词，查找文章和项目。": "Enter a keyword to find articles and projects.", "正在加载搜索…": "Loading search…", "搜索暂时无法加载，请刷新页面重试。": "Search couldn't load. Please refresh and try again.",
  "页面走丢了": "Page not found", "你访问的地址不存在，可能是链接过期，也可能是我还没把这篇内容发布出来。": "This address doesn't exist. The link may be outdated, or the content hasn't been published yet.",
  "回到首页": "Back to home", "去看文章": "Browse articles",
};

export function translateUI(text: string, language: Language): string {
  if (language === "zh-CN") return text;
  const trimmed = text.trim();
  let translated = english[trimmed];
  if (!translated && /^这个标签下共收录\s*\d+\s*条内容。$/.test(trimmed)) translated = `${trimmed.match(/\d+/)![0]} items with this tag.`;
  if (!translated && trimmed.startsWith("系列 · ")) translated = `Series · ${trimmed.slice(5)}`;
  if (!translated && trimmed.startsWith("更新于 ")) translated = `Updated ${trimmed.slice(4)}`;
  if (!translated && /^\d{4}年\d{1,2}月$/.test(trimmed)) {
    const [year, month] = trimmed.match(/\d+/g)!;
    translated = new Intl.DateTimeFormat("en", { year: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${year}-${month.padStart(2, "0")}-01T00:00:00Z`));
  }
  if (!translated) {
    for (const [prefix, replacement] of [["查看文章：", "Read article: "], ["查看项目：", "View project: "], ["折叠 ", "Toggle subsections: "]] as const) {
      if (trimmed.startsWith(prefix)) translated = replacement + trimmed.slice(prefix.length).replace(/ 子目录$/, "");
    }
  }
  return translated ? text.replace(trimmed, translated) : text;
}

export function formatUIDate(value: string, language: Language): string {
  return new Intl.DateTimeFormat(language, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(value));
}
