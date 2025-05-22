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

const API_ROUTE = 'https://househubapi-production.up.railway.app'

export default class HomeService {
  houses: Ref<House[]>

  constructor() {
    this.houses = ref<House[]>([])
  }

  async fetchAll() {
    const url = `${API_ROUTE}/api/houses/`
    try {
      const response = await fetch(url, { method: 'GET' })
      if (response.ok) {
        this.houses.value = await response.json() as House[]
      } else {
        console.error('Error fetching houses:', response.status)
      }
    } catch (error) {
      console.error('Error with the request:', error)
    }
  }

  async fetchById(houseId: number): Promise<House | undefined> {
    const url = `${API_ROUTE}/api/houses/${houseId}`
    try {
      const response = await fetch(url, { method: 'GET' })
      if (response.ok) return await response.json()
      else console.error('Error fetching the house:', response.status)
    } catch (error) {
      console.error('Error with the request:', error)
    }
  }

  async createHouse(data: FormData): Promise<number | undefined> {
    const url = `${API_ROUTE}/api/houses/create/`
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

  async updateHouse(houseId: number, data: FormData): Promise<void> {
    const url = `${API_ROUTE}/api/houses/${houseId}/update/`
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

  async deleteHouse(houseId: number): Promise<void> {
    const url = `${API_ROUTE}/api/houses/${houseId}/delete/`
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
    return await fetch(`${API_ROUTE}/api/auth/signup/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  }

  async loginUser(username: string, password: string): Promise<Response> {
    return await fetch(`${API_ROUTE}/api/auth/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
  }
}

// -------------------------------
// UserService.ts (puede ir aparte o aquí mismo)
export async function fetchCurrentUser(): Promise<{ id: number, username: string } | null> {
  const response = await fetch(`${API_ROUTE}/api/auth/me/`, {
    credentials: 'include',
  })
  if (response.ok) return await response.json()
  return null
}
