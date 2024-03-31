<template>
  <div>
    <v-list-item>
      <template #prepend>
        <user-avatar
          :src="props.comment.userData?.profilePhotoUrl"
        />
      </template>

      <v-list-item-title class="font-weight-medium">
        {{
          props.comment.removed
            ? 'Removed comment'
            : props.comment.userData?.name
        }}
      </v-list-item-title>

      <div>
        {{
          props.comment.removed
            ? 'The comment has been removed'
            : props.comment.content
        }}
      </div>

      <template v-if="!props.comment.removed" #append>
        <v-btn
          :loading="loadingLike"
          :icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
          color="secondary"
          variant="text"
          @click="isLiked ? handleUnlike() : handleLike()"
        />

        <v-btn
          :icon="showCommentCreationTextArea ? 'mdi-message' : 'mdi-message-outline'"
          color="secondary"
          variant="text"
          @click="showCommentCreationTextArea = !showCommentCreationTextArea"
        />

        <v-btn
          v-if="props.comment.authorId === accountStore.userId"
          icon="mdi-delete-outline"
          color="secondary"
          variant="text"
          @click="handleRemoveComment"
        />
      </template>
    </v-list-item>

    <div
      class="mt-5"
    >
      <comment-creation-form
        v-model:visible="showCommentCreationTextArea"
        v-model:comments="commentsModel"
        :in-reply-to="props.comment._id"
        :post="post"
        class="px-4"
      />

      <comments-list
        v-if="props.comment.replies.length > 0"
        v-model:comments="commentsModel"
        :formatted-comments="props.comment.replies"
        :level="props.level + 1"
        :post="post"
      />
    </div>

    <form-dialog
      v-model:open="commentRemovalConfirmDialogIsOpen"
      :payload="commentRemovalPayload"
      :cancel="cancelRemoveComment"
      :save="confirmRemoveComment"
      title="Remove comment"
      max-width="500"
    >
      <p>
        The comment will be removed. Do you want to continue?
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

<script setup lang="ts">
import { defineProps, ref, defineModel, computed } from 'vue'

import _ from 'lodash'

import { useAccountStore } from '@/store/account'

import { usePostsCrud } from '@/composables/usePostsCrud'

import CommentCreationForm from '@/components/commons/CommentsList/components/CommentCreationForm.vue'
import UserAvatar from '@/components/layouts/default/AppHeader/components/UserAvatar.vue'
import CommentsList from '@/components/commons/CommentsList/index.vue'
import FormDialog from '@/components/commons/FormDialog.vue'

import { defaultErrorHandling } from '@/utils/error'

import { type TFormattedPostCommentWithUserData, type IPost, type TPostCommentWithUserData } from '@/types/post'

const props = defineProps<{
  comment: TFormattedPostCommentWithUserData,
  level: number
  post: IPost
}>()

const accountStore = useAccountStore()

const isLiked = computed(() =>
  !!accountStore.userId &&
  props.comment.likedBy.includes(accountStore.userId),
)

const postsCrud = usePostsCrud()

const commentsModel = defineModel<TPostCommentWithUserData[]>('comments', { required: true })

const showCommentCreationTextArea = ref(false)

const commentRemovalConfirmDialogIsOpen = ref(false)
const commentRemovalPayload = ref<TFormattedPostCommentWithUserData | null>(null)

function updateCommentListItem (commentId: string, updatedComment: TPostCommentWithUserData) {
  const commentsArrClone = _.cloneDeep(commentsModel.value)

  const commentIndex = commentsArrClone.findIndex(comment => comment._id === commentId)

  if (commentIndex !== -1) {
    commentsArrClone[commentIndex] = updatedComment
    commentsModel.value = commentsArrClone
  }
}

function handleRemoveComment () {
  commentRemovalPayload.value = props.comment
  commentRemovalConfirmDialogIsOpen.value = true
}

async function confirmRemoveComment (data: TFormattedPostCommentWithUserData) {
  try {
    const updatedComment = await postsCrud.removeComent(props.post._id, data._id)

    updateCommentListItem(data._id, {
      ...data,
      ...updatedComment,
      userData: null,
    })
  } catch (err) {
    defaultErrorHandling(err)
  }
}

function cancelRemoveComment () {
  commentRemovalConfirmDialogIsOpen.value = false
}

const loadingLike = ref(false)

function getOriginalComment () {
  return {
    _id: props.comment._id,
    authorId: props.comment.authorId,
    content: props.comment.content,
    createdAt: props.comment.createdAt,
    inReplyTo: props.comment.inReplyTo,
    likedBy: props.comment.likedBy,
    removed: props.comment.removed,
    updatedAt: props.comment.updatedAt,
  }
}

async function handleLike () {
  try {
    loadingLike.value = true

    if (!accountStore.userId) {
      throw new Error('The user is not authenticated')
    }

    const updatedComment = await postsCrud.likeComment(props.post._id, accountStore.userId, getOriginalComment())

    updateCommentListItem(props.comment._id, {
      ...props.comment,
      ...updatedComment,
    })
  } catch (err) {
    defaultErrorHandling(err)
  } finally {
    loadingLike.value = false
  }
}

async function handleUnlike () {
  try {
    loadingLike.value = true

    if (!accountStore.userId) {
      throw new Error('The user is not authenticated')
    }

    const updatedComment = await postsCrud.unlikeComment(props.post._id, accountStore.userId, getOriginalComment())

    updateCommentListItem(props.comment._id, {
      ...props.comment,
      ...updatedComment,
    })
  } catch (err) {
    defaultErrorHandling(err)
  } finally {
    loadingLike.value = false
  }
}
</script>
