<template>
  <v-row class="py-10 px-16">
    <v-col
      v-for="post of props.posts"
      :key="`postListItem${post._id}`"
      class="d-flex align-center justify-center"
      cols="4"
    >
      <v-card
        :to="`/posts/${post._id}`"
        width="400px"
        shaped
        flat
      >
        <v-img
          :src="post.picture"
          max-height="300px"
          max-width="100%"
          cover
        />

        <v-card-title>{{ post.title }}</v-card-title>

        <v-card-text>
          {{ post.description }}
        </v-card-text>

        <v-card-text>
          <v-chip
            v-for="(postTag, postTagIndex) of post.tags"
            :key="`postTag${postTagIndex}`"
            class="mr-2"
          >
            {{ postTag }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { IPost } from '@/types/post'

const props = defineProps<{ posts: IPost[] }>()
</script>
