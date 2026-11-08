import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE ?? "https://waterlili.eu";
const base = process.env.BASE_PATH ?? "/";

function openMarkdownLinksInNewTab() {
  return (tree) => {
    const visit = (node) => {
      if (node?.type === "element" && node.tagName === "a") {
        node.properties = {
          ...node.properties,
          target: "_blank",
          rel: "noopener noreferrer",
        };
      }

      if (Array.isArray(node?.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}

export default defineConfig({
  site,
  base,
  output: "static",
  // Old per-location workshop pages now live on the single workshops page.
  redirects: {
    "/ericeira": "/workshops/",
    "/santa-cruz": "/workshops/",
    "/fr/ericeira": "/fr/ateliers/",
    "/fr/santa-cruz": "/fr/ateliers/",
    "/pt/ericeira": "/pt/workshops/",
    "/pt/santa-cruz": "/pt/workshops/",
  },
  integrations: [sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [openMarkdownLinksInNewTab],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
