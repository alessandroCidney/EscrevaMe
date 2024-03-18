<template>
  <div
    :style="{
      backgroundImage: `url('${backgroundImageModel}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center, center',
      height: backgroundImageModel ? '400px' : 'auto',
    }"
    class="d-flex align-center fillWidth"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @dragend="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <template v-if="!backgroundImage">
      <v-btn
        prepend-icon="mdi-image-plus"
        color="#eee"
        elevation="0"
        class="mx-6"
        block
        @click="fileInputRef?.click()"
      >
        Adicionar imagem
      </v-btn>

      <input
        v-show="false"
        ref="fileInputRef"
        :multiple="props.limit !== 1"
        type="file"
        @change="handleInput"
      >
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineModel, ref, defineProps } from 'vue'

const filesModel = defineModel<File[]>('files')

const backgroundImageModel = defineModel<string | undefined>('backgroundImage')

const props = defineProps({
  limit: { type: Number, default: undefined },
})

const fileInputRef = ref<HTMLInputElement | null>(null)

const isDragging = ref(false)

function handleUpdate (files?: FileList) {
  if (files && (!props.limit || files?.length < props.limit)) {
    filesModel.value = Array.from(files)
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
