<template>
  <div
    class="uploadDropzone d-flex align-center justify-center py-5"
    v-bind="$attrs"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @dragend="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <v-icon>
      mdi-upload
    </v-icon>
  </div>

  <input :multiple="props.limit !== 1" type="file" @change="handleInput">
</template>

<script setup lang="ts">
import { defineModel, ref, defineProps } from 'vue'

const model = defineModel<File[]>()

const props = defineProps({
  limit: { type: Number, default: undefined },
})

const isDragging = ref(false)

function handleUpdate (files?: FileList) {
  if (files && (!props.limit || files?.length < props.limit)) {
    model.value = Array.from(files)
  }
}

function handleDrop (event: DragEvent) {
  handleUpdate(event.dataTransfer?.files)
}

function handleInput (event: Event) {
  if (event.target instanceof HTMLInputElement) {
    handleUpdate(event.target.files ?? undefined)
  }
}
</script>

<style lang="scss" scoped>
.uploadDropzone {
  border: 3px #ccc dashed;
  border-radius: 8px;
}
</style>
