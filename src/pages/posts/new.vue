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

      <default-editor
        v-model="content"
        class="tiptapPostEditor"
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

const content = ref('')

async function save () {
  const newId = `test-${(await postsCrud.list()).length}`

  await postsCrud.create({
    id: newId,

    title: `Test ${(await postsCrud.list()).length}`,
    description: '',

    content: content.value,

    createdAt: new Date(),

    tags: [],
  })

  await router.push(`/posts/${newId}`)
}
</script>
