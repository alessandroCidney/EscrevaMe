<template>
  <v-row class="py-10 px-10">
    <v-col
      v-for="post of posts"
      :key="`postListItem${post.id}`"
      class="d-flex align-center justify-center"
      cols="4"
    >
      <v-card
        to=" "
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
import { ref } from 'vue'

const postsArr = Array.from(Array(9).keys())
  .map(index => ({
    id: `test-${index}`,
    title: `Test ${index}`,
    description: 'This is a incredible test of an incredible blog application.',
    picture: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg',
    tags: ['nature', 'paradise'],
    createdAt: new Date().toISOString(),
  }))

const posts = ref(postsArr)
</script>
