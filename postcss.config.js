// Learn more about PostCSS:
// https://github.com/postcss/postcss

module.exports = function(ctx = {}) {
  const { file } = ctx;
  const opts = ctx.options || {};
  const isProduction =
    opts.env === 'production' || process.env.NODE_ENV === 'production';

  return {
    parser: 'postcss-scss',
    plugins: {
      'autoprefixer': { browsers: ['> 5%'] },
      'cssnano': isProduction ? { autoprefixer: true } : false,
      'laggard': {},
      'postcss-browser-reporter': isProduction ? {} : false,
      'postcss-calc': {},
      'postcss-custom-properties': {},
      'postcss-import': {},
      'postcss-mixins': {},
      'postcss-nested': {},
      'postcss-reporter': {},
      'postcss-simple-vars': {}
    }
  };
};
