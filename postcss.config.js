// Learn more about PostCSS:
// https://github.com/postcss/postcss

module.exports = () => {
  return {
    plugins: {
      'postcss-preset-env': {
        stage: 3,
        autoprefixer: {
          flexbox: true,
          grid: 'autoplace'
        },
        browsers: [
          '> 5%',
          'IE 11'
        ]
      }
    }
  };
};
