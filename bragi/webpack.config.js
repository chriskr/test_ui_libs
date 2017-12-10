const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: { filename: "bundle.js", path: path.resolve(__dirname, "build") },
  module: {
    rules: []
  },
  plugins: [new UglifyJsPlugin()]
};
