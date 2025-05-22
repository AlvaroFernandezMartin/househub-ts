<template>
  <nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 d-flex align-items-center">
          <img src="../assets/DTT_Rental_Houses.png" alt="dtt_logo" class="logo" />

          <ul>
            <li>
              <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'About' }" class="nav-link">About</router-link>
            </li>
          </ul>

          <!-- Usuario e icono a la derecha -->
          <div class="user-section d-flex align-items-center ms-auto">
            <i class="bi bi-person-circle"></i>
            <span class="ms-2 me-3">{{ username }}</span>

            <!-- Botón de login/logout -->
            <button v-if="isLoggedIn" class="btn btn-outline-danger btn-sm" @click="handleLogout">
              Logout
            </button>
            <div v-else>
              <router-link :to="{ name: 'Login' }" class="btn btn-outline-primary btn-sm me-2">
                Login
              </router-link>
              <router-link :to="{ name: 'Signup' }" class="btn btn-outline-success btn-sm">
                Signup
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user_info'

const userStore = useUserStore()
const router = useRouter()

const isLoggedIn = computed(() => userStore.user !== null)
const username = computed(() => userStore.user?.username ?? 'Invitado')

const handleLogout = async () => {
  try {
    await fetch('https://househubapi-production.up.railway.app/api/auth/logout/', {
      method: 'POST',
      credentials: 'include',
    })
    userStore.clearUser()
    router.push({ name: 'Login' })
  } catch (err) {
    console.error('Logout error:', err)
  }
}
</script>

<style scoped>
nav {
  background-color: #ffffff;
}

.logo {
  width: 100px;
  margin-top: 1%;
  margin-bottom: 1%;
}

nav ul {
  list-style-type: none;
  display: flex;
  margin-left: 30px;
  gap: 40px;
}

.nav-link {
  color: #4a4b4c;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.nav-link.router-link-active {
  color: #000000;
  font-weight: 600;
}

.user-section {
  font-size: 18px;
  color: #4a4b4c;
}

.user-section i {
  font-size: 24px;
}
</style>
