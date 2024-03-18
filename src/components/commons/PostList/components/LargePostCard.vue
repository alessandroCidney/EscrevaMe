<template>
  <v-card
    :to="`/posts/${props.post._id}`"
    width="100%"
    class="rounded-lg"
    shaped
    flat
  >
    <div class="d-flex align-center justify-start flex-column flex-md-row">
      <v-img
        v-if="props.post.backgroundPhotoUrl"
        :src="props.post.backgroundPhotoUrl"
        :max-height="'300px'"
        :min-height="'300px'"
        :width="isLargeScreen ? '50%' : '100%'"
        class="rounded-lg"
        cover
      />

      <div class="mx-8">
        <v-card-text class=" pa-0 mt-5 mb-3 font-weight-medium normalLetterSpacing">
          Programação
        </v-card-text>

        <h1 class="font-weight-bold titleLetterSpacing">
          {{ props.post.title }}
        </h1>

        <v-card-text class="px-0 mb-10">
          Esta é a descrição de um post incrível
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

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
