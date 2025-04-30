<template>
  <div class="container">
    <div class="column-left"></div>
    <div class="column-main">
      <div v-if="loading">Loading house...</div>
      <div v-if="error">{{ error }}</div>

      <div class="exit-container">
        <button @click="goToHomePage" id="button_back">
          <img src="../assets/ic_back_grey@3x.png" alt="exit_arrow" />
        </button>
        <label>Back to overview</label>
      </div>

      <div class="house_container">
        <ConfirmationDeleteDialog
          v-if="showConfirmation"
          @confirm="confirmDelete"
          @cancel="cancelDelete"
        />
        <img :src="image" class="house_img" alt="house_img" />
        <div class="house_details">
          <div class="header">
            <h1>{{ street }}</h1>
            <div class="icons-right">
              <img
                src="../assets/ic_edit@3x.png"
                @click="goToEditHouse"
                alt="Editar"
                class="header_icon"
              />
              <img
                src="../assets/ic_delete@3x.png"
                @click="delHouse"
                alt="Borrar"
                class="header_icon"
              />
            </div>
          </div>
          <div class="flex_container">
            <img src="../assets/ic_location@3x.png" class="small_icon" />
            <p>{{ address }}</p>
          </div>

          <div class="flex_container">
            <img src="../assets/ic_price@3x.png" class="small_icon" />
            <p>{{ price }}</p>
            <img src="../assets/ic_size@3x.png" class="small_icon" />
            <p>{{ size }} m²</p>
            <img src="../assets/ic_construction_date@3x.png" class="small_icon" />
            <p>Built in {{ constructionYear }}</p>
          </div>

          <div class="flex_container">
            <img src="../assets/ic_bed@3x.png" class="small_icon" />
            <p>{{ bedrooms }}</p>
            <img src="../assets/ic_bath@3x.png" class="small_icon" />
            <p>{{ bathrooms }}</p>
            <img src="../assets/ic_garage@3x.png" class="small_icon" />
            <p v-if="hasGarage">Yes</p>
            <p v-else>No</p>
          </div>
          <p class="house_descripcion">{{ description }}</p>
        </div>
      </div>
    </div>
    <div class="column-right">
      <h3 class="title_hause_recommended">Recommended for you</h3>
      <CardHouse
        v-for="house in houses_recomended.slice(0, 3)"
        :key="house.id"
        :house="house"
        class="CardHause"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HomeService from '@/services/HomeService'
import type { House } from '@/services/HomeService'
import CardHouse from '@/components/CardHouse.vue'
import ConfirmationDeleteDialog from '@/components/ConfirmationDeleteDialog.vue'

const homeService = new HomeService()
const route = useRoute()
const router = useRouter()
const showConfirmation = ref(false)

const houseId = ref<number>(parseInt(route.params.id as string))
const loading = ref(true)
const error = ref<string | null>(null)
const house = ref<Partial<House>>({})

const street = ref('')
const address = ref('')
const price = ref(0)
const size = ref(0)
const bedrooms = ref(0)
const bathrooms = ref(0)
const constructionYear = ref(0)
const image = ref('')
const description = ref('')
const hasGarage = ref(false)

const houses_recomended: Ref<House[]> = ref([])

onMounted(() => {
  loadHouseData()
  loadRecomendedHouse()
  if (route.query.delete === 'true') {
    showConfirmation.value = true
  }
})

const loadHouseData = async () => {
  try {
    await homeService.fetchAll()
    houses_recomended.value = homeService.houses.value

    const data = await homeService.fetchById(houseId.value)
    if (data) {
      house.value = data
    } else {
      error.value = 'House not found'

    }

    // Cargar campos individuales
    street.value = `${house.value.location?.street ?? ''} ${house.value.location?.houseNumber ?? ''}`
    address.value = `${house.value.location?.zip ?? ''} ${house.value.location?.city ?? ''}`
    price.value = house.value.price ?? 0
    size.value = house.value.size ?? 0
    bedrooms.value = house.value.rooms?.bedrooms ?? 0
    bathrooms.value = house.value.rooms?.bathrooms ?? 0
    constructionYear.value = house.value.constructionYear ?? 0
    image.value = house.value.image ?? ''
    description.value = house.value.description ?? ''
    hasGarage.value = house.value.hasGarage ?? false
  } catch (err) {
    console.error(err)
    error.value = 'Error loading house data'
  } finally {
    loading.value = false
  }
}

const loadRecomendedHouse = async () => {
  try {
    await homeService.fetchAll()
    houses_recomended.value = homeService.houses.value
  } catch (err) {
    console.error(err)
  }
}

watch(
  () => route.params.id,
  (newId) => {
    houseId.value = parseInt(newId as string)
    loadHouseData()
  },
)

const confirmDelete = async () => {
  try {
    if (house.value.id) {
      await homeService.deleteHouse(house.value.id)
      router.push({ name: 'Home' })
    }
  } catch (err) {
    console.error('Error deleting house:', err)
  }
}

const cancelDelete = () => {
  showConfirmation.value = false
}

const delHouse = () => {
  showConfirmation.value = true
}

const goToEditHouse = () => {
  router.push({ name: 'EditHouse', params: { id: houseId.value } })
}

const goToHomePage = () => {
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
}

.column-left {
  width: 15%;
  height: 100vh;
  background-color: #f6f6f6;
}

.column-main {
  width: 50%;
  height: 100vh;
  background-color: #f6f6f6;
}
.column-right {
  width: 35%;
  height: 100vh;
  background-color: #f6f6f6;
}

.exit-container {
  display: flex;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
}
.exit-container label {
  color: #000000;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  display: block;
}
#button_back {
  all: unset;
  cursor: pointer;
}
#button_back img {
  height: 25px;
  width: auto;
  margin-right: 15px;
}
/* House datails */
p {
  color: #4a4b4c;
  margin-right: 20px;
}
.house_img {
  max-width: 100%;
  height: auto;
}
.house_container {
  max-width: 85%;
  height: auto;
  background-color: #ffffff;
}

.house_details {
  margin-top: 2.5%;
  margin-left: 2.5%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.icons-right {
  display: flex;
  gap: 10px;
}

.header_icon {
  height: 25px;
  width: 25px;
  cursor: pointer;
  margin-right: 20px;
}

.flex_container {
  display: flex;
  margin-top: 15px;
}

.small_icon {
  height: 15px;
  width: 15px;
  margin-right: 15px;
}

.house_descripcion {
  margin-top: 25px;
  line-height: 25px;
}
/* Hauses recommended */

.title_hause_recommended {
  margin-top: 12%;
}
.CardHause {
  margin-top: 20px;
  width: 70%;
}
</style>
