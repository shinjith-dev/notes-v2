import 'dotenv/config'
import sitemap from "@quasibit/eleventy-plugin-sitemap"

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("bundle.js");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({ admin: process.env.ADMIN_PATH });

  eleventyConfig.addCollection("recentlyModified", (collectionApi) =>
    collectionApi.getAll()
      .filter(item => item.outputPath.endsWith(".html"))
      .map(item => {
        return {
          url: item.url,
          title: item.data.title || "Untitled",
          modifiedDate: item.date
        };
      })
      .sort((a, b) => b.modifiedDate - a.modifiedDate)
      .slice(0, 10)
  );

   eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://notes.shinjith.dev",
    },
  });
};

export const config = {
  markdownTemplateEngine: false
};
