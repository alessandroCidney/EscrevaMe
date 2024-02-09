<template>
  <div>
    <div>Necessário fazer login:</div>

    <v-btn @click="handleLogin">
      Fazer login
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import { useNuxtApp, definePageMeta } from '#imports'

definePageMeta({
  layout: 'clear',
})

const nuxtApp = useNuxtApp()

async function handleLogin () {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(nuxtApp.$auth, provider)
}
</script>
