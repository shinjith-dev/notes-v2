
export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("bundle.js");
  eleventyConfig.addPassthroughCopy("assets/fonts/Inter.ttf");
  eleventyConfig.addPassthroughCopy("assets/fonts/Inconsolata.ttf");
};

