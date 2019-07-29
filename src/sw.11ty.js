const babel = require('@babel/core');
const Terser = require('terser');

// file paths
const inputFile = 'assets/js/sw.js';
const outputFile = 'sw.js';

module.exports = class {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      layout: false,
      permalink: outputFile,
    };
  }

  async render() {
    const compiled = await babel
      .transformFileAsync(inputFile)
      .then(result => result.code);

    const minified = await Terser.minify(compiled);

    return minified.code;
  }
};
