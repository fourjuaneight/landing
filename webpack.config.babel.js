// Learn more about Webpack:
// https://webpack.js.org/

import path from 'path';

export default {
  mode: process.env.NODE_ENV || 'production',
  entry: [
    "./assets/js/lazy.js",
    "./assets/js/smooth.js",
    "./assets/js/contact.js",
  ],
  output: {
    path: path.resolve(__dirname, "assets", "js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}