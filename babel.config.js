// Learn more about Babel:
// https://babeljs.io/
// Dependencies: npm i -D @babel/core @babel/preset-env @babel/register babel-cli browserlist

module.exports = api => {
  const presets = [
    [
      '@babel/preset-env',
      {
        'modules': false,
        'include': [
          'transform-arrow-functions',
        ],
      },
    ],
  ];

  api.cache(false);
  return {
    presets,
  };
};
