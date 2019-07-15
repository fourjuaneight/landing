const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    './src/assets/js/clip.js',
    './src/assets/js/theme.js',
    './src/assets/js/noise.js',
    './src/assets/scss/critical.scss',
    './src/assets/scss/layout.scss',
    './src/assets/scss/syntax.scss',
  ],
  output: {
    path: resolve(__dirname, 'src'),
    filename: 'js/scripts.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /critical.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '_includes/components/critical.css',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./src/assets/scss'],
            },
          },
        ],
      },
      {
        test: /layout.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/styles.css',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./src/assets/scss'],
            },
          },
        ],
      },
      {
        test: /syntax.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/syntax.css',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./src/assets/scss'],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
  },
};
