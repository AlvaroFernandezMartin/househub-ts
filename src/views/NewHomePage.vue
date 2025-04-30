<template>
  <div class="container-fluid main">
    <div class="row  min-vh-100 ">
      <!-- Columna izquierda -->
      <aside class="col-2 bg-warning d-none d-md-block ">
       sadfasdf
      </aside>

      <!-- Columna principal -->
      <main class="col-8">
        <div class="action-div">
        <h1>Houses</h1>
        <button id="button_create_new">+ CREATE NEW</button>
        <div class="input-div">
          <img id="img_search" src="../assets/ic_search@3x.png" alt="Buscar" class="icon" />
          <input type="text" placeholder="Search for a house" />
          <button  id="button_clear">
            <img
              id="img_clear"
              src="../assets/ic_clear@3x.png"
              alt="clear_input"
              class="icon"
            />
          </button>
        </div>
        <div class="button-div">
          <button
            id="button_price"
          >
            Price
          </button>
          <button
            id="button_size"
          >
            Size
          </button>
        </div>
      </div>
      </main>

      <!-- Columna derecha -->
      <aside class="col-2 bg-warning d-none d-md-block ">
       sadfasdf
      </aside>
    </div>
  </div>

</template>

<script lang="ts" setup>
</script>

<style scoped>
.main {
  background-color: #f4f4f4;
}
</style>
