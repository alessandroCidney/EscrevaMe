<template>
  <div
    :style="{ width: '100%' }"
    class="py-10 homePage"
  >
    <v-tabs v-model="postTab" class="mb-6 px-16">
      <v-tab>
        Recent
      </v-tab>

      <v-tab>
        Following
      </v-tab>

      <v-tab>
        Saved
      </v-tab>
    </v-tabs>

    <v-window v-model="postTab" class="px-16">
      <v-window-item>
        <v-row
          v-if="posts.length > 0"
          class="mb-10"
        >
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
      </v-window-item>

      <v-window-item>
        <post-list
          :posts="posts"
        />
      </v-window-item>

      <v-window-item>
        <post-list
          :posts="posts"
        />
      </v-window-item>
    </v-window>

    <v-btn
      :style="{ zIndex: 10 }"
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
import { ref, onMounted } from 'vue'

import { useMainStore } from '@/store/index'
import { usePopupStore } from '@/store/popup'

import PostList from '@/components/commons/PostList/index.vue'
import LargePostCard from '@/components/commons/PostList/components/LargePostCard.vue'

import { usePostsCrud } from '@/composables/usePostsCrud'

import type { IPost } from '@/types/post'

import { definePageMeta } from '#imports'

definePageMeta({
  requiresAuth: true,
})

const mainStore = useMainStore()
const popupStore = usePopupStore()

const postsCrud = usePostsCrud()

const posts = ref<IPost[]>([])
const postTab = ref<number | null>(null)

async function listPosts () {
  try {
    mainStore.setOverlay(true)

    posts.value = await postsCrud.list()
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  } finally {
    mainStore.setOverlay(false)
  }
}

onMounted(() => {
  listPosts()
})
</script>

<style lang="scss" scoped>
.homePage {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
