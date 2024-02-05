<template>
  <div>
    <post-list
      :posts="posts"
    />

    <v-btn
      location="bottom right"
      position="fixed"
      color="primary"
      icon="mdi-plus"
      class="ma-5"
      @click="$router.push('/posts/new')"
    />
  </div>
</template>

<script setup lang="ts">
import PostList from '@/components/commons/PostList.vue'

import { usePostsCrud } from '@/composables/usePostsCrud'

const postsCrud = usePostsCrud()

const posts = await postsCrud.list()
</script>
