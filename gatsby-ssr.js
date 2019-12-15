const React = require('react');
const globby = require('globby').sync;

exports.onRenderBody = ({ pathPrefix = '', setHeadComponents }) => {
  const files = globby('./public/fonts/*-sub.{woff2|woff}');

  setHeadComponents(
    files.map((file, key) => (
      <link
        key={key}
        rel="preload"
        as="font"
        type={`font/${file.match(/woff2|woff/g)}`}
        crossOrigin="anonymous"
        href={file.replace('./public', pathPrefix)}
      />
    ))
  );
};
