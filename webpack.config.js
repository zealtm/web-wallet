/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log('\n');
console.log('\x1b[1m', '\x1b[31m', '-----------------------------------------------------------');
console.log('-------------------- VISERION IS RISING! ---------------------');
console.log('--------------------------- V 1.0 ----------------------------');
console.log('-----------------------------------------------------------', '\x1b[0m', '\x1b[21m');
console.log('\n');


module.exports = {
  entry: "./src/index.jsx",
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: ["react", "es2015"],
          plugins: ["syntax-dynamic-import"]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: "bundle-[name].js",
    path: path.resolve(__dirname, "public", "scripts"),
    publicPath: "scripts/"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 6001
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
};
