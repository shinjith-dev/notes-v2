import 'dotenv/config'

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("bundle.js");
  eleventyConfig.addPassthroughCopy("assets");
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
};

