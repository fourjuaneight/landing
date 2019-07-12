const markdownIt = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true
}).use(require('markdown-it-footnote'));

const markdown = value => markdownIt.render(value);

module.exports = markdown;