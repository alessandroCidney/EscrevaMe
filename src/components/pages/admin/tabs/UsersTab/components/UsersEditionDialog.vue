<template>
  <form-dialog
    v-if="payloadModel"
    v-model:open="openModel"
    :payload="payloadModel"
    :save="props.save"
    :cancel="props.cancel"
    title="New user"
  >
    <v-text-field
      v-model="payloadModel.name"
      :rules="[rules.required]"
      label="Name"
      variant="underlined"
    />

    <v-select
      v-model="payloadModel.role"
      :rules="[rules.required]"
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
import { defineModel, defineProps } from 'vue'

import { useRules } from '@/composables/useRules'

import FormDialog from '@/components/commons/FormDialog.vue'

import type { IDatabaseUser } from '@/types/user'

const openModel = defineModel<boolean>('open')
const payloadModel = defineModel<IDatabaseUser | null>('payload', { default: null })

const rules = useRules()

interface IUsersFormDialogProps {
  save: (data: IDatabaseUser) => Promise<void>
  cancel: () => Promise<void> | void
}

const props = defineProps<IUsersFormDialogProps>()
</script>
