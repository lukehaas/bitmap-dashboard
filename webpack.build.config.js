const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './client/src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        HOST: JSON.stringify(process.env.HOST),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.json'],
    modules: [path.resolve('client/src'), path.resolve('node_modules')],
  },
};
