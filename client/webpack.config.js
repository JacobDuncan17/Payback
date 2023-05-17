const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

const webpackConfig = () => {
  const mode = 'development';
  const entry = {
    main: './src/js/index.js',
    install: './src/js/install.js'
  };
  const output = {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: "[name][ext]"
  };
  const plugins = [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Jate',
      favicon: './favicon.ico',
      logo: './src/images/logo.png',
    }),
    new WebpackPwaManifest({
      name: 'Jate',
      short_name: 'Jate',
      start_url: './',
      publicPath: './',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
    }),
  ];
  const moduleRules = [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[contenthash].[ext]',
        outputPath: 'images',
      },
    },
  ];

  return {
    mode,
    entry,
    output,
    plugins,
    module: { rules: moduleRules },
  };
};

module.exports = webpackConfig;
