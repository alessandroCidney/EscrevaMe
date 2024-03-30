<template>
  <v-card
    :to="`/posts/${props.post._id}`"
    width="100%"
    class="rounded-0"
    shaped
    flat
  >
    <div class="d-flex align-center justify-start flex-column flex-md-row">
      <image-with-loader
        v-if="props.post.backgroundPhotoUrl"
        :src="props.post.backgroundPhotoUrl"
        :width="isLargeScreen ? '50%' : '100%'"
        height="300px"
        cover
      />

      <div class="mx-8">
        <v-card-text class=" pa-0 mt-5 mb-3 font-weight-medium normalLetterSpacing">
          Programação
        </v-card-text>

        <h1 class="font-weight-bold titleLetterSpacing">
          {{ props.post.title }}
        </h1>

        <v-card-text class="px-0">
          Esta é a descrição de um post incrível
        </v-card-text>

        <v-card-text class="px-0 mb-10">
          {{ getFromNowDate(props.post.updatedAt ?? props.post.createdAt) }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

import ImageWithLoader from '@/components/commons/ImageWithLoader.vue'

import { getFromNowDate } from '@/utils/date'

import type { IPost } from '@/types/post'

const props = defineProps<{
  post: IPost,
}>()

const vuetifyDisplay = useDisplay()

const isLargeScreen = computed(() => vuetifyDisplay.mdAndUp.value)
</script>

<style lang="scss" scoped>
.largePostCard {
  box-shadow: 0px 4px 10px rgb(0, 0, 0, .05);
}
</style>
