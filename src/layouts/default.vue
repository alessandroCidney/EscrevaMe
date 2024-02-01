<template>
  <v-layout ref="app" class="defaultLayout">
    <v-app-bar name="app-bar" class="appBar" flat>
      <template #prepend>
        <v-btn
          icon="mdi-menu"
        />
      </template>

      <h1 class="logoArea text-primary">escreva.me</h1>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>

<style lang="scss">
.defaultLayout {
  .appBar {
    border-bottom: 1px solid rgb(219, 219, 219);
    position: relative;

    background-color: rgb(255, 255, 255, .9) !important;
    backdrop-filter: blur(5px);

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

      .logoArea {
        font-weight: bold;
        font-size: 24px;
      }
    }
  }
}
</style>