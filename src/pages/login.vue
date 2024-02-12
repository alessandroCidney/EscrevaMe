<template>
  <div>
    {{ accountStore.isAuthenticated }}
    <div>Necessário fazer login:</div>

    <v-btn @click="handleLogin">
      Fazer login
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { useAccountStore } from '@/store/account'

import { useNuxtApp, definePageMeta } from '#imports'

definePageMeta({
  layout: 'clear',
})

const accountStore = useAccountStore()
const nuxtApp = useNuxtApp()

async function handleLogin () {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(nuxtApp.$auth, provider)
}
</script>
