const React = require('react');
const globby = require('globby').sync;

const publicFolder = './public';

const scripts = {
  fonts: [],
  preload: [],
  workers: [],
};

exports.onRenderBody = ({ pathPrefix = '', setHeadComponents }) => {
  const fonts = globby(`${publicFolder}/fonts/*-sub.{woff2|woff}`);
  const workers = globby(`${publicFolder}/*.worker.js`);

  if (fonts.length !== 0) {
    scripts.fonts = fonts.map((file, key) => (
      <link
        key={key}
        rel="preload"
        as="font"
        type={`font/${file.match(/woff2|woff/g)}`}
        crossOrigin="anonymous"
        href={file.replace(publicFolder, pathPrefix)}
      />
    ));
  }

  if (workers.length !== 0) {
    scripts.workers = workers.map((file, key) => (
      <link
        key={key}
        rel="preload"
        as="worker"
        crossOrigin="anonymous"
        href={file.replace(publicFolder, pathPrefix)}
      />
    ));
  }

  scripts.preload = [...scripts.fonts, ...scripts.workers];

  setHeadComponents(scripts.preload);
};
