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

import { useRules } from '@/composables/useRules'

import { usePostsCrud } from '@/composables/usePostsCrud'

import { type IPost, type TPostCommentWithUserData } from '@/types/post'
import { defaultErrorHandling } from '@/utils/error'

const props = defineProps<{ post: IPost, inReplyTo?: string }>()

const rules = useRules()

const accountStore = useAccountStore()

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

    const newCommentId = uuidv4()

    const commentData = await postsCrud.createComment(props.post._id, newCommentId, {
      _id: newCommentId,
      authorId: accountStore.userId,
      content: newCommentText.value,
      inReplyTo: props.inReplyTo ?? null,
      removed: false,
      likedBy: [],
    })

    commentsModel.value.push({
      ...commentData,
      userData: accountStore.databaseUser,
    })

    newCommentText.value = ''
    visibleModel.value = false
  } catch (err) {
    defaultErrorHandling(err)
  } finally {
    loadingSaveComment.value = false
  }
}
</script>
