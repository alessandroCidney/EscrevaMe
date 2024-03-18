<template>
  <v-row v-bind="$attrs">
    <v-col
      v-for="post of props.posts"
      :key="`postListItem${post._id}`"
      class="d-flex align-center justify-center"
      cols="12"
      md="4"
    >
      <post-card
        :post="post"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

import PostCard from './components/PostCard.vue'

import type { IPost } from '@/types/post'

const props = defineProps<{ posts: IPost[] }>()
</script>
