<template>
  <v-row class="py-10 px-16">
    <v-col
      v-for="post of props.posts"
      :key="`postListItem${post._id}`"
      class="d-flex align-center justify-center"
      cols="12"
      md="4"
    >
      <v-card
        :to="`/posts/${post._id}`"
        class="rounded-lg pb-2"
        width="400px"
        shaped
        flat
      >
        <v-img
          v-if="post.backgroundPhotoUrl"
          :src="post.backgroundPhotoUrl"
          max-height="300px"
          max-width="100%"
          class="mb-2"
          cover
        />

        <v-card-text v-if="post.tags.length" class="pb-0 pt-2">
          <div
            v-for="(postTag, postTagIndex) of post.tags"
            :key="`postTag${postTagIndex}`"
            class="mr-2 font-weight-bold"
          >
            {{ postTag }}
          </div>
        </v-card-text>

        <v-card-title class="mb-10">
          {{ post.title }}
        </v-card-title>

        <v-card-text>
          {{ getFromNowDate(post.createdAt) }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import moment from 'moment'

import type { IPost } from '@/types/post'

moment.locale('pt-BR')

const props = defineProps<{ posts: IPost[] }>()

function getFromNowDate (date: Date) {
  return moment(date).fromNow()
}
</script>
