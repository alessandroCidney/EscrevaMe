<template>
  <div>
    <v-progress-linear
      v-if="loadingListUsers"
      color="secondary"
      indeterminate
    />

    <div class="d-flex align-center justify-space-between mt-3">
      <div>
        <h1 class="text-h5 font-weight-bold">
          Users
        </h1>

        <p class="text-subtitle-1 mb-10">
          Monitor registered users and configure access for each one.
        </p>
      </div>

      <div>
        <v-btn
          color="secondary"
          prepend-icon="mdi-plus"
          @click="openUsersFormDialog()"
        >
          New user
        </v-btn>
      </div>
    </div>

    <v-data-table
      :headers="[
        { title: 'Name', value: 'name' },
        { title: 'Role', value: 'role' },
        { title: 'Created at', value: 'createdAt' },
        { title: 'Identifier', value: '_id' },
        { title: 'Active', value: 'active' },
        { title: 'Actions', value: 'actions', align: 'center' },
      ]"
      :items="users"
    >
      <template #[`item.createdAt`]="item">
        {{ formatDate(item.value) }}
      </template>

      <template #[`item.active`]="item">
        <v-switch
          :model-value="item.value"
          color="primary"
          hide-details
        />
      </template>

      <template #[`item.actions`]="item">
        <v-btn
          color="secondary"
          icon="mdi-pencil"
          variant="text"
        />

        <v-btn
          color="secondary"
          icon="mdi-delete"
          variant="text"
        />
      </template>
    </v-data-table>

    <users-form-dialog
      v-model:open="usersFormDialogIsOpen"
      v-model:payload="usersFormDialogPayload"
    />
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'

import { ref, onMounted } from 'vue'

import UsersFormDialog from './components/UsersFormDialog.vue'

import { usePopupStore } from '@/store/popup'

import { useUsersCrud } from '@/composables/useUsersCrud'
import type { IDatabaseUser, TPartialNewUser } from '@/types/user'

const popupStore = usePopupStore()

const usersCrud = useUsersCrud()
const users = ref<IDatabaseUser[]>([])
const loadingListUsers = ref(false)

const usersFormDialogIsOpen = ref(false)
const usersFormDialogPayload = ref<TPartialNewUser | undefined>(undefined)

onMounted(() => {
  listUsers()
})

async function listUsers () {
  try {
    loadingListUsers.value = true

    users.value = await usersCrud.list()
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  } finally {
    loadingListUsers.value = false
  }
}

function openUsersFormDialog () {
  usersFormDialogPayload.value = {
    active: true,
    name: '',
    createdAt: new Date(),
    role: 'Viewer',
    email: '',
    password: '',
  }

  usersFormDialogIsOpen.value = true
}

function formatDate (date: Date) {
  return moment(date).format('LLL')
}
</script>
