/* eslint-disable */
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = () => {
  return merge([
    base(),
    {
      optimization: {
        usedExports: true,
        splitChunks: {
          chunks: 'all',
        },
        minimizer: [new TerserPlugin({})],
      },
    },
  ]);
};
