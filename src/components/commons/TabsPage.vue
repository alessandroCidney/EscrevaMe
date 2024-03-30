<template>
  <div class="tabsPage py-10">
    <div
      :class="{
        'contentContainer px-16': true,
        'd-flex flex-md-row flex-column': !isMobile,
      }"
    >
      <v-tabs
        v-model="tabsPageTab"
        :direction="isMobile ? 'horizontal' : 'vertical'"
      >
        <slot name="tabs" />
      </v-tabs>

      <v-window
        v-model="tabsPageTab"
        class="py-5 py-md-0 px-10"
        :style="{ flex: '1 1 0', minHeight: '90vh' }"
      >
        <slot name="windows" />
      </v-window>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const tabsPageTab = ref<number | null>(null)

const { mobile: isMobile } = useDisplay()
</script>

<style lang="scss" scoped>
.tabsPage {
  .contentContainer {
    max-width: 1000px;

    margin: 0 auto;
  }
}
</style>
