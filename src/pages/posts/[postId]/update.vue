<template>
  <section class="postPage">
    <div class="postEditor">
      <div :style="{ height: photoFiles.length ? '200px' : '50px' }" class="mb-5 px-5">
        <v-hover>
          <template #default="{ isHovering, props }">
            <div class="fillHeight" v-bind="props">
              <v-fade-transition hide-on-leave>
                <upload-dropzone
                  v-if="isHovering || photoFiles.length"
                  v-model:files="photoFiles"
                  :background-image="getPostBackgroundImage()"
                  class="mb-10"
                />
              </v-fade-transition>
            </div>
          </template>
        </v-hover>
      </div>

      <div class="d-flex align-center mb-6 px-5 test">
        <div class="mr-6">
          <v-btn width="160px" variant="flat" color="#eee">
            Parágrafo

            <template #append>
              <v-icon size="small">
                mdi-chevron-down
              </v-icon>
            </template>
          </v-btn>
        </div>

        <v-divider class="mx-5" vertical />

        <div class="d-flex align-center justify-start" :style="{ gap: '5px' }">
          <v-btn icon="mdi-format-bold" color="primary" variant="text" min-width="0" />

          <v-btn icon="mdi-format-italic" color="primary" variant="text" min-width="0" />

          <v-btn icon="mdi-format-underline" color="primary" variant="text" min-width="0" />
        </div>

        <v-divider class="mx-5" vertical />

        <v-spacer />

        <v-btn
          color="primary"
          @click="save"
        >
          Salvar
        </v-btn>
      </div>

      <v-text-field
        v-model="title"
        placeholder="Crie um título para seu novo post"
        class="px-5 text-h4 postEditorTitle"
        variant="plain"
      />

      <default-editor
        v-model="content"
        class="tiptapPostEditor"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useRouter, useRoute } from '#imports'

import { useAccountStore } from '@/store/account'

import { usePostsCrud } from '@/composables/usePostsCrud'

import DefaultEditor from '@/components/commons/DefaultEditor.vue'
import UploadDropzone from '@/components/commons/UploadDropzone.vue'

import type { IPost } from '@/types/post'

const accountStore = useAccountStore()

const router = useRouter()
const route = useRoute()

const postsCrud = usePostsCrud()

const postData = ref<IPost | undefined>(undefined)

const title = ref('')
const content = ref('')

const photoFiles = ref<File[]>([])

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
      photoFiles.value[0],
    )

    await router.push(`/posts/${postData.value?._id}`)
  }
}

function getPostBackgroundImage () {
  if (photoFiles.value.length > 0) {
    return URL.createObjectURL(photoFiles.value[0])
  }

  return postData.value?.backgroundPhotoUrl
}
</script>

<style lang="scss">
.postEditorTitle {
  input {
    font-size: 30px !important;
  }
}
</style>
