<template>
  <v-layout
    ref="app"
    :class="{
      'defaultLayout flex-column': true,
    }"
  >
    <app-header />

    <v-main>
      <slot />
    </v-main>

    <app-footer />
  </v-layout>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layouts/default/AppHeader/index.vue'
import AppFooter from '@/components/layouts/default/AppFooter/index.vue'
</script>

<style lang="scss">
.defaultLayout {
  min-height: 100vh;

  .appBar {
    // border-bottom: 1px solid rgb(219, 219, 219);
    position: relative;

    background-color: rgb(var(--v-theme-white)) !important;

    border-bottom: 1px solid #e5e5e5;
    // backdrop-filter: blur(5px);

    > .v-toolbar__content {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      .v-toolbar__prepend {
        margin-inline: 0 0 !important;

        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      .v-toolbar__append {
        margin-inline: 0 0 !important;

        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      .logoArea {
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
}
</style>
