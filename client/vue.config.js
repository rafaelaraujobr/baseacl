module.exports = {
  devServer: {
    https: true,
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    i18n: {
      locale: 'pt-br',
      fallbackLocale: 'pt',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  transpileDependencies: [
    'quasar'
  ]
}
