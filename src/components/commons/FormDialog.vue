<template>
  <v-dialog
    :model-value="openModel"
    max-width="700"
    v-bind="$attrs"
    @update:model-value="!$event && handleCancel()"
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="titleLetterSpacing font-weight-medium text-h5 ps-2">
          {{ title }}
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="handleCancel"
        />
      </v-card-title>

      <v-divider />

      <v-card-text class="normalLetterSpacing">
        <v-form
          v-model="validModel"
          @submit.prevent="handleSave"
        >
          <slot
            :valid="valid"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          :loading="loadingCancel"
          color="secondary"
          variant="text"
          @click="handleCancel"
        >
          Cancel
        </v-btn>

        <slot
          :valid="validModel"
          :loading="loadingSave"
          :save="handleSave"
          name="saveButton"
        >
          <v-btn
            :disabled="!validModel"
            :loading="loadingSave"
            color="secondary"
            variant="text"
            type="submit"
            @click="handleSave"
          >
            Save
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, ref } from 'vue'

import { usePopupStore } from '@/store/popup'

interface IProps <T = any> {
  payload: T
  title: string
  cancel?: () => Promise<void> | void
  save?: (payload: T) => Promise<void> | void
}

const props = defineProps<IProps>()

const popupStore = usePopupStore()

const openModel = defineModel<boolean>('open')
const validModel = defineModel<boolean>('valid')

const loadingCancel = ref(false)
const loadingSave = ref(false)

async function handleCancel () {
  try {
    loadingCancel.value = true

    await props.cancel?.()

    openModel.value = false
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  } finally {
    loadingCancel.value = false
  }
}

async function handleSave () {
  try {
    loadingSave.value = true

    await props.save?.(props.payload)

    openModel.value = false
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  } finally {
    loadingSave.value = false
  }
}
</script>
