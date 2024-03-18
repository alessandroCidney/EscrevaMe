<template>
  <v-card
    :to="`/posts/${props.post._id}`"
    :width="props.width ?? '100%'"
    class="rounded-lg pb-2 postCard"
    shaped
    flat
  >
    <v-img
      v-if="props.post.backgroundPhotoUrl"
      :src="props.post.backgroundPhotoUrl"
      :max-height="props.imageHeight ?? '250px'"
      :min-height="props.imageHeight ?? '250px'"
      max-width="100%"
      class="mb-2 rounded-lg"
      cover
    />

    <v-card-text class=" py-0 px-2 mt-5 font-weight-medium">
      Programação
    </v-card-text>

    <v-card-title class="font-weight-bold titleLetterSpacing px-2">
      {{ props.post.title }}
    </v-card-title>

    <v-card-text class="px-2">
      Esta é a descrição de um post incrível
    </v-card-text>

    <v-card-text class="px-2">
      {{ getFromNowDate(props.post.createdAt) }}
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import moment from 'moment'

import type { IPost } from '@/types/post'

moment.locale('pt-BR')

const props = defineProps<{
  post: IPost,
  width?: string,
  imageHeight?: string
}>()

function getFromNowDate (date: Date) {
  return moment(date).fromNow()
}
</script>

<style scoped>
.postCard {
  box-shadow: 0px 4px 10px rgb(0, 0, 0, .05);
}
</style>
