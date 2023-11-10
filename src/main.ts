import { createApp } from 'vue'
import './style/style.css'
// import primeStyle from "./style/prime.ts";
import App from './App.vue'
import i18n from './i18n'
import router from './pages/router.ts'
import PrimeVue from 'primevue/config'

createApp(App)
	.use(PrimeVue, {
		unstyled: true,
		// pt: primeStyle // theme
		// pt: {}
	})
	.use(router)
	.use(i18n)
	.mount('#app')
