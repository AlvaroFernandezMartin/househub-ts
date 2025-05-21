import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css' 

import { useUserStore } from '@/stores/user_info'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

const userStore = useUserStore()
await userStore.initUser()

app.mount('#app')
