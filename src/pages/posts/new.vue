<template>
  <section class="postCreationPage ">
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

import DefaultEditor from '@/components/commons/DefaultEditor.vue'

const content = ref('test')

function save () {
  console.log(content.value)
}
</script>

<style lang="scss">
.postCreationPage {
  min-height: calc(100vh - 64px);

  .postEditor {
    width: 70%;
    max-width: 1000px;

    min-height: calc(100vh);
    margin: 50px auto 0 auto;

    .tiptapPostEditor {
      width: 100%;
      min-height: calc(100vh);

      background-color: white;

      > div {
        padding: 20px !important;
        min-height: calc(100vh) !important;

        &:focus {
          outline: none !important;
        }
      }
    }
  }
}
</style>
