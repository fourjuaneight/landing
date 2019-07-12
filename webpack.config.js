// Learn more about Webpack:
// https://webpack.js.org/

'use strict';

const { resolve } = require('path'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      TerserPlugin = require('terser-webpack-plugin'),
      ImageminPlugin = require('imagemin-webpack-plugin'),
      imageminMozjpeg = require('imagemin-mozjpeg'),
      imageminPngquant = require('imagemin-pngquant'),
      imageminWebp = require('imagemin-webp'),
      { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    './src/static/js/clip.js',
    './src/static/js/theme.js',
    './src/static/js/noise.js',
    './src/static/css/reset.scss',
    './src/static/css/main.scss',
  ],
  output: {
    path: resolve(__dirname, 'static'),
    filename: 'scripts.js'
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
              name: '../styles.css',
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader',
            options: {url: false}
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./src/static/css']
            }
          },
        ]
      }
    ]
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
    aggregateTimeout: 500
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, 'assets', 'img'),
        to: resolve(__dirname, 'assets', 'img'),
        ignore: ['*.svg']
      }
    ]),
    new ImageminPlugin({
      plugins: [
        imageminWebp({
          test: /\.(jpe?g)$/,
          quality: 90,
        }),
        imageminMozjpeg({
          test: /\.(jpe?g)$/,
          quality: 90,
          progressive: true
        }),
        imageminPngquant({
          test: /\.(png)$/,
          quality: [0.3, 0.5]
        })
      ]
    }),
    new GenerateSW({
      cacheId: '',
      clientsClaim: true,
      globDirectory: '.',
      globPatterns: ['**/*.{woff,png,jpg,svg,js,css}'],
      precacheManifestFilename: resolve(__dirname, 'assets', 'manifest.json'),
      skipWaiting: true,
      swDest: resolve(__dirname, 'assets', 'sw.js'),
      runtimeCaching: [
        {
          urlPattern: /img/,
          handler: 'cacheFirst',
          expiration: {
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
        {
          urlPattern: /.*/,
          handler: 'networkFirst'
        }
      ]
    })
  ]
}