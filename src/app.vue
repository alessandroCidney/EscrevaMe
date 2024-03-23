<template>
  <nuxt-layout>
    <nuxt-page />

    <v-overlay
      :model-value="mainStore.appOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        color="white"
        size="150"
        indeterminate
      />
    </v-overlay>
  </nuxt-layout>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/index'

const mainStore = useMainStore()
</script>
