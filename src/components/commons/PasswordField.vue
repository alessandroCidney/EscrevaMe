<template>
  <v-text-field
    :type="showPassword ? 'text' : 'password'"
    class="passwordField"
    v-bind="$attrs"
  >
    <template #append-inner>
      <v-btn
        :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        variant="text"
        @click="showPassword = !showPassword"
      />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showPassword = ref(false)
</script>

<style lang="scss">
.passwordField {
  .v-field.v-field--appended {
    padding-right: 4px !important;
  }
}
</style>
