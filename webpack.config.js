const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: './src/popup.jsx',
    content: './src/content.js',
    background: './src/background.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // popup.jsx -> popup.js
  },
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
    },
    alias: {
      fs: false,
      stream: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env','@babel/preset-react'],
            }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
   },
   plugins: [
    new HtmlWebpackPlugin({
        template: './src/popup.html',
        filename: 'popup.html'
    }),
    new CopyPlugin({
        patterns: [
            { from: "public" }
        ],
    })
   ],
};