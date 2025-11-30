/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { createSSRApp, h, type DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

// 🔹 PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// 🔹 PrimeVue Directives (important pour v-styleclass)
import StyleClass from 'primevue/styleclass'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp<DefineComponent>({
  progress: { color: '#5468FF' },
  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue')
    
    const page = await resolvePageComponent(`../pages/${name}.vue`, pages)
    
    return page
  },

  setup({ el, App, props, plugin }) {
    const vueApp = createSSRApp({ render: () => h(App, props) })

    vueApp
      .use(plugin)
      .use(PrimeVue, {
        theme: {
          preset: Aura,
        },
      })
      // 🔹 Enregistrer la directive StyleClass
      .directive('styleclass', StyleClass)

    return vueApp.mount(el)
  },
})