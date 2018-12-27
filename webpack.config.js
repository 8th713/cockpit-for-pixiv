const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const compile = require('lodash.template')
const pkg = require('./package.json')

module.exports = (env, argv) => {
  const outPath = path.resolve(__dirname, 'docs')
  const sourcePath = path.resolve(__dirname, 'src')
  const tmplPath = path.resolve(__dirname, 'src/banner.js')
  const template = fs.readFileSync(tmplPath, 'utf-8')
  const banner = compile(template)(pkg)
  const DEV = argv.mode !== 'production'
  const config = {
    mode: argv.mode,
    entry: './src/index.ts',
    output: {
      filename: 'cockpit-for-pixiv.user.js',
      path: outPath
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
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new webpack.BannerPlugin({ banner, raw: true })
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
              comments: 'some',
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
  }

  return config
}
