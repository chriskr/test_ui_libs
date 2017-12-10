const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: ["./src/common/polyfills.js", "./src/main.js"],
  output: {
    filename: "bundle-es2015.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          compact: false
        }
      }
    ]
  },
  plugins: [new UglifyJsPlugin()]
};
