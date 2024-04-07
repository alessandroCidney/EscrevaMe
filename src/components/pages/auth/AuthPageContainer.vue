<template>
  <v-row
    class="authPageContainer ma-0 filWidth fillHeight"
  >
    <v-col
      class="imageSection d-md-flex d-none bg-primary px-0 align-center justify-center"
      cols="6"
    >
      <div class="imageArea d-flex align-center justify-center">
        <slot name="image">
          <v-img
            src="@/assets/images/illustrations/wireframe.svg"
          />
        </slot>
      </div>
    </v-col>

    <v-col
      class="px-0 contentSection d-flex align-center justify-center flex-column"
      cols="12"
      md="6"
    >
      <slot />
    </v-col>
  </v-row>
</template>

<style lang="scss">
.authPageContainer {
  .imageSection {
    .imageArea {
      width: 600px;
      height: 600px;

      border-radius: 16px;

      background-color: rgb(var(--v-theme-primary));
    }
  }
}
</style>
