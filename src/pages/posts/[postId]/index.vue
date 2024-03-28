<template>
  <section class="postPage">
    <div class="postEditor pb-10">
      <div class="fillWidth">
        <image-with-loader
          v-if="postData?.backgroundPhotoUrl"
          :src="postData.backgroundPhotoUrl"
          height="400px"
          width="calc(90% - 40px)"
          class="mb-10 horizontalMarginAuto"
        />
      </div>

      <div
        v-if="postData && postAuthorData"
        :style="{
          width: '90%'
        }"
        class="text-left px-5 d-flex align-center justify-space-between"
      >
        <div class="d-flex align-center">
          <div
            class="d-flex align-center cursorPointer"
            @click="$router.push(`/users/${postData.authorId}`)"
          >
            <user-avatar
              :src="postAuthorData.profilePhotoUrl"
            />

            <div class="font-weight-medium ml-3">
              {{ postAuthorData?.name }}
            </div>
          </div>

          <div>
            <v-icon>
              mdi-circle-small
            </v-icon>
          </div>

          <div>
            {{ formatDate(postData.createdAt) }}
          </div>
        </div>

        <div v-if="accountStore.userId === postData.authorId">
          <v-btn
            icon="mdi-pencil"
            variant="text"
            size="small"
            @click="$router.push(`/posts/${postData._id}/update`)"
          />

          <v-btn
            icon="mdi-delete"
            variant="text"
            size="small"
          />
        </div>
      </div>

      <h1
        :style="{
          width: '90%'
        }"
        class="pa-5 mb-2 text-h4 font-weight-bold text-left"
      >
        {{ titleModel }}
      </h1>

      <default-editor
        :editor="tiptapEditor.editor"
        class="tiptapPostEditor"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineModel, ref, onMounted } from 'vue'

import moment from 'moment'

import { useMainStore } from '@/store/index'
import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import { useTiptapEditor } from '@/composables/useTiptapEditor'

import { usePostsCrud } from '@/composables/usePostsCrud'
import { useUsersCrud } from '@/composables/useUsersCrud'

import DefaultEditor from '@/components/commons/DefaultEditor.vue'
import ImageWithLoader from '@/components/commons/ImageWithLoader.vue'
import UserAvatar from '@/components/layouts/default/AppHeader/components/UserAvatar.vue'

import type { IPost } from '@/types/post'
import type { IDatabaseUser } from '@/types/user'

import { useRoute, definePageMeta, useRouter } from '#imports'

definePageMeta({
  requiresAuth: true,
})

const mainStore = useMainStore()
const accountStore = useAccountStore()
const popupStore = usePopupStore()

const postsCrud = usePostsCrud()
const usersCrud = useUsersCrud()

const route = useRoute()
const router = useRouter()

const routePostId = route.params.postId

const postData = ref<IPost | null>(null)
const postAuthorData = ref<IDatabaseUser | null>(null)

const titleModel = defineModel<string>('title', { default: '' })
const contentModel = defineModel<string>('content', { default: '' })

const tiptapEditor = useTiptapEditor(contentModel, { editable: false })

onMounted(async () => {
  if (typeof routePostId !== 'string') {
    return router.push('/home')
  }

  await getPostData(routePostId)
})

function formatDate (createdAt: Date) {
  return moment(createdAt).format('MMMM Do YYYY, h:mm a')
}

async function getPostData (postId: string) {
  try {
    mainStore.setOverlay(true)

    postData.value = await postsCrud.get(postId)
    postAuthorData.value = await usersCrud.get(postData.value.authorId)

    titleModel.value = postData.value.title
    contentModel.value = postData.value.content
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
</script>

<style lang="scss" scoped>

</style>
