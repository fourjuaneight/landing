// Learn more about Babel:
// https://babeljs.io/

module.exports = api => {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    'macros',
  ];
  const presets = [
    'babel-preset-gatsby',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        include: ['transform-arrow-functions'],
      },
    ],
  ];

  api.cache(false);

  return {
    plugins,
    presets,
  };
};
