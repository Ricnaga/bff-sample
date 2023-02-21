const Dotenv = require("dotenv-webpack");
const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const extensions = [".js", ".json", ".ts"];

module.exports = (envFile) => ({
  target: "node",
  entry: path.join(process.cwd(), "src", "index.ts"),
  output: {
    path: path.join(process.cwd(), "build"),
    filename: "index.bundle.js",
    clean: true,
  },
  resolve: {
    extensions,
    plugins: [
      new TsconfigPathsPlugin({
        extensions,
      }),
    ],
    alias: {
      "@/": path.join(process.cwd(), "src"),
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.join(process.cwd(), envFile),
      safe: true,
      allowEmptyValues: true,
      expand: true,
      systemvars: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
});
