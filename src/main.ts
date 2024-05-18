import {createApp} from 'vue'
import '@/assets/css/style.css'
import App from './App.vue'
import vuetify from "@/vuetify";
import router from "@/router";


import toast from '@/toast'


const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(toast)

app.mount('#app')
