<template>
  <v-row class="py-10 px-10">
    <v-col
      v-for="post of posts"
      class="d-flex align-center justify-center"
      cols="4"
    >
      <v-card
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    title: 'Test 01',
    description: 'This is a test',
    picture: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg',
  },
  {
    title: 'Test 02',
    description: 'This is a test',
    picture: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg',
  },
  {
    title: 'Test 03',
    description: 'This is a test',
    picture: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg',
  },
  {
    title: 'Test 04',
    description: 'This is a test',
    picture: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg',
  },
  {
    title: 'Test 05',
    description: 'This is a test',
    picture: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg',
  },
  {
    title: 'Test 06',
    description: 'This is a test',
    picture: 'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_1280.jpg',
  }
])
</script>
