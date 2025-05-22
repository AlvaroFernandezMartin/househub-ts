import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/user_info'

async function bootstrap() {
  const app = createApp(App)
  app.use(router)
  app.use(createPinia())

  const userStore = useUserStore()
  await userStore.initUser()

  app.mount('#app')
}

bootstrap()
