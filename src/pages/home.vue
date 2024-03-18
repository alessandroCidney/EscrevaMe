<template>
  <div
    :style="{ width: '100%' }"
    class="py-10 homePage"
  >
    <div class="px-10">
      <v-row class="mb-10">
        <v-col
          class="d-flex align-center justify-center"
          cols="12"
        >
          <large-post-card
            :post="posts[1]"
          />
        </v-col>
      </v-row>

      <post-list
        :posts="posts"
      />
    </div>

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
import PostList from '@/components/commons/PostList/index.vue'
import LargePostCard from '@/components/commons/PostList/components/LargePostCard.vue'

import { usePostsCrud } from '@/composables/usePostsCrud'

const postsCrud = usePostsCrud()

const posts = await postsCrud.list()
</script>

<style lang="scss" scoped>
.homePage {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
