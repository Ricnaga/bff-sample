const AutoReloadWebpackPlugin = require('auto-reload-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const defaultConfig = require('./webpack.config');

module.exports = (env) =>
  merge(defaultConfig(env.ENV_FILE), {
    mode: "development",
    stats: "normal",
    watch: true,
    watchOptions: {
      poll: 1000,
      ignored: path.join(process.cwd(), "node_modules"),
    },
    externals: [nodeExternals({ allowlist: ["webpack/hot/poll?1000"] })],
    plugins: [
      new AutoReloadWebpackPlugin({
        filePath: path.join(process.cwd(), "build", "index.bundle.js"),
      }),
    ],
  });
