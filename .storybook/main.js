module.exports = {
  stories: [
    '../packages/core/**/*.stories.mdx',
    '../packages/core/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    check: false,
    reactDocgen: false,
  },
}
