module.exports = (api) => {
  const production = api.env('production')
  const presets = [
    ['@babel/env', { modules: false }],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: !production,
      },
    ],
    '@babel/preset-typescript',
  ]
  const plugins = [
    '@babel/plugin-proposal-optional-chaining',
    'dev-expression',
    'add-react-displayname',
  ]

  api.cache(true)
  return {
    presets,
    plugins,
  }
}
