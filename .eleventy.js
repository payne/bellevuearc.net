module.exports = function(eleventyConfig) {
  // Copy static files
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Add date filter
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    if (format === 'YYYY-MM-DD') {
      return d.toISOString().split('T')[0];
    } else if (format === 'MMMM DD, YYYY') {
      return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return d.toLocaleDateString();
  });
  
  // Create blog collection
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });
  
  // Set input and output directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};