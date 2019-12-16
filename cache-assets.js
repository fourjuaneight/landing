#!/usr/bin/env node

const { join } = require('path');
const glob = require('glob');
const replace = require('replace-in-file');

const cwd = join(__dirname, 'public');
const makeid = length => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

glob('**/*.{js,css,woff,woff2}', { cwd }, (err, files) => {
  if (err) {
    throw err;
  }

  const newFiles = files.map(toCache => `'/${toCache}'`).toString();

  const replaceOptions = {
    files: join(cwd, 'sw.js'),
    from: [/(const)\s(staticAssets)\s=\s?\[\];/g, /const\sversion\s=\s'';/g],
    to: [
      `const staticAssets = [${newFiles}];`,
      `const version = '${makeid(4)}';`,
    ],
  };

  try {
    replace(replaceOptions);
  } catch (error) {
    console.error('Error occurred:', error);
  }
});
