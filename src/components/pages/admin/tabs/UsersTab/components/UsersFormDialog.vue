<template>
  <form-dialog
    v-if="payloadModel"
    v-model:open="openModel"
    :payload="payloadModel"
    :save="handleSave"
    title="New user"
  >
    <v-text-field
      v-model="payloadModel.name"
      label="Name"
      variant="underlined"
    />

    <v-text-field
      v-model="payloadModel.email"
      label="Email"
      variant="underlined"
      type="email"
    />

    <v-text-field
      v-model="payloadModel.password"
      label="Password"
      variant="underlined"
      type="password"
    />

    <v-select
      v-model="payloadModel.role"
      label="Role"
      :items="[
        'Viewer',
        'Admin',
      ]"
      variant="underlined"
    />
  </form-dialog>
</template>

<script lang="ts" setup>
import { defineModel } from 'vue'

import { usePopupStore } from '@/store/popup'

import FormDialog from '@/components/commons/FormDialog.vue'

import { useUsersCrud } from '@/composables/useUsersCrud'

import type { TPartialNewUser } from '@/types/user'

const openModel = defineModel<boolean>('open')
const payloadModel = defineModel<TPartialNewUser>('payload')

const popupStore = usePopupStore()

const usersCrud = useUsersCrud()

async function handleSave (data: TPartialNewUser) {
  try {
    await usersCrud.create(data)
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  }
}
</script>
