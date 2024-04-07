<template>
  <div class="indexPageStartArea d-flex align-center justify-center">
    <div class="fillWidth fillHeight imageBackground">
      <v-parallax
        src="@/assets/images/photos/writing_in_laptop.jpg"
        width="100%"
        height="100%"
      />
    </div>

    <v-row class="contentArea">
      <v-col
        class="d-flex align-md-start align-center justify-center flex-column px-16 text-md-left text-center"
        cols="12"
        md="6"
      >
        <h1 class="text-h2 font-weight-bold mb-5">
          Show your texts to the world
        </h1>

        <p class="text-h6 mb-10">
          Show your ideas to the whole world through posts and articles with escrevame and get free knowledge shared by the platform's community.
        </p>

        <v-btn
          width="300px"
          append-icon="mdi-arrow-right"
          color="white"
          variant="tonal"
          size="large"
          @click="$router.push('/auth/login')"
        >
          Join us
        </v-btn>
      </v-col>

      <v-col class="d-md-flex d-none" cols="6">
        <v-img
          src="@/assets/images/illustrations/landing_page_icon.svg"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.indexPageStartArea {
  height: 90vh;

  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-white));

  position: relative;

  .imageBackground {
    opacity: .15;

    position: absolute;
    z-index: 1;

    filter: blur(5px);
  }

  .contentArea {
    z-index: 2;

    max-width: 95vw;

    p {
      color: rgb(216, 216, 216);
    }
  }
}
</style>
