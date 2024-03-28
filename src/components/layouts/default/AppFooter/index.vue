<template>
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
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { mobile: isMobile } = useDisplay()
</script>

<style lang="scss">
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
</style>
