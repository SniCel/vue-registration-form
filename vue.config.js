const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/global/scss/functions/rem.scss";
          @import "@/assets/global/scss/fonts.scss";
        `
      }
    }
  }
})
