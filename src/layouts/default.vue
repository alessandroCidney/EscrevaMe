<template>
  <v-layout
    ref="app"
    :class="{
      'defaultLayout flex-column': true,
    }"
  >
    <top-bar />

    <v-main>
      <slot />
    </v-main>

    <v-footer class="footerContainer py-16">
      <div
        :class="{
          'footerContent d-flex align-start justify-center flex-md-row flex-column': true,
          isMobile,
        }"
      >
        <div :class="{ 'footerSection text-md-left text-center': true, isMobile }">
          <div class="footerSectionTitle mb-1">
            <v-img
              src="@/assets/images/logos/white_logo.svg"
              width="130px"
              height="25px"
              class="footerLogo"
            />
          </div>

          <div>Alessandro Cídney &copy; 2024 - Todos os direitos reservados</div>
        </div>

        <div :class="{ 'footerSection text-md-left text-center': true, isMobile }">
          <div class="footerSectionTitle text-h6 font-weight-bold">
            Contato
          </div>

          <ul>
            <li>
              preencherdepois@exemplo.com
            </li>
          </ul>
        </div>

        <div :class="{ 'footerSection text-md-left text-center': true, isMobile }">
          <div class="footerSectionTitle text-h6 font-weight-bold">
            Redes Sociais
          </div>

          <div>
            <v-btn
              href="https://www.linkedin.com/in/acidn/"
              target="_blank"
              icon="mdi-linkedin"
              color="white"
              variant="text"
            />

            <v-btn
              href="https://instagram.com/a_cidn"
              target="_blank"
              icon="mdi-instagram"
              color="white"
              variant="text"
            />

            <v-btn
              href="https://github.com/alessandroCidney"
              target="_blank"
              icon="mdi-github"
              color="white"
              variant="text"
            />
          </div>
        </div>
      </div>
    </v-footer>
  </v-layout>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

import TopBar from '@/components/layouts/TopBar/index.vue'

const { mobile: isMobile } = useDisplay()
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

  .footerContainer {
    background-color: rgb(var(--v-theme-black-lighten-1));
    color: rgb(var(--v-theme-white));

    max-height: 500px;

    .footerContent {
      max-width: 1200px;

      margin: 0 auto;

      gap: 100px;

      &.isMobile {
        gap: 50px;

        .footerLogo {
          margin: 0 auto;
        }
      }

      .footerSection {
        max-width: calc(100% / 3);

        &.isMobile {
          margin: 0 auto;
          max-width: 100%;
        }

        .footerSectionTitle {
          height: 30px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
