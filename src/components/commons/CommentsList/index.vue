<template>
  <v-list
    :style="{
      marginLeft: `${props.level * 10}px`
    }"
  >
    <comment-item
      v-for="comment in formattedCommentsList"
      :key="comment._id"
      v-model:comments="commentsModel"
      :comment="comment"
      :level="props.level"
      :post="post"
    />
  </v-list>
</template>

<script lang="ts" setup>
import { defineProps, computed, type PropType, defineModel } from 'vue'

import _ from 'lodash'

import CommentItem from './components/CommentItem.vue'

import { type IPost, type TFormattedPostCommentWithUserData, type TPostCommentWithUserData } from '@/types/post'

const props = defineProps({
  formattedComments: { type: Array as PropType<TFormattedPostCommentWithUserData[]>, default: undefined },
  level: { type: Number, default: 0 },
  post: { type: Object as PropType<IPost>, required: true },
})

const commentsModel = defineModel<TPostCommentWithUserData[]>('comments', { required: true })

const formattedCommentsList = computed(() => props.formattedComments ? props.formattedComments : formatComments(commentsModel.value))

function formatComments (commentsArr: TPostCommentWithUserData[] = []) {
  const commentsArrClone: TFormattedPostCommentWithUserData[] = _.cloneDeep(commentsArr).map(comment => ({
    ...comment,
    replies: [],
  }))

  commentsArrClone.forEach((commentClone) => {
    if (commentClone.inReplyTo) {
      const repliedComment = commentsArrClone.find(comment => comment._id === commentClone.inReplyTo)

      if (repliedComment) {
        repliedComment.replies.push(commentClone)
      }
    }
  })

  const rootComments = commentsArrClone.filter(comment => !comment.inReplyTo)

  return rootComments
}
</script>
