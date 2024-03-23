<template>
  <section class="postPage">
    <div class="postEditor pb-10">
      <v-img
        :src="post.backgroundPhotoUrl"
        height="400px"
        width="calc(90% - 40px)"
        class="mb-10"
        cover
      />

      <div
        :style="{
          width: '90%'
        }"
        class="text-left px-5 d-flex align-center justify-space-between"
      >
        <div>
          Nome do Autor - {{ formatDate(post.createdAt) }}
        </div>

        <div v-if="accountStore.userId === post.authorId">
          <v-btn
            icon="mdi-pencil"
            variant="text"
            size="small"
            @click="$router.push(`/posts/${post._id}/update`)"
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
import { defineModel, ref } from 'vue'

import moment from 'moment'

import { useAccountStore } from '@/store/account'

import { useRoute, definePageMeta } from '#imports'
import { usePostsCrud } from '@/composables/usePostsCrud'
import { useTiptapEditor } from '@/composables/useTiptapEditor'

import DefaultEditor from '@/components/commons/DefaultEditor.vue'

definePageMeta({
  requiresAuth: true,
})

const accountStore = useAccountStore()

const postsCrud = usePostsCrud()

const route = useRoute()

const post = ref(await postsCrud.get(route.params.postId as string))

const titleModel = defineModel<string>('title', { default: '' })
const contentModel = defineModel<string>('content', { default: '' })

titleModel.value = post.value.title
contentModel.value = post.value.content

const tiptapEditor = useTiptapEditor(contentModel, { editable: false })

function formatDate (createdAt: Date) {
  return moment(createdAt).format('MMMM Do YYYY, h:mm a')
}
</script>

<style lang="scss" scoped>

</style>
