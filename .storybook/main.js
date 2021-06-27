module.exports = {
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  typescript: {
    reactDocgen: 'none'
  },
  babel: async (options) => ({
    ...options,
    plugins: [...options.plugins, '@babel/plugin-transform-react-jsx']
  }),
  webpackFinal: (config) => {
    const nextConfig = require('../next.config.js')
    const assetRule = config.module.rules.find(({ test }) => test.test('.svg'))

    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query
    }

    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack', assetLoader]
    })
    config.resolve.modules.push(`${process.cwd()}/src`)
    return { ...nextConfig.webpack, ...config }
  }
}
