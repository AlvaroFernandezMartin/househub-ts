import { ref } from 'vue'
import type { Ref } from 'vue'

export interface House {
  id: number
  image: string
  price: number
  size: number
  description: string
  rooms: {
    bedrooms: number
    bathrooms: number
  }
  location: {
    street: string
    houseNumber: number
    houseNumberAddition: string
    city: string
    zip: string
  }
  constructionYear: number
  hasGarage: boolean
  createdAt: string
}

export default class HomeService {
  houses: Ref<House[]>

  constructor() {
    this.houses = ref<House[]>([])
  }

  // Obtener todas las casas
  async fetchAll() {
    const url = 'http://127.0.0.1:8000/api/houses/'
    try {
      const response = await fetch(url, {
        method: 'GET',
      })
      if (response.ok) {
        this.houses.value = await response.json() as House[]
      } else {
        console.error('Error fetching houses:', response.status)
      }
    } catch (error) {
      console.error('Error with the request:', error)
    }
  }

  // Obtener una casa por ID
  async fetchById(houseId: number): Promise<House | undefined> {
    const url = `http://127.0.0.1:8000/api/houses/${houseId}`
    try {
      const response = await fetch(url, {
        method: 'GET',
      })
      if (response.ok) return await response.json()
      else console.error('Error fetching the house:', response.status)
    } catch (error) {
      console.error('Error with the request:', error)
    }
  }

  // Crear casa
  async createHouse(data: FormData): Promise<number | undefined> {
    const url = 'http://127.0.0.1:8000/api/houses/create/'
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: data,
      })
      if (response.ok) {
        const result = await response.json()
        return result.id
      } else {
        console.error('Error creating house:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error during request:', error)
    }
  }

  // Actualizar casa
  async updateHouse(houseId: number, data: FormData): Promise<void> {
    const url = `http://127.0.0.1:8000/api/houses/${houseId}/update/`
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: data,
      })
      if (!response.ok) {
        console.error('Error updating house:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error updating house:', error)
    }
  }

  // Eliminar casa
  async deleteHouse(houseId: number): Promise<void> {
    const url = `http://127.0.0.1:8000/api/houses/${houseId}/delete/`
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (!response.ok) {
        console.error('Error deleting house:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error deleting house:', error)
    }
  }
 
    async signupUser(username: string, password: string): Promise<Response> {
      return await fetch('http://127.0.0.1:8000/api/auth/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
    }

    async loginUser(username: string, password: string): Promise<Response> {
      return await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
    }


}

// UserService.ts
export async function fetchCurrentUser(): Promise<{ id: number, username: string } | null> {
const response = await fetch('http://127.0.0.1:8000/api/auth/me/', {
  credentials: 'include',
})
if (response.ok) {
  return await response.json()
}
return null
}


