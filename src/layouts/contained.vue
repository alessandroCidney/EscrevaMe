<template>
  <v-layout ref="app" class="containedLayout">
    <slot />
  </v-layout>
</template>

<style lang="scss" scoped>
.containedLayout {
  width: 100vw;
  height: 100vh;
}
</style>
