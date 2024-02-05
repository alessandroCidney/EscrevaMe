<template>
  <editor-content
    :editor="editor"
  />
</template>

<script setup lang="ts">
import { defineModel, defineEmits, onMounted, onUnmounted, watch, defineProps } from 'vue'

import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const model = defineModel<string>({ default: '' })
const emit = defineEmits(['update:modelValue'])

const props = defineProps({ editable: { type: Boolean, default: true } })

const editor = useEditor({
  content: model.value,

  editable: props.editable,

  extensions: [
    StarterKit,
  ],

  onUpdate () {
    emit('update:modelValue', editor.value?.getHTML() ?? '')
  },
})

onMounted(() => {
  editor.value?.commands.setContent(model.value, false)
})

watch(model, (value = '') => {
  const isSame = editor.value?.getHTML() === value

  if (isSame) {
    return
  }

  editor.value?.commands.setContent(value, false)
})

onUnmounted(() => {
  editor.value?.destroy()
})
</script>
