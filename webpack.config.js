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
      'cockpit-download-addon': './packages/addon-download',
    },
    output: {
      filename: '[name].user.js',
      path: outPath,
    },
    target: 'web',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { envName: argv.mode },
        },
      ],
    },
    plugins: [
      banner('packages/core/banner.js', 'cockpit-for-pixiv'),
      banner('packages/addon-download/banner.js', 'cockpit-download-addon'),
    ],
    node: false,
    performance: false,
    optimization: {
      sideEffects: true,
      usedExports: true,
      concatenateModules: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 8,
            compress: {
              comparisons: false,
            },
            format: {
              comments: /^\**!|@preserve|@license|@cc_on|Licensed/,
              ascii_only: true,
            },
          },
          extractComments: false,
          sourceMap: true,
          parallel: true,
        }),
      ],
    },
  }

  if (DEV) {
    config.devtool = 'inline-source-map'
  } else {
    injectDocument(config)
    // addAnalyzer(config)
  }

  return config
}

function banner(bannerPath, include) {
  const tmplPath = path.resolve(__dirname, bannerPath)
  const template = fs.readFileSync(tmplPath, 'utf-8')

  return new webpack.BannerPlugin({
    include,
    banner: compile(template)(pkg),
    raw: true,
  })
}

function injectDocument(config) {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyPlugin = require('copy-webpack-plugin')

  config.plugins.unshift(
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      templateParameters: pkg,
      template: 'packages/site/index.ejs',
    }),
    new CopyPlugin({
      patterns: [{ from: 'packages/site/assets', to: '' }],
    })
  )
}

function addAnalyzer(config) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

  config.plugins.push(new BundleAnalyzerPlugin())
}
