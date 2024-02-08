import { initializeApp, type FirebaseOptions } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const firebaseConfig: FirebaseOptions = {
    apiKey: config.public.FB_API_KEY,
    authDomain: config.public.FB_AUTH_DOMAIN,
    projectId: config.public.FB_PROJECT_ID,
    storageBucket: config.public.FB_STORAGE_BUCKET,
    messagingSenderId: config.public.FB_MESSAGING_SENDER_ID,
    appId: config.public.FB_APP_ID,
  }

  const app = initializeApp(firebaseConfig)

  const auth = getAuth(app)
  const firestore = getFirestore(app)
  // const analytics = getAnalytics(app)

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.vueApp.provide('firestore', firestore)

  return {
    provide: {
      auth,
      firestore,
    },
  }
})
