<template>
  <div class="container-fluid ">
    <div class="row justify-content-center min-vh-100 ">

      <!-- Lateral izquierdo, visible solo en sm+ -->
      <aside class="d-none d-sm-block col-sm-2 "></aside>

      <!-- Contenido central -->
      <main class="col-12 col-sm-8 ">
        <div class="row h-25">
          <div class="d-flex justify-content-between p-0 bg-warning ">

            <h1 class="m-0">Houses</h1>
            <button id="button_create_new">+ CREATE NEW</button>
          </div>

          <div class="col-12 col-sm-6 bg-info">
            <img src="../assets/ic_search@3x.png" alt="Buscar" class="icon" />
          <input type="text" placeholder="Search for a house" />
          <button>
            <img src="../assets/ic_clear@3x.png" alt="clear" class="icon" />
          </button>
          </div>
          <div class="col-12 col-sm-6  bg-danger">
            <button class="">Price</button>
            <button class="">Size</button>
          </div>

        </div>
        <div class="row">
        </div>
      </main>

      <!-- Lateral derecho, visible solo en sm+ -->
      <aside class="d-none d-sm-block col-sm-2 "></aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
h1 {
  font-family: 'Montserrat', sans-serif;
}

.icon {
  width: 24px;
  height: 24px;
}
#button_create_new{
  background-color: #eb5440;
  color: #ffffff;
  height: 30px;
  width: 150px;
  text-align: center;
  border-radius: 7px;
  border: none;
  cursor: pointer;
}
</style>
