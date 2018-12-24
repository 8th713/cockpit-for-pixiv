const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const compile = require('lodash.template')
const pkg = require('./package.json')

module.exports = (env, argv) => {
  const outPath = path.resolve(__dirname, 'docs')

  const DEV = argv.mode !== 'production'
  const config = {
    mode: argv.mode,
    entry: {
      'cockpit-for-pixiv': './packages/core',
      'cockpit-download-addon': './packages/addon-download'
    },
    output: {
      filename: '[name].user.js',
      path: outPath
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['source-map-loader'],
          enforce: 'pre'
        }
      ]
    },
    plugins: [
      banner('packages/core/banner.js', 'cockpit-for-pixiv'),
      banner('packages/addon-download/banner.js', 'cockpit-download-addon')
    ],
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    performance: false,
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 7,
            compress: {
              comparisons: false
            },
            output: {
              comments: /^\**!|@preserve|@license|@cc_on|Licensed/,
              ascii_only: true
            }
          },
          parallel: true,
          cache: true,
          sourceMap: true
        })
      ]
    }
  }

  if (DEV) {
    config.devtool = 'inline-source-map'
  } else {
  }
  injectDocument(config)

  return config
}

function banner(bannerPath, include) {
  const tmplPath = path.resolve(__dirname, bannerPath)
  const template = fs.readFileSync(tmplPath, 'utf-8')

  return new webpack.BannerPlugin({
    include,
    banner: compile(template)(pkg),
    raw: true
  })
}
function injectDocument(config) {
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  config.module.rules.push({
    test: /\.pug?$/,
    loader: 'pug-loader'
  })
  config.plugins.unshift(
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: 'packages/site/index.pug',
      pkg
    })
  )
}
