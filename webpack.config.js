const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    './src/js/clip.js',
    './src/js/theme.js',
    './src/js/noise.js',
    './src/css/main.scss',
  ],
  output: {
    path: resolve(__dirname),
    filename: './src/js/scripts.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './src/css/styles.css',
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
              includePaths: ['./src/static/css'],
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
