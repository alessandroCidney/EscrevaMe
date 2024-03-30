<template>
  <v-card
    :to="`/posts/${props.post._id}`"
    :width="props.width ?? '100%'"
    class="pb-2 postCard rounded-0"
    shaped
    flat
  >
    <image-with-loader
      v-if="props.post.backgroundPhotoUrl"
      :src="props.post.backgroundPhotoUrl"
      height="250px"
      width="100%"
      class="mb-2"
      cover
    />

    <v-card-text class="px-4 py-0 mt-5 font-weight-medium">
      Programação
    </v-card-text>

    <v-card-title class="px-4 font-weight-bold titleLetterSpacing">
      {{ props.post.title }}
    </v-card-title>

    <v-card-text class="px-4">
      Esta é a descrição de um post incrível
    </v-card-text>

    <v-card-text class="px-4">
      {{ getFromNowDate(props.post.updatedAt ?? props.post.createdAt) }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import ImageWithLoader from '@/components/commons/ImageWithLoader.vue'

import { getFromNowDate } from '@/utils/date'

import type { IPost } from '@/types/post'

const props = defineProps<{
  post: IPost,
  width?: string,
}>()
</script>

<style scoped>
.postCard {
  box-shadow: 0px 4px 10px rgb(0, 0, 0, .05);
}
</style>
