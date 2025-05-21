<template>
  <nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2"></div>

        <!-- Contenido principal del navbar -->
        <div class="col-8 d-flex align-items-center">
          <img src="../assets/img_logo_dtt@3x.png" alt="dtt_logo" class="logo" />

          <ul>
            <li>
              <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'About' }" class="nav-link">About</router-link>
            </li>
          </ul>

          <!-- Usuario a la derecha -->
          <div
            class="user-section d-flex align-items-center ms-auto"
            @click="handleUserClick"
            style="cursor: pointer;"
          >
            <i class="bi bi-person-circle"></i>
            <span class="ms-2">{{ username }}</span>
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

const router = useRouter()
const userStore = useUserStore()

const username = computed(() =>
  userStore.user?.username ?? 'Usuario sin registrar'
)

const handleUserClick = () => {
  if (!userStore.user) {
    router.push({ name: 'Login' })
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
