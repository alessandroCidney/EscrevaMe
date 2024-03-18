<template>
  <section class="postPage">
    <div class="postEditor pb-10">
      <h1 class="pa-5 mb-2 text-h4 font-weight-medium text-center">
        {{ post.title }}
      </h1>

      <div class="mb-14">
        {{ formatDate(post.createdAt) }}
      </div>

      <v-img
        :src="post.backgroundPhotoUrl"
        height="500px"
        width="100%"
        class="mb-10"
        cover
      />

      <default-editor
        v-model="post.content"
        :editable="false"
        class="tiptapPostEditor"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import moment from 'moment'

import { useRoute } from '#imports'
import { usePostsCrud } from '@/composables/usePostsCrud'

import DefaultEditor from '@/components/commons/DefaultEditor.vue'

const postsCrud = usePostsCrud()

const route = useRoute()

const post = await postsCrud.get(route.params.postId as string)

function formatDate (createdAt: Date) {
  return moment(createdAt).format('MMMM Do YYYY, h:mm a')
}
</script>

<style lang="scss" scoped>

</style>
