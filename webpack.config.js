const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const template = require('lodash/template')
const pkg = require('./package.json')

const ENV = process.env.NODE_ENV || 'development'
const banner = template(fs.readFileSync('banner', 'utf-8'))(pkg)

function createQueryString(every, prod, dev) {
  const arr = [...every]
  if (ENV === 'production') {
    if (Array.isArray(prod)) {
      arr.push(...prod)
    }
  } else {
    if (Array.isArray(dev)) {
      arr.push(...dev)
    }
  }
  return arr.join('&')
}

const cssQueryString = createQueryString(
  [
    'localIdentName=[local]-[hash:base64:6]',
    'importLoaders=1',
    'modules',
    'camelCase'
  ],
  ['minimize'], // use production
  ['sourceMap'] // use development
)

module.exports = {
  entry: [
    'regenerator-runtime/runtime',
    './src/index.js',
    './src/index.less'
  ],
  output: {
    path: path.join(__dirname, 'gh-pages'),
    filename: 'cockpit-for-pixiv.user.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      style: `${__dirname}/src/style`
    }
  },
  plugins: ([
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) })
  ]).concat(ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { screw_ie8: true, warnings: false }
    }),
    new webpack.BannerPlugin(banner, { raw: true })
  ] : []),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.less$/,
        loader: [
          `style-loader?${ENV === 'production' ? '' : '-'}singleton`,
          `css-loader?${cssQueryString}`,
          'less-loader?sourceMap'
        ].join('!')
      }
    ]
  },
  stats: { colors: true },
  devtool: ENV !== 'production' && 'inline-source-map'
}
