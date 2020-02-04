const React = require('react');
const globby = require('globby').sync;

/*
  Add preload links for subset font files.

  Context on font loading strategy:
  1. Preload subsets via link preloads. (THIS SETUP)
  2. CSS loads subset in critically inlined styles.
  3. FontFace API dynamically loads full Latin files.
*/
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const scripts = {
    files: [],
    workers: [],
  };
  // match subset fonts and web workers
  const fonts = globby('static', {
    expandDirectories: {
      files: ['*-sub'],
      extensions: ['woff2', 'woff'],
    },
  });
  const workers = globby('public/*.worker.js');
  // get existing head components
  const headComponents = getHeadComponents();

  // for each found file, generate a link preload component
  if (fonts.length !== 0) {
    scripts.files = fonts.map(file => (
      <link
        key={file}
        rel="preload"
        href={file.replace('static', '')}
        as="font"
        type={`font/${file.match(/woff2|woff/g)}`}
        crossOrigin="anonymous"
      />
    ));
  }
  if (workers.length !== 0) {
    scripts.workers = workers.map(file => (
      <link
        key={file}
        rel="preload"
        href={file.replace('public', '')}
        as="worker"
        crossOrigin="anonymous"
      />
    ));
  }

  // push links before existing head components
  replaceHeadComponents([...scripts.files, headComponents, ...scripts.workers]);
};
