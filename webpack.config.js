const path = require("path");

module.exports = {
  entry: "./app.js", // Your main entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  mode: "production", // Explicitly set mode
  resolve: {
    extensions: [".js"], // File extensions to resolve
  },
};
