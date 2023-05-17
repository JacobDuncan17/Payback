const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

const workboxPlugin = new InjectManifest({
  swSrc: './src-sw.js',
  swDest: 'src-sw.js'
});

const manifestPlugin = new WebpackPwaManifest({
  name: 'Just another text editor',
  short_name: 'JATE',
  description: 'Create notes online or not',
  background_color: '',
  theme_color: '',
  icons: [
    {
      src: path.resolve('src/images/logo.png'),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join('assets', 'icons'),
    },
  ],
});

const cssLoader = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
};

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html'
});

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [HtmlWebpackPluginConfig, manifestPlugin, workboxPlugin],

    module: {
      rules: [cssLoader, babelLoader],
    },
  };
};
