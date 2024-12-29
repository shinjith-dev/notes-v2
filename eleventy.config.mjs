import 'dotenv/config'

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("bundle.js");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({ admin: process.env.ADMIN_PATH });

  // eleventyConfig.addCollection("recentlyModified", function(collectionApi) {
  //   return collectionApi.getAll()
  //     .filter(item => item.inputPath.endsWith(".html")) // Ensure it's a content file
  //     .map(item => {
  //       // Retrieve the file's modification date
  //       const stats = fs.statSync(item.inputPath);
  //       return {
  //         url: item.url,
  //         title: item.data.title || "Untitled", // Fallback title if not defined
  //         modifiedDate: stats.mtime // Add modification date
  //       };
  //     })
  //     .sort((a, b) => b.modifiedDate - a.modifiedDate) // Sort descending by modification date
  //     .slice(0, 10); // Limit to 10 entries
  // });
};

