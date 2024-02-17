<template>
  <editor-content
    class="editorContentArea"
    :editor="editor"
  />
</template>

<script setup lang="ts">
import { defineModel, defineEmits, onMounted, onUnmounted, watch, defineProps } from 'vue'

import Placeholder from '@tiptap/extension-placeholder'
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
    Placeholder.configure({
      placeholder: 'Escreva aqui o conteúdo do seu post',
    }),
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

<style lang="scss">
.editorContentArea {
  width: 90% !important;

  .tiptap p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #9A9A9A;
    pointer-events: none;
    height: 0;
  }
}
</style>
