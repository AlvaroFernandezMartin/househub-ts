import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  username: string
  is_superuser: boolean
}
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const initUser = async () => {
    const response = await fetch('https://househubapi-production.up.railway.app/api/auth/me/', {
      credentials: 'include'
    })
    if (response.ok) {
      user.value = await response.json()
    }
  }

  const clearUser = () => {
    user.value = null
  }

  return { user, initUser, clearUser }
})
