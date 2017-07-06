const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const BabiliPlugin = require('babili-webpack-plugin')
const template = require('lodash/template')
const pkg = require('./package.json')

const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  entry: [
    './src/index.js',
    './src/index.less'
  ],
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'cockpit-for-pixiv.user.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      style: `${__dirname}/src/style`
    }
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
        include: /src/,
        loader: 'babel-loader',
        options: { cacheDirectory: true }
      },
      {
        test: /\.less$/,
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
              modules: true,
              camelCase: true,
              importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: 'less-loader',
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
  const banner = template(fs.readFileSync('banner', 'utf-8'))(pkg)

  config.plugins = [
    ...config.plugins,
    new BabiliPlugin(),
    new webpack.BannerPlugin({banner, raw: true}),
  ]
  config.devtool = false
}

module.exports = config
