<template>
  <v-app-bar
    scroll-behavior="fade-image inverted"
    image="@/assets/images/backgrounds/blue_square.svg"
    elevation="0"
    color="transparent"
    class="px-5 indexPageAppBar"
  >
    <template #prepend>
      <v-img
        class="cursorPointer"
        src="@/assets/images/logos/white_logo.svg"
        width="110px"
        @click="$router.push('/')"
      />
    </template>

    <template #append>
      <v-btn
        variant="text"
        color="white"
        @click="$router.push('/login')"
      >
        Sign in
      </v-btn>

      <v-btn
        variant="text"
        color="white"
        @click="$router.push('/signup')"
      >
        Join us
      </v-btn>
    </template>
  </v-app-bar>

  <v-main class="indexPageMain">
    <start-area />

    <posts-area />
  </v-main>

  <app-footer />
</template>

<script lang="ts" setup>
import StartArea from '@/components/pages/index/StartArea.vue'
import PostsArea from '@/components/pages/index/PostsArea.vue'
import AppFooter from '@/components/layouts/default/AppFooter/index.vue'

import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'clear',

  requiresAuth: false,
  redirectIfAuthenticated: true,
})
</script>

<style lang="scss">
.indexPageMain {
  --v-layout-top: 0px !important;
}
</style>
