<template>
  <section class="postPage">
    <div class="postEditor">
      <div
        v-if="photoFile ?? props.initialPhotoUrl"
        :style="{ width: 'calc(90% - 40px)', position: 'relative' }"
        class="mb-10"
      >
        <v-img
          :src="getFileUrl() || (props.initialPhotoUrl ?? undefined)"
          width="100%"
          height="450px"
          cover
        />

        <v-btn
          icon="mdi-close"
          position="absolute"
          location="top right"
          variant="text"
          color="white"
          class="ma-2"
          @click="photoFile = null"
        />
      </div>

      <div :style="{ width: '90%' }" class="d-flex align-center justify-space-between mb-6 px-5">
        <div class="d-flex align-center">
          <v-menu>
            <template #activator="{ props: menuProps, isActive }">
              <v-btn
                width="150px"
                color="#eee"
                elevation="0"
                :append-icon="isActive ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                v-bind="menuProps"
              >
                {{ selectedTextTypeOption?.title }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(textTypeOption, textTypeOptionIndex) in textTypeOptions"
                :key="textTypeOptionIndex"
                @click="textTypeOption.action"
              >
                {{ textTypeOption.title }}
              </v-list-item>
            </v-list>
          </v-menu>

          <v-divider class="ml-11 mr-5" vertical />

          <div class="d-flex align-center justify-start" :style="{ gap: '5px' }">
            <v-btn-toggle
              :model-value="selectedTextFormatOptions"
              multiple
            >
              <v-btn
                v-for="(textFormatOption, textFormatOptionIndex) in textFormatOptions"
                :key="textFormatOptionIndex"
                :icon="textFormatOption.icon"
                :value="textFormatOption.id"
                color="primary"
                variant="text"
                min-width="0"
                @click="textFormatOption.action"
              />
            </v-btn-toggle>
          </div>

          <v-divider class="mr-11 ml-5" vertical />

          <v-btn
            v-if="allowImages"
            color="#eee"
            elevation="0"
            prepend-icon="mdi-image-plus"
            @click="handleSelectImage"
          >
            {{ (photoFile ?? props.initialPhotoUrl) ? 'Edit image' : 'Add image' }}
          </v-btn>
        </div>

        <v-spacer />

        <v-btn
          color="secondary"
          @click="emit('save')"
        >
          Save
        </v-btn>
      </div>

      <div :style="{ width: '90%' }">
        <v-text-field
          v-model="title"
          :readonly="readonlyTitle"
          placeholder="Create a title for your new post"
          class="px-5 text-h4 postEditorTitle font-weight-bold"
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

<script lang="ts" setup>
import { reactive, defineModel, computed, defineEmits, defineProps, type PropType } from 'vue'

import { useTiptapEditor } from '@/composables/useTiptapEditor'

import DefaultEditor from '@/components/commons/DefaultEditor.vue'

import { selectFile } from '@/utils'

const emit = defineEmits(['save'])

const props = defineProps({
  initialPhotoUrl: { type: String as PropType<string | null>, default: null },
  allowImages: { type: Boolean, default: true },
  readonlyTitle: Boolean,
})

const title = defineModel<string>('title')
const contentModel = defineModel<string>('content', { default: '' })
const photoFile = defineModel<File | null>('photo', { default: null })

const tiptapEditor = useTiptapEditor(contentModel)

const levelsArr: (1 | 2 | 3 | 4 | 5 | 6)[] = [1, 2, 3, 4, 5, 6]

const textTypeOptions = reactive([
  {
    title: 'Paragraph',
    isActive: () => tiptapEditor.editor.value?.isActive('paragraph'),
    action: () => tiptapEditor.setParagraph(),
  },
  ...(
    levelsArr.map(level => ({
      title: `Heading ${level}`,
      isActive: () => tiptapEditor.editor.value?.isActive('heading', { level }),
      action: () => tiptapEditor.toggleHeading(level),
    }))
  ),
])

const selectedTextTypeOption = computed(() => textTypeOptions.find(textTypeOption => textTypeOption.isActive()) || textTypeOptions[0])

const textFormatOptions = reactive([
  {
    id: 'bold',
    title: 'Bold',
    icon: 'mdi-format-bold',
    isActive: () => tiptapEditor.editor.value?.isActive('bold'),
    action: () => tiptapEditor.toggleBold(),
  },
  {
    id: 'italic',
    title: 'Italic',
    icon: 'mdi-format-italic',
    isActive: () => tiptapEditor.editor.value?.isActive('italic'),
    action: () => tiptapEditor.toggleItalic(),
  },
  {
    id: 'codeBlock',
    title: 'Code',
    icon: 'mdi-code-tags',
    isActive: () => tiptapEditor.editor.value?.isActive('codeBlock'),
    action: () => tiptapEditor.toggleCodeBlock(),
  },
])

const selectedTextFormatOptions = computed(
  () => textFormatOptions
    .filter(textFormatOption => textFormatOption.isActive())
    .map(textFormatOption => textFormatOption.id),
)

function handleSelectImage () {
  selectFile((file) => {
    photoFile.value = file
  })
}

function getFileUrl () {
  return photoFile.value ? URL.createObjectURL(photoFile.value) : ''
}
</script>
