// Learn more about Babel:
// https://babeljs.io/

module.exports = api => {
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
        },
      },
    ],
  ];

  api.cache(false);
  return {
    presets,
  };
};
