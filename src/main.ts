import { createApp }       from 'vue'
import '@style/style.css'
import primeStyle          from './style/prime.ts'
// import { prime } from '@icewhale/ui-styles'
import app                 from './App.vue'
import { createPinia }     from "pinia";
import i18n                from './i18n'
import router              from '@pages/router.ts'
import PrimeVue            from 'primevue/config'
import DialogService       from 'primevue/dialogservice'
import ToastService        from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip             from 'primevue/tooltip';

const pinia = createPinia()

createApp(app)
    .use(PrimeVue, {
        unstyled: true,
        pt: primeStyle, // theme
        components: {
            prefix: "P",
            include: ['Image']
        }
    })
    .use(router)
    .use(i18n)
    .use(DialogService)
    .use(ToastService)
    .use(ConfirmationService)
    .use(pinia)
    .directive('tooltip', Tooltip)
    .mount('#icewhale-settings-app')
