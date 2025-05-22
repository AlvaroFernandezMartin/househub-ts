import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCurrentUser } from '@/services/HomeService'

type User = {
  id: number
  username: string
  is_superuser: boolean
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const initUser = async () => {
    user.value = await fetchCurrentUser()
  }

  const clearUser = () => {
    user.value = null
  }

  return { user, initUser, clearUser }
})
