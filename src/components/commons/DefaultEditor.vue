<template>
  <editor-content
    class="editorContentArea"
    :editor="editorModel?.value"
  />
</template>

<script setup lang="ts">
import { defineModel, type ShallowRef } from 'vue'

import { EditorContent, Editor } from '@tiptap/vue-3'

const editorModel = defineModel<ShallowRef<Editor | undefined>>('editor')
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
