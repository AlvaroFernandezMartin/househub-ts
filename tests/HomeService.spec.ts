import { describe, it, expect, vi, beforeEach } from 'vitest'
import HomeService from '../src/services/HomeService'


const service = new HomeService()

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('HomeService', () => {
  it('loginUser realiza login correctamente', async () => {
    const mockResponse = { id: 1, username: 'user1' }

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockResponse, // <- simula el cuerpo .json()
    } as Response)

    const result = await service.loginUser('user1', 'password123')
    expect(result).toEqual(mockResponse)
  })

  it('signupUser crea usuario correctamente', async () => {
    const mockResponse = { success: true }

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockResponse, // <- simula el cuerpo .json()
    } as Response)

    const result = await service.signupUser('newuser', 'newpassword')
    expect(result).toEqual(mockResponse)
  })
})