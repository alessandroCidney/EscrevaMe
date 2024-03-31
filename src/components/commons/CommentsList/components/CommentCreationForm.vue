<template>
  <v-form
    v-if="visibleModel"
    v-model="validModel"
    class="mb-5"
    @submit.prevent="handleSaveComment"
  >
    <v-textarea
      v-model="newCommentText"
      :readonly="loadingSaveComment"
      :rules="[rules.required]"
      label="New comment"
      placeholder="Enter comment content"
      variant="underlined"
      class="mb-5"
    />

    <v-btn
      :loading="loadingSaveComment"
      :disabled="!validModel"
      color="secondary"
      type="submit"
      block
    >
      Save
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineModel } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { useAccountStore } from '@/store/account'
import { usePopupStore } from '@/store/popup'

import { useRules } from '@/composables/useRules'

import { usePostsCrud } from '@/composables/usePostsCrud'

import { type IPost, type TPostCommentWithUserData } from '@/types/post'

const props = defineProps<{ post: IPost, inReplyTo?: string }>()

const rules = useRules()

const accountStore = useAccountStore()
const popupStore = usePopupStore()

const postsCrud = usePostsCrud()

const commentsModel = defineModel<TPostCommentWithUserData[]>('comments', { required: true })
const visibleModel = defineModel<boolean>('visible')

const validModel = ref(false)
const loadingSaveComment = ref(false)
const newCommentText = ref('')

async function handleSaveComment () {
  try {
    loadingSaveComment.value = true

    if (!accountStore.userId || !accountStore.databaseUser) {
      throw new Error('The user is not authenticated')
    }

    const commentData = await postsCrud.createComment(
      props.post._id,
      uuidv4(),
      accountStore.userId,
      newCommentText.value,
      props.inReplyTo ?? null,
    )

    commentsModel.value.push({
      ...commentData,
      userData: accountStore.databaseUser,
    })

    newCommentText.value = ''
    visibleModel.value = false
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    } else {
      popupStore.showErrorPopup()
    }
  } finally {
    loadingSaveComment.value = false
  }
}
</script>
