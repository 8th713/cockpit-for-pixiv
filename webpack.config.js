const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')
const autoprefixer = require('autoprefixer')
const template = require('lodash/template')
const pkg = require('./package.json')

const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'cockpit-for-pixiv.user.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.js$/,
        enforce: 'pre',
        include: /src/,
        use: [
          {
            options: {
              baseConfig: { extends: ['react-app'] },
              ignore: false,
              useEslintrc: false,
            },
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        include: /src/,
        loader: 'babel-loader',
        options: { cacheDirectory: true }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer({
                browsers: ['last 2 Chrome versions'],
              })],
            },
          },
        ],
      },
    ],
  },
  stats: {colors: true},
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  devtool: 'inline-source-map',
}

if (NODE_ENV === 'production') {
  const banner = template(fs.readFileSync('./src/banner', 'utf-8'))(pkg)

  config.plugins = [
    ...config.plugins,
    new BabiliPlugin(),
    new webpack.BannerPlugin({banner, raw: true}),
  ]
  // $FlowFixMe
  config.devtool = false
}

module.exports = config
