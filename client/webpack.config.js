const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

module.exports = {
  mode: process.env.ENV !== "production" ? "development" : "production",
  entry: {
    app: "./src/index.js"
  },
  devtool:
    process.env.ENV !== "production" ? "inline-srouce-map" : "srouce-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: process.env.PORT || 4000,
    publicPath: `http://localhost:${process.env.PORT || 4000}`,
    historyApiFallback: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:7000",
        secure: false
      }
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "./public/assets", to: "assets" },
      { from: "./public/manifest.json", to: "manifest.json" },
      { from: "./public/fonts/*.png", to: "/" },
      { from: "./src/sw.js", to: "sw.js" },
      { from: "./public/fallback.html", to: "fallback.html" }
    ]),
    new HtmlWebpackPlugin({
      title: "Sticky Memory",
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "/src/sw.js")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    }),

    process.env.ENV !== "production" ? new BundleAnalyzerPlugin() : ""
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"]
        }
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(gif|jpeg|jpg|png|pdf|svg|ico)$/,
        use: "file-loader?img=[name].[ext]"
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  }
};
