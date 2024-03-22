<template>
  <section class="postPage">
    <div class="postEditor">
      <div :style="{ width: '90%' }" class="d-flex align-center justify-space-between mb-6 px-5">
        <div class="d-flex align-center">
          <div class="mr-6">
            <v-menu>
              <template #activator="{ props, isActive }">
                <v-btn
                  width="150px"
                  color="#eee"
                  elevation="0"
                  :append-icon="isActive ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  v-bind="props"
                >
                  {{ selectedFormatOption?.title }}
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(formatOption, formatOptionIndex) in formatOptions"
                  :key="formatOptionIndex"
                  @click="formatOption.action"
                >
                  {{ formatOption.title }}
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <v-divider class="mx-5" vertical />

          <div class="d-flex align-center justify-start" :style="{ gap: '5px' }">
            <v-btn icon="mdi-format-bold" color="primary" variant="text" min-width="0" />

            <v-btn icon="mdi-format-italic" color="primary" variant="text" min-width="0" />

            <v-btn icon="mdi-format-underline" color="primary" variant="text" min-width="0" />
          </div>

          <v-divider class="mx-5" vertical />
        </div>

        <v-spacer />

        <v-btn
          color="primary"
          @click="save"
        >
          Save
        </v-btn>
      </div>

      <div :style="{ width: '90%' }">
        <v-text-field
          v-model="title"
          placeholder="Create a title for your new post"
          class="px-5 text-h4 postEditorTitle"
          variant="plain"
        />
      </div>

      <default-editor
        v-model:editor="tiptapEditor.editor"
        class="tiptapPostEditor"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, defineModel, computed } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import { useRouter } from '#imports'

import { useAccountStore } from '@/store/account'

import { usePostsCrud } from '@/composables/usePostsCrud'
import { useTiptapEditor } from '@/composables/useTiptapEditor'

import DefaultEditor from '@/components/commons/DefaultEditor.vue'

const contentModel = defineModel<string>({ default: '' })
const tiptapEditor = useTiptapEditor(contentModel)

const levelsArr: (1 | 2 | 3 | 4 | 5 | 6)[] = [1, 2, 3, 4, 5, 6]

const formatOptions = reactive([
  {
    title: 'Paragraph',
    action: () => tiptapEditor.setParagraph(),
    isActive: () => tiptapEditor.editor.value?.isActive('paragraph'),
  },
  ...(
    levelsArr.map(level => ({
      title: `Heading ${level}`,
      action: () => tiptapEditor.toggleHeading(level),
      isActive: () => tiptapEditor.editor.value?.isActive('heading', { level }),
    }))
  ),
])

const selectedFormatOption = computed(() => formatOptions.find(formatOption => formatOption.isActive()) || formatOptions[0])

const accountStore = useAccountStore()

const router = useRouter()

const postsCrud = usePostsCrud()

const title = ref('')

const photoFiles = ref<File[]>([])

async function save () {
  if (accountStore.authUser?.uid) {
    const postId = uuidv4()

    const savedPost = await postsCrud.createPost(
      postId,
      {
        _id: postId,

        title: title.value,
        description: '',

        content: contentModel.value,

        createdAt: new Date(),

        tags: [],

        authorId: accountStore.authUser?.uid,
      },
      photoFiles.value[0],
    )

    await router.push(`/posts/${savedPost._id}`)
  }
}

// function getFileUrl () {
//   return photoFiles.value?.length ? URL.createObjectURL(photoFiles.value[0]) : ''
// }
</script>

<style lang="scss">
.postEditorTitle {
  input {
    font-size: 30px !important;
  }
}
</style>
