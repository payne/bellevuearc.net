module.exports = function(eleventyConfig) {
  // Date filter for blog posts
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // RFC-822 date filter for RSS feeds
  eleventyConfig.addFilter("rssDate", (dateObj) => {
    return new Date(dateObj).toUTCString();
  });

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
