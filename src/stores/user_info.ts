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
    try {
      const response = await fetch('https://househubapi-production.up.railway.app/api/auth/me/', {
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        user.value = data as User
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      user.value = null
    }
  }

  const clearUser = () => {
    user.value = null
  }

  return { user, initUser, clearUser }
})
