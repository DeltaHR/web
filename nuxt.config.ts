// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-vuefire"],
  vuefire: {
    auth: true,
    config: {
      apiKey: "AIzaSyBMKBwPbOIX18UZ53B622VgLk4aRmBl1q0",
      authDomain: "calllogadas2-9a345.firebaseapp.com",
      databaseURL:
        "https://calllogadas2-9a345-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "calllogadas2-9a345",
      storageBucket: "calllogadas2-9a345.appspot.com",
      messagingSenderId: "466886593574",
      appId: "1:466886593574:web:f0f49becbd2e4e5a2d6ae7",
    },
  },
});
