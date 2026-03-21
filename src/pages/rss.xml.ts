import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";
import { getPublishedEntries } from "../lib/content";
import { withBasePath } from "../lib/site";

export async function GET(context: APIContext) {
  const basePath = import.meta.env.BASE_URL ?? "/";
  const posts = getPublishedEntries(await getCollection("posts"));

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: withBasePath(`/posts/${post.id}/`, basePath),
    })),
  });
}

