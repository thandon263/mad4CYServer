var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    app: "./client/src/app.js"
  },
  output: {
    filename: "public/build/bundle.js",
    sourceMapFilename: "public/build/bundle.map"
  },
  devtool: "#source-map",
  // plugins: [
  //    	new webpack.optimize.UglifyJsPlugin({minimize: true}),
  // ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2017"]
        }
      }
    ]
  }
};
