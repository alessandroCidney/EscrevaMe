<template>
  <div
    class="userProfilePage pb-16"
  >
    <div :style="{ height: '400px' }">
      <parallax-with-loader
        :src="userData?.backgroundImageUrl || '/images/backgrounds/gray_square.svg'"
      />
    </div>

    <div class="detailsSection px-16">
      <div class="startArea">
        <div
          :style="{ width: '250px', height: '250px' }"
        >
          <user-avatar
            v-if="userData?.profilePhotoUrl"
            :src="userData?.profilePhotoUrl"
            class="profilePhoto"
            size="250"
          />
        </div>

        <div class="py-7 ml-6">
          <h2 class="text-h4 font-weight-bold mb-3">
            {{ userData?.name }}
          </h2>

          <div v-if="userData?.createdAt">
            Joined {{ formatDate(userData.createdAt) }}
          </div>

          <div
            v-if="routeUserId !== accountStore.userId"
            class="my-5"
          >
            <v-btn
              :loading="loadingFollow"
              :variant="isFollowing ? 'tonal' : 'elevated'"
              :prepend-icon="isFollowing ? 'mdi-check-circle' : undefined"
              color="secondary"
              @click="isFollowing ? handleUnfollow() : handleFollow()"
            >
              {{ isFollowing ? 'Following' : 'Follow' }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>

    <div
      class="postsSection px-16"
    >
      <div class="postsArea">
        <h2 class="text-h4 mb-5 font-weight-bold">
          Recent posts
        </h2>

        <v-divider />

        <post-list
          :posts="userPosts"
          :hide-creation-button="accountStore.userId !== routeUserId"
          class="py-16"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

import moment from 'moment'

import UserAvatar from '@/components/layouts/default/AppHeader/components/UserAvatar.vue'
import ParallaxWithLoader from '@/components/commons/ParallaxWithLoader.vue'
import PostList from '@/components/commons/PostList/index.vue'

import { useMainStore } from '@/store/index'
import { useAccountStore } from '@/store/account'
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
const accountStore = useAccountStore()
const popupStore = usePopupStore()

const route = useRoute()
const router = useRouter()

const routeUserId = route.params.userId

const usersCrud = useUsersCrud()
const postsCrud = usePostsCrud()

const loadingUserPosts = ref(false)

const userData = ref<IDatabaseUser | null>(null)
const userPosts = ref<IPost[]>([])

const isFollowing = computed(() =>
  typeof routeUserId === 'string' &&
  !!accountStore.databaseUser &&
  accountStore.databaseUser.following.includes(routeUserId),
)

onMounted(async () => {
  if (typeof routeUserId !== 'string') {
    return router.push('/home')
  }

  if (!accountStore.userId) {
    throw new Error('The user is not authenticated')
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

    const listPrivate = accountStore.userId === userId ? undefined : false

    userPosts.value = await postsCrud.listUserPosts(userId, listPrivate)
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

const loadingFollow = ref(false)

async function handleFollow () {
  try {
    loadingFollow.value = true

    if (!accountStore.databaseUser) {
      throw new Error('The user is not authenticated')
    }

    if (accountStore.databaseUser.following.length === 30) {
      throw new Error('You can currently only follow up to 30 users')
    }

    if (typeof routeUserId !== 'string') {
      throw new TypeError('Invalid user')
    }

    const updatedUserData = await usersCrud.follow(accountStore.databaseUser, routeUserId)

    accountStore.setDatabaseUser(updatedUserData)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingFollow.value = false
  }
}

async function handleUnfollow () {
  try {
    loadingFollow.value = true

    if (!accountStore.databaseUser) {
      throw new Error('The user is not authenticated')
    }

    if (typeof routeUserId !== 'string') {
      throw new TypeError('Invalid user')
    }

    const updatedUserData = await usersCrud.unfollow(accountStore.databaseUser, routeUserId)

    accountStore.setDatabaseUser(updatedUserData)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingFollow.value = false
  }
}
</script>

<style lang="scss" scoped>
.userProfilePage {
  min-height: 150vh;

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

  .postsSection {
    .postsArea {
      max-width: 1200px;

      margin: 0 auto;
    }
  }
}
</style>
