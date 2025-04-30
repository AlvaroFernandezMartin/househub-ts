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
    houseNumberAddition: string | null
    city: string
    zip: string
  }
  constructionYear: number
  hasGarage: boolean
  createdAt: string
  madeByMe: boolean
}

export default class HomeService {
  houses: Ref<House[]>

  constructor() {
    this.houses = ref<House[]>([])
  }

  private get jsonHeaders() {
    return {
      'X-Api-Key': 'mnqeLZXt5cd61uCDaUhrWwgJo3s2iYvy',
      'Content-Type': 'application/json',
    }
  }

  private get authHeader() {
    return {
      'X-Api-Key': 'mnqeLZXt5cd61uCDaUhrWwgJo3s2iYvy',
    }
  }

  //  Obtener todas las casas
  async fetchAll() {
    const url = 'https://api.intern.d-tt.nl/api/houses'
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.jsonHeaders,
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

  //  Obtener una casa por ID
  async fetchById(houseId: number): Promise<House | undefined> {
    const url = `https://api.intern.d-tt.nl/api/houses/${houseId}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'mnqeLZXt5cd61uCDaUhrWwgJo3s2iYvy',
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const houses: House[] = await response.json()
        return houses[0]
      } else {
        console.error('Error fetching the house:', response.status)
      }
    } catch (error) {
      console.error('Error with the request:', error)
    }
  }


  //  Crear casa
  async createHouse(data: Partial<House>): Promise<number | undefined> {
    const url = 'https://api.intern.d-tt.nl/api/houses'
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.jsonHeaders,
        body: JSON.stringify(data),
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

  //  Subir imagen
  async insertImg(houseId: number, image: File): Promise<string | undefined> {
    const url = `https://api.intern.d-tt.nl/api/houses/${houseId}/upload`
    const formData = new FormData()
    formData.append('image', image)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.authHeader,
        body: formData,
      })

      if (response.ok) {
        const data: string = await response.json()
        console.log('Image uploaded successfully:', data)
        return data
      } else {
        console.error('Error uploading image:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  //  Eliminar casa
  async deleteHouse(houseId: number): Promise<void> {
    const url = `https://api.intern.d-tt.nl/api/houses/${houseId}`

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.authHeader,
      })

      if (response.ok) {
        console.log('House deleted successfully')
      } else {
        console.error('Error deleting house:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error deleting house:', error)
    }
  }

  //  Actualizar casa
  async updateHouse(houseId: number, data: Partial<House>): Promise<void> {
    const url = `https://api.intern.d-tt.nl/api/houses/${houseId}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.jsonHeaders,
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log('House updated successfully')
      } else {
        console.error('Error updating house:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error updating house:', error)
    }
  }
}
