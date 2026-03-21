import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserSite = Boolean(repository && owner && repository === `${owner}.github.io`);

const site = process.env.PUBLIC_SITE_URL ?? (owner ? `https://${owner}.github.io` : "https://yourname.github.io");
const base = process.env.PUBLIC_BASE_PATH ?? (repository && !isUserSite ? `/${repository}` : "/");

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: "shiki",
  },
});
