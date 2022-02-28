const path = require("path");

const port = 3000;

module.exports = {
  mode: "production",
  entry: {
    polyfill: "babel-polyfill",
    app: "./starterOnly/src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    open: true,
    port,
  },
};

// open = ouverture du navigateur au lancement du serveur
// port = ici au lieu du port par defaut (8080) on utilise le port 3000.
