<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="container p-4 shadow rounded" style="max-width: 400px; background-color: white;">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
        <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  try {
    const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    })

    if (!response.ok) {
      const data = await response.json()
      error.value = data.error || 'Login failed.'
    } else {
      router.push({ name: 'Home' })
    }
  } catch (err) {
    error.value = 'Something went wrong.'
    console.error(err)
  }
}
</script>
