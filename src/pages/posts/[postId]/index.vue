<template>
  <section class="postPage">
    <div class="postEditor">
      <v-img
        :src="post.picture"
        class="mb-10"
      />

      <h1 class="pa-5 text-h4 font-weight-bold">
        {{ post.title }}
      </h1>

      <default-editor
        v-model="post.content"
        :editable="false"
        class="tiptapPostEditor"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from '#imports'
import { usePostsCrud } from '@/composables/usePostsCrud'

import DefaultEditor from '@/components/commons/DefaultEditor.vue'

const postsCrud = usePostsCrud()

const route = useRoute()

const post = await postsCrud.get(route.params.postId as string)

</script>

<style lang="scss" scoped>

</style>
