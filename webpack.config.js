const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const compile = require('lodash/template')
const pkg = require('./package.json')

const outPath = path.resolve(__dirname, './docs')
const sourcePath = path.resolve(__dirname, './src')
const template = fs.readFileSync('./src/banner.js', 'utf-8')
const banner = compile(template)(pkg)

const config = {
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
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
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

if (process.env.NODE_ENV === 'production') {
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

  config.devtool = false
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ForkTsCheckerWebpackPlugin(),
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
} else {
  config.devtool = 'inline-source-map'
  config.plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.BannerPlugin({ banner, raw: true })
  ]
}

module.exports = config
