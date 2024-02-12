<template>
  <section class="postPage">
    <div class="postEditor">
      <div class="d-flex align-center justify-end mb-6">
        <v-btn
          color="primary"
          variant="flat"
          @click="save"
        >
          Salvar
        </v-btn>
      </div>

      <v-text-field
        v-model="title"
        placeholder="Crie um título para seu novo post"
        class="bg-white px-5 mb-5 text-h4"
        variant="plain"
      />

      <default-editor
        v-model="content"
        class="tiptapPostEditor bg-white"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'

import { usePostsCrud } from '@/composables/usePostsCrud'

import DefaultEditor from '@/components/commons/DefaultEditor.vue'

const router = useRouter()

const postsCrud = usePostsCrud()

const title = ref('')
const content = ref('')

async function save () {
  const savedPost = await postsCrud.create({
    title: title.value,
    description: '',

    content: content.value,

    createdAt: new Date(),

    tags: [],
  })

  await router.push(`/posts/${savedPost._id}`)
}
</script>
