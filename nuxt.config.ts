// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'CalLog DeltaHR',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: "apple-touch-icon", sizes:"60x60", href:"/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes:"32x32", href:"/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes:"16x16", href:"/favicon-16x16.png" },
        { rel: "manifest", href:"/site.webmanifest" },
        { rel: "mask-icon", href:"/safari-pinned-tab.svg", color: "#5bbad5"},
      ],
      meta: [
        { name: "msapplication-TileColor", content:"#da532c" },
        { name: "theme-color", content:"#ffffff" },
      ]
    }
  },
  modules: [
    "nuxt-vuefire",
    '@pinia/nuxt',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyBMKBwPbOIX18UZ53B622VgLk4aRmBl1q0",
      authDomain: "calllog.deltahr.pl",
      databaseURL:
        "https://calllogadas2-9a345-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "calllogadas2-9a345",
      storageBucket: "calllogadas2-9a345.appspot.com",
      messagingSenderId: "466886593574",
      appId: "1:466886593574:web:f0f49becbd2e4e5a2d6ae7",
    },
  },
  typescript:{
    tsConfig: {
      "include": [ "types/*.d.ts" ]
    }
  },
});
