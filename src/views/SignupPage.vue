<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="container p-4 shadow rounded" style="max-width: 400px; background-color: white;">
      <h2 class="text-center mb-4">Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" required />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input v-model="confirmPassword" type="password" class="form-control" id="confirmPassword" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Create Account</button>
        <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
        <p v-if="success" class="text-success mt-3 text-center">User created! Redirecting...</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HomeService from '@/services/HomeService'

const homeService = new HomeService()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref(false)
const router = useRouter()

const handleSignup = async () => {
  error.value = ''
  success.value = false

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    const response = await homeService.signupUser(username.value, password.value)

    if (!response.ok) {
      const data = await response.json()
      error.value = data.error || 'Signup failed.'
    } else {
      success.value = true
      setTimeout(() => {
        router.push({ name: 'Login' })
      }, 1500)
    }
  } catch (err) {
    error.value = 'Something went wrong.'
    console.error(err)
  }
}

</script>
