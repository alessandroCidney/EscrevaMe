import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme: {
          dark: false,
          colors: {
            primary: '#0A014F',

            white: '#FFFFFF',

            black: '#000000',
            'black-lighten-1': '#212121',

            error: '#ff4545',
          },
        },
      },
    },
  })

  app.vueApp.use(vuetify)
})
