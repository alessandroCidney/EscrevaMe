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
            @click="handleRemove"
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

      <div
        :style="{
          width: '90%'
        }"
        class="pa-5 d-flex align-center justify-end"
      >
        <v-btn
          :loading="loadingLike"
          :icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
          color="secondary"
          variant="text"
          @click="isLiked ? handleUnlike() : handleLike()"
        />

        <v-btn
          color="secondary"
          icon="mdi-bookmark-outline"
          variant="text"
        />
      </div>

      <form-dialog
        v-model:open="postRemovalDialogIsOpen"
        :payload="postRemovalPayload"
        :cancel="cancelRemove"
        :save="confirmRemove"
        title="Remove post"
        max-width="500"
      >
        <p>
          The post will be removed. Do you want to continue?
        </p>

        <template #saveButton="{ loading, save }">
          <v-btn
            :loading="loading"
            color="secondary"
            variant="text"
            type="submit"
            @click="save"
          >
            Continue
          </v-btn>
        </template>
      </form-dialog>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineModel, ref, onMounted, computed } from 'vue'

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

import FormDialog from '@/components/commons/FormDialog.vue'

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

const isLiked = computed(() =>
  postData.value &&
  accountStore.userId &&
  postData.value.likedBy.includes(accountStore.userId),
)

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

const postRemovalDialogIsOpen = ref(false)
const postRemovalPayload = ref<IPost | null>(null)

function handleRemove () {
  if (!postData.value) {
    return
  }

  postRemovalDialogIsOpen.value = true
  postRemovalPayload.value = postData.value
}

async function confirmRemove () {
  try {
    if (!postRemovalPayload.value) {
      throw new Error('Post not selected')
    }

    await postsCrud.remove(postRemovalPayload.value._id)

    popupStore.showSuccessPopup('Post removed successfully')

    router.push('/home')
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  }
}

function cancelRemove () {
  postRemovalDialogIsOpen.value = false
}

const loadingLike = ref(false)

async function handleLike () {
  try {
    loadingLike.value = true

    if (!postData.value) {
      throw new Error('Post not found')
    }

    if (!accountStore.userId) {
      throw new Error('The user is not authenticated')
    }

    const updatedPost = await postsCrud.like(postData.value, accountStore.userId)

    postData.value.likedBy = updatedPost.likedBy ?? []
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingLike.value = false
  }
}

async function handleUnlike () {
  try {
    loadingLike.value = true

    if (!postData.value) {
      throw new Error('Post not found')
    }

    if (!accountStore.userId) {
      throw new Error('The user is not authenticated')
    }

    const updatedPost = await postsCrud.unlike(postData.value, accountStore.userId)

    postData.value.likedBy = updatedPost.likedBy ?? []
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingLike.value = false
  }
}
</script>

<style lang="scss" scoped>

</style>
