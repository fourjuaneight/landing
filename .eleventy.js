// Import plugins
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Import configs
const markdown = require('./src/config/markdown.js');
const minifier = require('./src/config/minifier.js');
const tags = require('./src/config/tags.js');

const elConf = config => {
  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);
  // Configs
  config.addFilter('markdown', markdown);
  config.addFilter('minifier', minifier);
  // Passthrough
  config.addPassthroughCopy("src/css");
  config.addPassthroughCopy("src/fonts");
  config.addPassthroughCopy("src/icons");
  config.addPassthroughCopy("src/img");
  config.addPassthroughCopy("src/js");

  // Custom collections
  const now = new Date();
  const livePosts = post => post.date <= now && !post.data.draft;
  config.addCollection('posts', collection => {
    return [
      ...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)
    ].reverse();
  });
  config.addCollection('feed', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)]
      .reverse()
      .slice(0, 5);
  });
  config.addCollection('tags', tags);

  return {
    dir: {
      data: "_data",
      input: "src",
      output: 'dist',
      includes: "_includes",
    },
    passthroughFileCopy: true,
  };
}

module.exports = elConf;