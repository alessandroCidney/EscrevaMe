import { initializeApp, deleteApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { defineNuxtPlugin } from '#imports'

function getFirebaseConfig () {
  const config = useRuntimeConfig()

  return {
    apiKey: config.public.FB_API_KEY,
    authDomain: config.public.FB_AUTH_DOMAIN,
    projectId: config.public.FB_PROJECT_ID,
    storageBucket: config.public.FB_STORAGE_BUCKET,
    messagingSenderId: config.public.FB_MESSAGING_SENDER_ID,
    appId: config.public.FB_APP_ID,
  }
}

function initializeFirebaseApp (name?: string) {
  return initializeApp(getFirebaseConfig(), name)
}

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeFirebaseApp()

  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.vueApp.provide('firestore', firestore)
  nuxtApp.vueApp.provide('storage', storage)
  nuxtApp.vueApp.provide('initializeFirebaseApp', initializeFirebaseApp)
  nuxtApp.vueApp.provide('getAuth', getAuth)
  nuxtApp.vueApp.provide('deleteApp', deleteApp)

  return {
    provide: {
      auth,
      firestore,
      storage,
      initializeFirebaseApp,
      getAuth,
      deleteApp,
    },
  }
})
