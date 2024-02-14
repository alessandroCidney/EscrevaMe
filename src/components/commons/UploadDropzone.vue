<template>
  <div
    :style="{
      backgroundImage: `url('${getFileUrl()}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center, center',
    }"
    class="d-flex align-center fillHeight"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @dragend="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <template v-if="!model?.length">
      <v-divider color="primary" :thickness="3" />

      <v-btn
        prepend-icon="mdi-image-plus"
        color="primary"
        class="mx-6"
        @click="fileInputRef?.click()"
      >
        Adicionar imagem
      </v-btn>

      <v-divider color="primary" :thickness="3" />

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

const model = defineModel<File[]>()

const props = defineProps({
  limit: { type: Number, default: undefined },
})

const fileInputRef = ref<HTMLInputElement | null>(null)

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

function getFileUrl () {
  return model.value?.length ? URL.createObjectURL(model.value[0]) : ''
}
</script>

<style lang="scss" scoped>
.uploadDropzone {
  border: 3px #ccc dashed;
  border-radius: 8px;
}
</style>
