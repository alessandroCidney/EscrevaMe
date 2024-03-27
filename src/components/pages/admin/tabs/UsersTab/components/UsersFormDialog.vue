<template>
  <form-dialog
    v-if="payloadModel"
    v-model:open="openModel"
    :payload="payloadModel"
    :save="props.save"
    title="New user"
  >
    <v-text-field
      v-model="payloadModel.name"
      :rules="[rules.required]"
      label="Name"
      variant="underlined"
    />

    <v-text-field
      v-model="payloadModel.email"
      :rules="[rules.required, rules.email]"
      label="Email"
      variant="underlined"
      type="email"
    />

    <v-text-field
      v-model="payloadModel.password"
      :rules="[rules.required, rules.password]"
      label="Password"
      variant="underlined"
      type="password"
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

import type { TPartialNewUser } from '@/types/user'

const openModel = defineModel<boolean>('open')
const payloadModel = defineModel<TPartialNewUser>('payload')

const rules = useRules()

interface IUsersFormDialogProps {
  save: (data: TPartialNewUser) => Promise<void>
}

const props = defineProps<IUsersFormDialogProps>()
</script>
