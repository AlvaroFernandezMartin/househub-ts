<template>
  <nav>
    <img src="../assets/img_logo_dtt@3x.png" alt="dtt_logo" class="logo" />
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'About' }" class="nav-link">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
// No logic needed
</script>

<style scoped>
nav {
  background-color: #FFFFFF;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 20px;
  align-items: center;
  padding: 10px;
  padding-left: 15%;
}

nav .logo {
  width: 100px;
  margin-right: 30px;
}

nav ul {
  list-style-type: none;
  display: flex;
}

nav li {
  margin-right: 50px;
}

.nav-link {
  color: #4A4B4C;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.nav-link.router-link-active {
  color: #000000;
  font-weight: 600;
}
</style>
