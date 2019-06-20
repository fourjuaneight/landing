// Learn more about Gulp:
// https://gulpjs.com/

// Load Plugins
const { src, dest, task, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const purgecss = require('gulp-purgecss');
const replace = require('gulp-replace');

/*
HTML Cleanup:
- Removed HTML comments.
- Removed extra <p> tags.
*/
const fix = () => {
  return src(['public/**/*.html'])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      replace(
        /<p><(p|a|div|section|h1|h2|h3|h4|ul|li|img|figure|picture)(.*?)>/g,
        '<$1$2>'
      )
    )
    .pipe(
      replace(
        /<\/(p|a|div|section|h1|h2|h3|h4|ul|li|img|figure|picture)(.*?)><\/p>/g,
        '</$1$2>'
      )
    )
    .pipe(replace(/<p><\/p>/g, ''))
    .pipe(dest('public'));
};

// Remove unused CSS
const purge = () => {
  return src(['public/css/*.css'])
    .pipe(
      purgecss({
        content: ['public/**/*.html'],
      })
    )
    .pipe(dest('public/css'));
};

// Tasks
task('fix', fix);
task('purge', purge);

// Build
task('post', series(fix, purge));
