<template>
  <post-edit-page
    v-model:title="title"
    v-model:content="content"
    v-model:photo="photoFile"
    @save="save"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import { useRouter } from '#imports'

import { useAccountStore } from '@/store/account'

import { usePostsCrud } from '@/composables/usePostsCrud'

import PostEditPage from '@/components/pages/PostEditPage.vue'

const postsCrud = usePostsCrud()
const accountStore = useAccountStore()
const router = useRouter()

const title = ref('')
const content = ref('')
const photoFile = ref<File | undefined>(undefined)

async function save () {
  if (accountStore.authUser?.uid) {
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
      },
      photoFile.value,
    )

    await router.push(`/posts/${savedPost._id}`)
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
