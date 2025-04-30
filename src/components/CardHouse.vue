<template>
  <div class="container">
    <button @click="goToHouse">
      <img :src="house.image" alt="Casa" class="main-img" />
    </button>
    <div class="content">
      <div class="header">
        <h3 class="street_name">{{ house.location.street }} {{ house.location.houseNumber }}</h3>
        <div v-if="all_icons" class="icons-right">
          <img src="../assets/ic_edit@3x.png" @click="emitEditHouse" alt="Editar" class="small-icon" />
          <img src="../assets/ic_delete@3x.png" @click="emitDelHouse" alt="Borrar" class="small-icon" />
        </div>
      </div>
      <label class="label_money">€ {{ house.price }}</label>
      <label class="label_city">{{ house.location.city }}</label>
      <label class="location_name">{{ house.location.zip }} {{ house.location.city }}</label>
      <div class="icons">
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
/* CSS original sin tocar */
.container {
  display: flex;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 7px;
}
button {
  all: unset;
  cursor: pointer;
}
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.main-img {
  height: 150px;
  width: 150px;
  border-radius: 7px;
  margin-right: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.street_name {
  margin: 7px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
}
.location_name {
  margin-bottom: 10px;
  font-family: 'Open Sans', sans-serif;
  color: #C3C3C3;
  font-weight: 300;
}
.icons-right {
  display: flex;
  gap: 10px;
}
.small-icon {
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.label_city {
  margin: 7px;
  font-size: 14px;
  color: #555;
}
.label_money {
  font-family: 'Montserrat', sans-serif;
}
.icons {
  display: flex;
  gap: 15px;
  margin-top: 5px;
}
.icon {
  height: 15px;
  width: 15px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
