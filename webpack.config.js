/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log("\n", "\x1b[1m", "\x1b[31m");
console.log("-----------------------------------------------------------");
console.log("-------------------- VISERION IS RISING! ---------------------");
console.log("--------------------------- V 1.0 ----------------------------");
console.log("-----------------------------------------------------------",);
console.log("\n");

console.log("                                     __");
console.log("                     _____/-----\\   / o\\");
console.log("                    <____   _____\\_/    >");
console.log("                         \\ /    /______/");
console.log("                          /|:||/");
console.log("                         /____/");

console.log("\n", "\x1b[0m", "\x1b[21m");


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
          presets: ["react", "env"],
          plugins: ["syntax-dynamic-import", "transform-class-properties"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
