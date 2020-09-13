/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const dotenv = require('dotenv');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: env.PLATFORM,
    entry: APP_DIR,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            env.PLATFORM === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                modules: true,
                sourceMap: true,
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
            {
              loader: 'url-loader',
              options: {
                limit: 5000,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/html/index.html',
        filename: './index.html',
      }),
      new webpack.DefinePlugin(envKeys),
      new Visualizer({ filename: './visualizer.html' }),
    ],
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.bundle.js',
      path: path.resolve(__dirname, '..', 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.jsx', '.js'],
    },
    devServer: {
      contentBase: path.resolve(__dirname, './dist/'),
      compress: true,
      port: 9000,
    },
  };
};
