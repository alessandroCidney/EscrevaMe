<template>
  <v-layout ref="app" class="clearLayout flex-column">
    <slot />
  </v-layout>
</template>

<style lang="scss" scoped>
.clearLayout {
  width: 100vw;
  min-height: 100vh;
}
</style>
