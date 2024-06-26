<template>
  <post-edit-page
    v-model:title="title"
    v-model:content="content"
    v-model:photo="photoFile"
    :initial-photo-url="null"
    @save="save"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import { useRouter, definePageMeta } from '#imports'

import { useMainStore } from '@/store/index'
import { useAccountStore } from '@/store/account'

import { usePostsCrud } from '@/composables/usePostsCrud'

import PostEditPage from '@/components/pages/PostEditPage.vue'

import { defaultErrorHandling } from '@/utils/error'

definePageMeta({
  requiresAuth: true,
})

const mainStore = useMainStore()
const accountStore = useAccountStore()

const postsCrud = usePostsCrud()
const router = useRouter()

const title = ref('')
const content = ref('')
const photoFile = ref<File | null>(null)

async function save () {
  try {
    mainStore.setOverlay(true)

    if (!accountStore.authUser?.uid) {
      throw new Error('The user is not authenticated')
    }

    const postId = uuidv4()

    const savedPost = await postsCrud.createPost(
      postId,
      {
        _id: postId,

        title: title.value,
        description: '',

        content: content.value,

        createdAt: new Date(),

        tags: [],

        authorId: accountStore.authUser?.uid,

        backgroundPhotoUrl: null,

        updatedAt: null,

        likedBy: [],

        private: false,
      },
      photoFile.value,
    )

    await router.push(`/posts/${savedPost._id}`)
  } catch (err) {
    defaultErrorHandling(err)
  } finally {
    mainStore.setOverlay(false)
  }
}
</script>

<style lang="scss">
.postEditorTitle {
  input {
    font-size: 30px !important;
  }
}
</style>
