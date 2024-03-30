<template>
  <div
    :style="{ width: '100%' }"
    class="py-10 homePage"
  >
    <v-tabs
      v-if="!loadingPosts"
      v-model="postTab"
      class="mb-6 px-16"
    >
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

    <v-window
      v-if="!loadingPosts"
      v-model="postTab"
      class="px-16"
    >
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
              :post="posts[0]"
            />
          </v-col>
        </v-row>

        <post-list
          v-if="posts.length !== 1"
          :posts="posts.slice(1, posts.length)"
        />
      </v-window-item>

      <v-window-item>
        <post-list
          :posts="followingPosts"
          hide-creation-button
        />
      </v-window-item>

      <v-window-item>
        <post-list
          :posts="posts"
          hide-creation-button
        />
      </v-window-item>
    </v-window>

    <v-btn
      v-if="accountStore.isAuthenticated"
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
import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import PostList from '@/components/commons/PostList/index.vue'
import LargePostCard from '@/components/commons/PostList/components/LargePostCard.vue'

import { usePostsCrud } from '@/composables/usePostsCrud'
import type { IPost } from '@/types/post'

import { definePageMeta } from '#imports'

definePageMeta({
  requiresAuth: false,
})

const mainStore = useMainStore()
const accountStore = useAccountStore()
const popupStore = usePopupStore()

const postsCrud = usePostsCrud()

const posts = ref<IPost[]>([])
const followingPosts = ref<IPost[]>([])

const postTab = ref<number | null>(null)

const loadingPosts = ref(false)
const loadingFollowingPosts = ref(false)

async function listPosts () {
  try {
    loadingPosts.value = true
    mainStore.setOverlay(true)

    posts.value = await postsCrud.listPublicPosts()
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  } finally {
    loadingPosts.value = false
    mainStore.setOverlay(false)
  }
}

async function listFollowingPosts () {
  try {
    loadingFollowingPosts.value = true
    mainStore.setOverlay(true)

    if (!accountStore.databaseUser) {
      throw new Error('The user is not authenticated')
    }

    followingPosts.value = await postsCrud.listFollowingPosts(accountStore.databaseUser)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  } finally {
    loadingFollowingPosts.value = false
    mainStore.setOverlay(false)
  }
}

onMounted(() => {
  listPosts()
  listFollowingPosts()
})
</script>

<style lang="scss" scoped>
.homePage {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
