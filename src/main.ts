import { createApp } from 'vue'
import '@style/style.css'
import primeStyle from './style/prime.ts'
import app from './App.vue'
import i18n from './i18n'
import router from '@pages/router.ts'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';

createApp(app)
    .use(PrimeVue, {
        unstyled: true,
        pt: primeStyle // theme
        // pt: {}
    })
    .use(router)
    .use(i18n)
    .use(DialogService)
    .use(ToastService)
    .mount('#icewhale-settings-app')
