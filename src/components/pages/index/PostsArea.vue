<template>
  <div class="indexPagePostsArea">
    <div class="contentContainer">
      <div class="titleArea mb-10">
        <h2 class="text-h4 mb-5 font-weight-bold">
          Posts recentes
        </h2>

        <v-divider />
      </div>

      <div class="postsListArea">
        <post-list
          :posts="posts"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/index'
import { usePopupStore } from '@/store/popup'

import PostList from '@/components/commons/PostList/index.vue'

import { usePostsCrud } from '@/composables/usePostsCrud'
import type { IPost } from '@/types/post'

const mainStore = useMainStore()
const popupStore = usePopupStore()

const postsCrud = usePostsCrud()

const posts = ref<IPost[]>([])

const loadingPosts = ref(false)

async function listPosts () {
  try {
    loadingPosts.value = true
    mainStore.setOverlay(true)

    posts.value = await postsCrud.listPublicPosts()
  } catch (err) {
    if (err instanceof Error) {
      popupStore.showErrorPopup(err.message)
    }
  } finally {
    loadingPosts.value = false
    mainStore.setOverlay(false)
  }
}

onMounted(() => {
  listPosts()
})
</script>

<style lang="scss" scoped>
.indexPagePostsArea {
  padding: 100px 0;

  .contentContainer {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
