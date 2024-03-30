<template>
  <v-row
    v-if="props.posts.length > 0"
    v-bind="$attrs"
  >
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

  <v-row v-else>
    <v-col
      class="d-flex align-center justify-center flex-column text-center mb-10"
      cols="12"
    >
      <v-img
        src="@/assets/images/illustrations/post.svg"
        width="300px"
      />

      <h2
        class="text-h4 font-weight-bold mb-3"
      >
        No posts found
      </h2>

      <p
        class="mb-7"
      >
        {{
          hideCreationButton
            ? 'No posts have been created yet'
            : 'Create a new post by clicking the button below'
        }}
      </p>

      <v-btn
        v-if="!hideCreationButton"
        color="secondary"
        prepend-icon="mdi-plus"
        @click="$router.push('/posts/new')"
      >
        New post
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

import PostCard from './components/PostCard.vue'

import type { IPost } from '@/types/post'

const props = defineProps<{
  posts: IPost[]
  hideCreationButton?: boolean
}>()
</script>
