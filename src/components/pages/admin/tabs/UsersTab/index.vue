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
          @click="handleCreate()"
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
          @click.prevent="handleUpdateActive(item.item)"
        />
      </template>

      <template #[`item.actions`]="item">
        <v-btn
          color="secondary"
          icon="mdi-pencil"
          variant="text"
          @click="handleEdit(item.item)"
        />

        <v-btn
          color="secondary"
          icon="mdi-delete"
          variant="text"
          @click="handleRemove(item.item)"
        />
      </template>
    </v-data-table>

    <users-creation-dialog
      v-model:open="usersCreationDialogIsOpen"
      v-model:payload="usersCreationPayload"
      :save="confirmCreate"
      :cancel="cancelCreate"
    />

    <users-edition-dialog
      v-model:open="usersEditionDialogIsOpen"
      v-model:payload="usersEditionPayload"
      :save="confirmEdit"
      :cancel="cancelEdit"
    />

    <form-dialog
      v-model:open="usersConfirmUpdateActiveDialogIsOpen"
      :payload="usersUpdateActivePayload"
      :cancel="cancelUpdateActive"
      :save="confirmUpdateActive"
      :title="`${ usersUpdateActivePayload?.active ? 'Enable' : 'Disable' } user`"
      max-width="500"
    >
      <p>
        The user will be {{ usersUpdateActivePayload?.active ? 'enabled' : 'disabled' }}
        and will {{ usersUpdateActivePayload?.active ? 'gain' : 'lose' }} access to the application.
        Do you want to continue?
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

import UsersCreationDialog from './components/UsersCreationDialog.vue'
import UsersEditionDialog from './components/UsersEditionDialog.vue'
import FormDialog from '@/components/commons/FormDialog.vue'

import { usePopupStore } from '@/store/popup'

import { useUsersCrud } from '@/composables/useUsersCrud'
import type { IDatabaseUser, TPartialNewUser } from '@/types/user'

import { removeObjectEmptyValues, wait } from '@/utils/index'

const popupStore = usePopupStore()

const usersCrud = useUsersCrud()
const users = ref<IDatabaseUser[]>([])
const loadingListUsers = ref(false)

const usersCreationDialogIsOpen = ref(false)
const usersCreationPayload = ref<TPartialNewUser | null>(null)

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

function handleCreate () {
  usersCreationPayload.value = {
    active: true,
    name: '',
    createdAt: new Date(),
    role: 'Viewer',
    email: '',
    password: '',
  }

  usersCreationDialogIsOpen.value = true
}

async function confirmCreate (data: TPartialNewUser) {
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

function cancelCreate () {
  usersCreationDialogIsOpen.value = true
}

const usersEditionDialogIsOpen = ref(false)
const usersEditionPayload = ref<IDatabaseUser | null>(null)

function handleEdit (data: IDatabaseUser) {
  usersEditionPayload.value = removeObjectEmptyValues({ ...data })
  usersEditionDialogIsOpen.value = true
}

async function confirmEdit (data: IDatabaseUser) {
  try {
    const savedUser = await usersCrud.update(data._id, data)

    const itemIndex = users.value.findIndex(item => item._id === data._id)

    users.value[itemIndex] = { ...users.value[itemIndex], ...savedUser }

    popupStore.showSuccessPopup('User updated successfully')
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  }
}

function cancelEdit () {
  usersEditionDialogIsOpen.value = false
}

const usersConfirmUpdateActiveDialogIsOpen = ref(false)
const usersUpdateActivePayload = ref<IDatabaseUser | null>(null)

function handleUpdateActive (data: IDatabaseUser) {
  usersUpdateActivePayload.value = removeObjectEmptyValues({ ...data, active: !data.active })
  usersConfirmUpdateActiveDialogIsOpen.value = true
}

async function confirmUpdateActive (data: IDatabaseUser) {
  await confirmEdit(data)
}

async function cancelUpdateActive () {
  usersConfirmUpdateActiveDialogIsOpen.value = false
  await wait(200)
  usersUpdateActivePayload.value = null
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
  usersConfirmRemovalDialogIsOpen.value = false
}

function formatDate (date: Date) {
  return moment(date).format('LLL')
}
</script>
