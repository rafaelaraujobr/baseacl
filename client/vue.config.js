module.exports = {
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
