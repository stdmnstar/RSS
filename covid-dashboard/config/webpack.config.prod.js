const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require('zlib');

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: `${baseWebpackConfig.externals.paths.assets}js/[name].[contenthash].js`,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].[contenthash].css`,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(prodWebpackConfig);
});
