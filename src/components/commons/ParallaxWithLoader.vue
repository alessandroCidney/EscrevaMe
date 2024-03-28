<template>
  <v-parallax
    :src="props.src"
    v-bind="$attrs"
  >
    <template #placeholder>
      <v-skeleton-loader
        width="100%"
        height="100%"
      />
    </template>
  </v-parallax>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{ src: string }>()
</script>
