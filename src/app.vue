<template>
  <nuxt-layout>
    <nuxt-page />

    <v-overlay
      :model-value="mainStore.appOverlay"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        color="white"
        size="150"
        indeterminate
      />
    </v-overlay>

    <v-snackbar
      :model-value="popupStore.active"
      :color="popupStore.type"
      @update:model-value="!$event && popupStore.closePopup()"
    >
      <div class="d-flex align-center justify-start">
        <v-icon
          color="white"
          class="mr-2"
        >
          {{ popupStore.icons[popupStore.type] }}
        </v-icon>

        <div>
          {{ popupStore.message }}
        </div>
      </div>

      <template #actions>
        <v-btn
          color="white"
          variant="text"
          @click="popupStore.closePopup()"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </nuxt-layout>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/index'
import { usePopupStore } from '@/store/popup'

const mainStore = useMainStore()
const popupStore = usePopupStore()
</script>
