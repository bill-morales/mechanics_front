import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCoffee, faUser, fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCoffee, faUser, fas)
const pinia = createPinia()
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(pinia).use(router).use(axios).use(router).mount('#app')
