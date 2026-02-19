export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  ssr: true,
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    public: {
      wpBaseUrl: process.env.WP_BASE_URL || 'https://cms.guerillaminstrel.com'
    }
  }
})