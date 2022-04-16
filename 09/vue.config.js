const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      include: [
        /^index\.html$/,
        /\.css$/,
        /\.js$/,
        /^manifest\.json$/,
        /\.png$/,
      ],
      exclude: []
    }
  }
})
