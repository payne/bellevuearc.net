module.exports = function(eleventyConfig) {
  // Copy CSS to output
  eleventyConfig.addPassthroughCopy("src/css");

  // Copy JavaScript to output
  eleventyConfig.addPassthroughCopy("src/js");

  // Copy data files to output
  eleventyConfig.addPassthroughCopy("src/_data");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};
