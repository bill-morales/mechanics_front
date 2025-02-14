import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCoffee, faUser, fas } from '@fortawesome/free-solid-svg-icons'

/* TOAST */
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import './style.css'

/* add icons to the library */
library.add(faCoffee, faUser, fas)
const pinia = createPinia()
const app = createApp(App)
app.use(ToastPlugin,{
    zIndex: 9999,
    container: document.body,
});
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.config.globalProperties.$axios = axios
app.mount('#app')
