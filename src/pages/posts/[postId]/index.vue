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
        class="text-left px-5 d-flex align-center justify-space-between adjustToWidth"
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
        class="pa-5 mb-2 text-h4 font-weight-bold text-left adjustToWidth"
      >
        {{ titleModel }}
      </h1>

      <default-editor
        :editor="tiptapEditor.editor"
        class="tiptapPostEditor"
      />

      <div
        class="pa-5 d-flex align-center justify-end adjustToWidth"
      >
        <v-btn
          :loading="loadingLike"
          :icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
          color="secondary"
          variant="text"
          @click="isLiked ? handleUnlike() : handleLike()"
        />

        <v-btn
          :icon="showCommentCreationTextArea ? 'mdi-message' : 'mdi-message-outline'"
          color="secondary"
          variant="text"
          @click="showCommentCreationTextArea = !showCommentCreationTextArea"
        />

        <v-btn
          :loading="loadingSavePost"
          :icon="isSaved ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
          color="secondary"
          variant="text"
          @click="isSaved ? handleRemoveSavedPost() : handleSavePost()"
        />
      </div>

      <div
        v-if="postData"
        class="adjustToWidth"
      >
        <comment-creation-form
          v-model:visible="showCommentCreationTextArea"
          v-model:comments="postCommentsWithUserData"
          :post="postData"
        />

        <comments-list
          v-model:comments="postCommentsWithUserData"
          :post="postData"
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
import CommentsList from '@/components/commons/CommentsList/index.vue'
import CommentCreationForm from '@/components/commons/CommentsList/components/CommentCreationForm.vue'

import FormDialog from '@/components/commons/FormDialog.vue'

import type { IPost, IPostComment } from '@/types/post'
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

const isSaved = computed(() =>
  typeof routePostId === 'string' &&
  !!accountStore.databaseUser &&
  accountStore.databaseUser.savedPosts.includes(routePostId),
)

const titleModel = defineModel<string>('title', { default: '' })
const contentModel = defineModel<string>('content', { default: '' })

const tiptapEditor = useTiptapEditor(contentModel, { editable: false })

onMounted(async () => {
  if (typeof routePostId !== 'string') {
    return router.push('/home')
  }

  await getPostData(routePostId)
  await listPostComments()
})

function formatDate (createdAt: Date) {
  return moment(createdAt).format('MMMM Do YYYY, h:mm a')
}

const userDataCache = ref<{ [k: string]: IDatabaseUser }>({})

async function cachedGetUserData (userId: string) {
  const cachedValue = userDataCache.value[userId]

  if (cachedValue) {
    return cachedValue
  }

  const userData = await usersCrud.get(userId)
  userDataCache.value[userData._id] = userData

  return userData
}

async function getPostData (postId: string) {
  try {
    mainStore.setOverlay(true)

    postData.value = await postsCrud.get(postId)
    postAuthorData.value = await cachedGetUserData(postData.value.authorId)

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

type TPostCommentWithUserData = IPostComment & {
  userData: IDatabaseUser | null
}

const postCommentsWithUserData = ref<TPostCommentWithUserData[]>([])
const loadingPostComments = ref(false)

async function listPostComments () {
  try {
    loadingPostComments.value = true

    if (typeof routePostId !== 'string') {
      return router.push('/home')
    }

    const postComments = await postsCrud.listComments(routePostId)

    const partialPostComments: TPostCommentWithUserData[] = postComments
      .map(postComment => ({ ...postComment, userData: null }))

    for (const partialPostComment of partialPostComments) {
      if (partialPostComment.authorId) {
        partialPostComment.userData = await cachedGetUserData(partialPostComment.authorId)
      }
    }

    postCommentsWithUserData.value = partialPostComments
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingPostComments.value = false
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

const loadingSavePost = ref(false)

async function handleSavePost () {
  try {
    loadingSavePost.value = true

    if (!postData.value) {
      throw new Error('Post not found')
    }

    if (!accountStore.databaseUser) {
      throw new Error('The user is not authenticated')
    }

    const updatedUser = await usersCrud.savePost(accountStore.databaseUser, postData.value._id)

    accountStore.setDatabaseUser(updatedUser)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingSavePost.value = false
  }
}

async function handleRemoveSavedPost () {
  try {
    loadingSavePost.value = true

    if (!postData.value) {
      throw new Error('Post not found')
    }

    if (!accountStore.databaseUser) {
      throw new Error('The user is not authenticated')
    }

    const updatedUser = await usersCrud.removeSavedPost(accountStore.databaseUser, postData.value._id)

    accountStore.setDatabaseUser(updatedUser)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingSavePost.value = false
  }
}

const showCommentCreationTextArea = ref(false)
</script>

<style lang="scss" scoped>
.adjustToWidth {
  width: 90%;
}
</style>
