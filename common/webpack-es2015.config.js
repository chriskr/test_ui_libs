const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://www.npmjs.com/package/copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const libData = require('./lib_data.js').default;

module.exports = {
  entry: ['./src/common/polyfills.js', './src/main.js'],
  output:
      {filename: 'bundle-es2015.js', path: path.resolve(__dirname, 'build')},
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      options: {compact: false}
    }]
  },
  plugins: [
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index-es2015.html',
      template: path.resolve(__dirname, 'src/common/index-es2015.html'),
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
