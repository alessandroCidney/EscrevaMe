<template>
  <div
    v-if="userData"
    class="userProfilePage"
  >
    <div :style="{ height: '400px' }">
      <parallax-with-loader
        v-if="userData.backgroundImageUrl"
        :src="userData.backgroundImageUrl"
      />
    </div>

    <div class="detailsSection">
      <div class="startArea">
        <user-avatar
          v-if="userData.profilePhotoUrl"
          :src="userData.profilePhotoUrl"
          class="profilePhoto"
          size="250"
        />

        <div class="py-7 ml-6">
          <h2 class="text-h4 font-weight-bold mb-3">
            {{ userData.name }}
          </h2>

          <div v-if="userData.createdAt">
            Joined {{ formatDate(userData.createdAt) }}
          </div>
        </div>
      </div>
    </div>

    <div class="postsArea">
      <h2>Posts</h2>

      <post-list
        :posts="userPosts"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import moment from 'moment'

import UserAvatar from '@/components/layouts/default/AppHeader/components/UserAvatar.vue'
import ParallaxWithLoader from '@/components/commons/ParallaxWithLoader.vue'
import PostList from '@/components/commons/PostList/index.vue'

import { useMainStore } from '@/store/index'
import { usePopupStore } from '@/store/popup'

import { useUsersCrud } from '@/composables/useUsersCrud'
import { usePostsCrud } from '@/composables/usePostsCrud'

import type { IDatabaseUser } from '@/types/user'
import type { IPost } from '@/types/post'

import { useRoute, definePageMeta, useRouter } from '#imports'

definePageMeta({
  requiresAuth: true,
})

const mainStore = useMainStore()
const popupStore = usePopupStore()

const route = useRoute()
const router = useRouter()

const routeUserId = route.params.userId

const usersCrud = useUsersCrud()
const postsCrud = usePostsCrud()

const loadingUserPosts = ref(false)

const userData = ref<IDatabaseUser | null>(null)
const userPosts = ref<IPost[]>([])

onMounted(async () => {
  if (typeof routeUserId !== 'string') {
    return router.push('home')
  }

  await getUserData(routeUserId)
  await listUserPosts(routeUserId)
})

function formatDate (date: Date) {
  return moment(date).format('LL')
}

async function getUserData (userId: string) {
  try {
    mainStore.setOverlay(true)

    userData.value = await usersCrud.get(userId)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    mainStore.setOverlay(false)
  }
}

async function listUserPosts (userId: string) {
  try {
    loadingUserPosts.value = true

    userPosts.value = await postsCrud.listUserPosts(userId)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingUserPosts.value = false
  }
}
</script>

<style lang="scss" scoped>
.userProfilePage {
  .detailsSection {
    .startArea {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      max-width: 1200px;

      margin: 0 auto;

      .profilePhoto {
        transform: translateY(-30%);

        border: 5px solid white;
      }
    }
  }
}
</style>
