<template>
  <div class="columns-container">
    <div class="left"></div>
    <div class="main">
      <h1>About DTT Real Estate</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <h2>Design and Development</h2>
      <div class="info-container">
        <img src="../assets/img_logo_dtt@3x.png" alt="DTT logo" />

        <div class="text-container">
          <label>By DTT</label>
          <label>
            <a href="https://www.d-tt.nl/">www.d-tt.nl</a>
          </label>
        </div>
      </div>
    </div>

    <div class="spacer"></div>
  </div>
</template>

<script lang="ts" setup>
// No logic needed
</script>

<style scoped>
/* CSS original intacto */
.columns-container {
  display: flex;
  min-height: 100vh;
  margin: 0;
  background-color: #f4f4f4;
}

.left {
  width: 15%;
}

.main {
  flex: 3;
}

.spacer {
  width: 15%;
}

h1, h2 {
  margin-top: 5%;
  font-family: 'Montserrat', sans-serif;
  font-size: xx-large;
}

p {
  margin-top: 5%;
  font-family: 'Open Sans', sans-serif;
  color: #4A4B4C;
}

.info-container {
  display: flex;
}

.text-container {
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;
  margin-top: 2.5%;
  margin-left: 5%;
}

img {
  max-width: 20%;
  height: auto;
  margin-top: 2.5%;
}

label {
  margin-top: 2.5%;
}

a {
  margin-top: 2.5%;
  color: #067BC2;
  text-decoration: none;
}
</style>
