<template>
  <v-avatar
    size="40"
    v-bind="$attrs"
  >
    <v-img
      v-if="props.src"
      :src="props.src"
      alt="Avatar"
      cover
    />

    <span v-else-if="props.name">
      {{ props.name?.[0] ?? '?' }}
    </span>

    <v-img
      v-else
      src="/images/backgrounds/gray_square.svg"
      alt="Avatar"
      cover
    />
  </v-avatar>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  src?: string | null,
  name?: string
}>()
</script>
