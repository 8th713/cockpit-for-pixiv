module.exports = api => {
  const production = api.env('production')
  const presets = [
    ['@babel/env', { modules: false }],
    ['@babel/react', { development: !production }],
    '@babel/typescript'
  ]
  const plugins = [
    [
      'babel-plugin-styled-components',
      {
        ssr: false,
        displayName: !production
      }
    ],
    'dev-expression'
  ]

  api.cache(true)
  return {
    presets,
    plugins
  }
}
