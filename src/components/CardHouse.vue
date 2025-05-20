<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-2 img-container">
        <button @click="goToHouse">
          <img :src="house.image" alt="Casa" />
        </button>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-12 pt-3">
            <h3 class="street_name">
              {{ house.location.street }} {{ house.location.houseNumber }}
            </h3>
          </div>
          <div class="col-12 pt-2">
            <label class="label_money">€ {{ house.price }}</label>
          </div>
          <div class="col-12 pt-2">
            <label class="location_name me-2">{{ house.location.zip }} {{ house.location.city }}</label>
            <label class="label_city">{{ house.location.city }}</label>
          </div>
          <div class="col-12">
            <span class="me-2">
              <img src="../assets/ic_bed@3x.png" alt="Cama" class="icon me-1" />
              <span>{{ house.rooms.bedrooms }}</span>
            </span>
            <span class="me-2">
              <img src="../assets/ic_bath@3x.png" alt="Baño" class="icon me-1" />
              <span>{{ house.rooms.bathrooms }}</span>
            </span>
            <span class="me-2">
              <img src="../assets/ic_size@3x.png" alt="Metros cuadrados" class="icon me-1" />
              <span>{{ house.size }} m²</span>
            </span>
          </div>
        </div>
      </div>
      <div class="col-2  d-flex justify-content-center align-items-start pt-3">
        <div v-if="all_icons" class="d-flex gap-2 flex-wrap">
          <img
            src="../assets/ic_edit@3x.png"
            @click="emitEditHouse"
            alt="Editar"
            class="action-icon"
          />
          <img
            src="../assets/ic_delete@3x.png"
            @click="emitDelHouse"
            alt="Borrar"
            class="action-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import type { House } from '@/services/HomeService'

const router = useRouter()

const props = defineProps<{
  house: House
  all_icons?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete-house', id: number): void
  (e: 'edit-house', id: number): void
}>()

const goToHouse = () => {
  router.push({ name: 'HouseDetail', params: { id: props.house.id } })
}

const emitEditHouse = () => {
  emit('edit-house', props.house.id)
}

const emitDelHouse = () => {
  emit('delete-house', props.house.id)
}


</script>

<style scoped>
.container-fluid {
  background-color: #ffffff;
  border-radius: 7px;
}

/* Imagen principal */
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 150px;
}

.img-container img {
  height: 125px;
  width: 125px;
  border-radius: 7px;
}

/* Botón sin bordes ni fondo */
button {
  all: unset;
  cursor: pointer;
}

/* Iconos de acción (editar/borrar) */
.action-icon {
  height: 20px;
  width: 20px;
  cursor: pointer;
}

/* Tipografía y tamaños */
.street_name {
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
}

.label_money {
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #2c2c2c;
  display: inline-block;
}

.label_city {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  color: #555;
}

.location_name {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  color: #c3c3c3;
  font-weight: 300;
}

/* Iconos de características */
.icon {
  height: 15px;
  width: 15px;
}
</style>
