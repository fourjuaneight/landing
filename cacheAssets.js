#!/usr/bin/env node

const { join } = require('path');
const glob = require('glob');
const replace = require('replace-in-file');

const cwd = join(__dirname, 'public');

glob('**/*.{js,css,png,woff,woff2}', { cwd }, (err, files) => {
  if (err) {
    throw err;
  }

  const newFiles = files.map(toCache => `'/${toCache}'`).toString();

  const replaceOptions = {
    files: join(cwd, 'sw.js'),
    from: /(const)\s(staticAssets)\s=\s?\[\];/g,
    to: `const staticAssets = [${newFiles}];`,
  };

  try {
    replace(replaceOptions);
  } catch (error) {
    console.error('Error occurred:', error);
  }
});
