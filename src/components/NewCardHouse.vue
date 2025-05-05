<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-2  img-container ">
        <button @click="goToHouse">
          <img :src="house.image" alt="Casa"  />
        </button>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-12">
              <h3 class="street_name">{{ house.location.street }} {{ house.location.houseNumber }}</h3>
          </div>
          <div class="col-12">
        <label class="label_money">€ {{ house.price }}</label>
          </div>
          <div class="col-12">
        <label class="location_name">{{ house.location.zip }} {{ house.location.city }}</label>
        <label class="label_city">{{ house.location.city }}</label>
          </div>
          <div class="col-12">
              <span>
                    <img src="../assets/ic_bed@3x.png" alt="Cama" class="icon" />
                    <span>{{ house.rooms.bedrooms }}</span>
                  </span>
                  <span>
                    <img src="../assets/ic_bath@3x.png" alt="Baño" class="icon" />
                    <span>{{ house.rooms.bathrooms }}</span>
                  </span>
                  <span>
                    <img src="../assets/ic_size@3x.png" alt="Metros cuadrados" class="icon" />
                    <span>{{ house.size }} m²</span>
                  </span>
          </div>
        </div>

      </div>
      <div class="col-2 bg-info">
         <div v-if="all_icons" class="icons-right">
           <img src="../assets/ic_edit@3x.png" @click="emitEditHouse" alt="Editar" class="action-icon" />
           <img src="../assets/ic_delete@3x.png" @click="emitDelHouse" alt="Borrar" class="action-icon" />
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
  padding: 10px;
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
  margin: 5px 0;
}

.label_money {
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #2c2c2c;
  margin-bottom: 3px;
  display: inline-block;
}

.label_city {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  color: #555;
  margin-left: 10px;
}

.location_name {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  color: #C3C3C3;
  font-weight: 300;
}

/* Iconos de características */
.icon {
  height: 15px;
  width: 15px;
  margin: 0 5px;
  vertical-align: middle;
}

/* Espaciado general para la línea de iconos */
.col-12 > span {
  margin-right: 15px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #333;
}

/* Alineación de los iconos a la derecha */
.icons-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
}
</style>

