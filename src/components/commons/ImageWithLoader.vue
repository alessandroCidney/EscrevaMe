<template>
  <v-skeleton-loader
    v-if="loadingImage"
    :width="width ?? '100%'"
    :height="height ?? '100%'"
  />

  <v-img
    :src="props.src"
    :max-height="loadingImage ? 0 : props.height"
    :min-height="loadingImage ? 0 : props.height"
    :max-width="loadingImage ? 0 : props.width"
    class="mb-2"
    cover
    v-bind="$attrs"
    @load="loadingImage = false"
  />
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'

const props = defineProps<{ width?: string, height?: string, src: string }>()

const loadingImage = ref(true)
</script>
