const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://www.npmjs.com/package/copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const libData = require('./lib_data.js').default;

module.exports = {
  entry: './src/main.js',
  output: {filename: 'bundle.js', path: path.resolve(__dirname, 'build')},
  module: {
    rules: [],
  },
  plugins: [
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/common/index.html'),
      options: {
        lib: libData.title,
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/common',
        to: 'common',
        ignore: [
          '*.js',
          '*.html',
          '*.tmpl',
        ],
      },
    ]),
  ]
};
