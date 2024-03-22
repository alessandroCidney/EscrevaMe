<template>
  <section class="postPage">
    <div class="postEditor">
      <div
        v-if="photoFile"
        :style="{ width: 'calc(90% - 40px)', position: 'relative' }"
        class="mb-10"
      >
        <v-img
          :src="getFileUrl()"
          width="100%"
          height="450px"
          cover
        />

        <v-btn
          icon="mdi-close"
          position="absolute"
          location="top right"
          variant="text"
          color="white"
          class="ma-2"
          @click="photoFile = undefined"
        />
      </div>

      <div :style="{ width: '90%' }" class="d-flex align-center justify-space-between mb-6 px-5">
        <div class="d-flex align-center">
          <v-menu>
            <template #activator="{ props, isActive }">
              <v-btn
                width="150px"
                color="#eee"
                elevation="0"
                :append-icon="isActive ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                v-bind="props"
              >
                {{ selectedTextTypeOption?.title }}
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(textTypeOption, textTypeOptionIndex) in textTypeOptions"
                :key="textTypeOptionIndex"
                @click="textTypeOption.action"
              >
                {{ textTypeOption.title }}
              </v-list-item>
            </v-list>
          </v-menu>

          <v-divider class="ml-11 mr-5" vertical />

          <div class="d-flex align-center justify-start" :style="{ gap: '5px' }">
            <v-btn-toggle
              :model-value="selectedTextFormatOptions"
              multiple
            >
              <v-btn
                v-for="(textFormatOption, textFormatOptionIndex) in textFormatOptions"
                :key="textFormatOptionIndex"
                :icon="textFormatOption.icon"
                :value="textFormatOption.id"
                color="primary"
                variant="text"
                min-width="0"
                @click="textFormatOption.action"
              />
            </v-btn-toggle>
          </div>

          <v-divider class="mr-11 ml-5" vertical />

          <v-btn
            color="#eee"
            elevation="0"
            prepend-icon="mdi-image-plus"
            @click="handleSelectImage"
          >
            {{ photoFile ? 'Editar imagem' : 'Adicionar imagem' }}
          </v-btn>
        </div>

        <v-spacer />

        <v-btn
          color="primary"
          @click="save"
        >
          Save
        </v-btn>
      </div>

      <div :style="{ width: '90%' }">
        <v-text-field
          v-model="title"
          placeholder="Create a title for your new post"
          class="px-5 text-h4 postEditorTitle"
          variant="plain"
        />
      </div>

      <default-editor
        v-model:editor="tiptapEditor.editor"
        class="tiptapPostEditor"
      />
    </div>
  </section>
</template>

<script lang="ts">

</script>
