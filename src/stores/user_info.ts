import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchCurrentUser } from '@/services/HomeService'

export const useUserStore = defineStore('user', () => {
  const user = ref<{ id: number, username: string } | null>(null)

  const initUser = async () => {
    user.value = await fetchCurrentUser()
  }

  const clearUser = () => {
    user.value = null
  }

  return { user, initUser, clearUser }
})


