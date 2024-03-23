<template>
  <post-edit-page
    v-model:title="title"
    v-model:content="content"
    v-model:photo="photoFile"
    :initial-photo-url="postData?.backgroundPhotoUrl"
    @save="save"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useRouter, useRoute } from '#imports'

import { useMainStore } from '@/store/index'
import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import { usePostsCrud } from '@/composables/usePostsCrud'

import PostEditPage from '@/components/pages/PostEditPage.vue'

import type { IPost } from '@/types/post'

const mainStore = useMainStore()
const accountStore = useAccountStore()
const popupStore = usePopupStore()

const router = useRouter()
const route = useRoute()

const postsCrud = usePostsCrud()

const postData = ref<IPost | undefined>(undefined)

const title = ref('')
const content = ref('')
const photoFile = ref<File | undefined>(undefined)

onMounted(async () => {
  await getPost()
})

async function getPost () {
  postData.value = await postsCrud.get(route.params.postId as string)

  title.value = postData.value.title
  content.value = postData.value.content
}

async function save () {
  try {
    mainStore.setOverlay(true)

    if (!accountStore.authUser?.uid) {
      throw new Error('The user is not authenticated')
    }

    if (!postData.value?._id) {
      throw new Error('Unable to find post data')
    }

    await postsCrud.updatePost(
      postData.value._id,
      {
        title: title.value,
        description: '',

        content: content.value,

        updatedAt: new Date(),

        tags: [],
      },
      photoFile.value,
    )

    await router.push(`/posts/${postData.value?._id}`)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
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
