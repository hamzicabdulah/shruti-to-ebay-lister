var path = require("path");

var config = {
  entry: ["./client/src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "client/public"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [/public/, /tests/]
      }
    ]
  }
};

module.exports = config;