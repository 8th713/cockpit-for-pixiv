const path = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')

const NODE_ENV = process.env.NODE_ENV || 'development'
const outPath = path.join(__dirname, './docs')
const sourcePath = path.join(__dirname, './src')
const env = {
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
}

const config = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    path: outPath,
    filename: 'cockpit-for-pixiv.user.js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.tsx?$/,
        include: sourcePath,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env),
    new CheckerPlugin()
  ],
  stats: 'minimal',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  performance: {
    hints: false
  }
}

if (NODE_ENV === 'production') {
  const fs = require('fs')
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
  const template = require('lodash/template')
  const pkg = require('./package.json')

  const banner = template(fs.readFileSync('./src/banner', 'utf-8'))(pkg)

  config.devtool = false
  config.plugins = [
    ...config.plugins,
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 8,
        compress: {
          comparisons: false,
          warnings: false
        },
        output: {
          comments: false,
          ascii_only: true
        }
      }
    }),
    new webpack.BannerPlugin({ banner, raw: true })
  ]
}

module.exports = config
