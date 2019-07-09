// Learn more about Webpack:
// https://webpack.js.org/

'use strict';

const { resolve } = require('path'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      ImageminPlugin = require('imagemin-webpack-plugin'),
      imageminMozjpeg = require('imagemin-mozjpeg'),
      imageminPngquant = require('imagemin-pngquant'),
      imageminWebp = require('imagemin-webp'),
      { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    '',
  ],
  output: {
    path: resolve(__dirname, 'assets'),
    filename: 'scripts.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /styles.scss/,
        use: [
          'sass-loader',
          'postcss-loader',
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, 'assets', 'img'),
        to: resolve(__dirname, 'assets', 'img'),
        ignore: ['*.svg']
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
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