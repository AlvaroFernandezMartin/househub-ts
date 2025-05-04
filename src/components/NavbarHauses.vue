<template>
  <nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 ">
          <!-- Puedes añadir contenido si lo necesitas -->
        </div>
        <div class="col-10 d-flex align-items-center">
          <img src="../assets/img_logo_dtt@3x.png" alt="dtt_logo" class="logo" />
          <ul>
            <li>
              <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'About' }" class="nav-link">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
// No logic needed
</script>

<style scoped>
nav {
  background-color: #ffffff;
}

.logo {
  width: 100px;
  margin-top: 1% !important;
  margin-bottom: 1% !important;
}

nav ul {
  list-style-type: none;
  display: flex;
  margin-left: 30px !important;
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
</style>
