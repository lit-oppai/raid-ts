import { createApp, App } from 'vue'
import '@style/style.css'
import primeStyle from './style/prime.ts'
import app from './App.vue'
import i18n from './i18n'
import router from '@pages/router.ts'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'

if (window.__POWERED_BY_WUJIE__) {
    let instance: App | undefined
    window.__WUJIE_MOUNT = () => {
        instance = createApp(app)
            .use(PrimeVue, {
                unstyled: true,
                pt: primeStyle // theme
                // pt: {}
            })
            .use(router)
            .use(i18n)
            .use(DialogService)
        instance.mount('#icewhale-settings-app')
    }
    window.__WUJIE_UNMOUNT = () => {
        instance && instance.unmount()
    }
} else {
    createApp(app)
        .use(PrimeVue, {
            unstyled: true,
            pt: primeStyle // theme
            // pt: {}
        })
        .use(router)
        .use(i18n)
        .use(DialogService)
        .mount('#icewhale-settings-app')
}
