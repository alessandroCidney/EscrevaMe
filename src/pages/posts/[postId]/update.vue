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

import { useAccountStore } from '@/store/account'

import { usePostsCrud } from '@/composables/usePostsCrud'

import PostEditPage from '@/components/pages/PostEditPage.vue'

import type { IPost } from '@/types/post'

const accountStore = useAccountStore()

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
  if (accountStore.authUser?.uid && postData.value?._id) {
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
