<template>
  <v-layout ref="app" class="clearLayout">
    <slot />
  </v-layout>
</template>

<style lang="scss" scoped>
.clearLayout {
  width: 100vw;
  height: 100vh;
}
</style>
