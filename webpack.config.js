const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const isProduction = env.production;

  return {
    entry: path.join(__dirname, 'src', 'index.tsx'),
    devtool: 'inline-source-map',
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      path: path.join(__dirname, 'build'),
    },
    plugins: [
      new HtmlWebpackPlugin(Object.assign(
        {},
        {
          template: path.join(__dirname, 'public', 'index.ejs'),
          filename: 'index.html',
        },
        {},
      ),),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      hot: true,
      inline: true,
      port: 3000,
      open: true,
    }
  };
};
