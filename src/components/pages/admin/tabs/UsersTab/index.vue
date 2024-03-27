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
          @click="handleRemove(item.item)"
        />
      </template>
    </v-data-table>

    <users-form-dialog
      v-model:open="usersFormDialogIsOpen"
      v-model:payload="usersFormDialogPayload"
      :save="handleSave"
    />

    <form-dialog
      v-model:open="usersConfirmRemovalDialogIsOpen"
      :payload="usersRemovalPayload"
      :cancel="cancelRemove"
      :save="confirmRemove"
      title="Remove user"
      max-width="500"
    >
      <p>
        The user will be removed and will lose access to the application. Do you want to continue?
      </p>

      <template #saveButton="{ loading, save }">
        <v-btn
          :loading="loading"
          color="secondary"
          variant="text"
          type="submit"
          @click="save"
        >
          Continue
        </v-btn>
      </template>
    </form-dialog>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'

import { ref, onMounted } from 'vue'

import UsersFormDialog from './components/UsersFormDialog.vue'
import FormDialog from '@/components/commons/FormDialog.vue'

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

async function handleSave (data: TPartialNewUser) {
  try {
    const savedUser = await usersCrud.create(data)

    users.value.push(savedUser)

    popupStore.showSuccessPopup('User created successfully')
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  }
}

const usersConfirmRemovalDialogIsOpen = ref(false)
const usersRemovalPayload = ref<IDatabaseUser | null>(null)

function handleRemove (data: IDatabaseUser) {
  usersRemovalPayload.value = data
  usersConfirmRemovalDialogIsOpen.value = true
}

async function confirmRemove (data: IDatabaseUser) {
  try {
    await usersCrud.remove(data._id)

    const itemIndex = users.value.findIndex(item => item._id === data._id)

    users.value.splice(itemIndex, 1)

    popupStore.showSuccessPopup('User removed successfully')
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  }
}

function cancelRemove () {
  usersRemovalPayload.value = null
  usersConfirmRemovalDialogIsOpen.value = false
}

function formatDate (date: Date) {
  return moment(date).format('LLL')
}
</script>
