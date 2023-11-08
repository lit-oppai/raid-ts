import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'
import router from './pages/router.ts'
import PrimeVue from 'primevue/config'

createApp(App).use(PrimeVue, { unstyled: true }).use(router).use(i18n).mount('#app')
