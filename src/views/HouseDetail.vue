<template>
  <div class="container-fluid">
    <div class="row min-vh-100">

      <!-- Columna izquierda (solo visible en sm+) -->
      <div class="d-none d-sm-block col-sm-2 col-lg-2"></div>

      <!-- Columna principal -->
      <div class="col-12 col-sm-8 col-lg-6">
        <div v-if="loading">Loading house...</div>
        <div v-if="error">{{ error }}</div>

        <div class="d-flex align-items-center mb-4 mt-4">
          <button @click="goToHomePage" id="button_back" class="btn me-2">
            <img src="../assets/ic_back_grey@3x.png" alt="exit_arrow" />
          </button>
          <label class="fw-bold">Back to overview</label>
        </div>

        <div>
          <ConfirmationDeleteDialog v-if="showConfirmation" @confirm="confirmDelete" @cancel="cancelDelete" />


          <!-- CONTENEDOR COMÚN -->
          <div class="house_wrapper ">
            <img :src="image" class="imagen img-fluid mb-3" alt="house_img" />

            <div class="house_details">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h1 class="fs-4">{{ street }}</h1>
                <div class="d-flex gap-2">
                  <img src="../assets/ic_edit@3x.png" @click="goToEditHouse" alt="Editar" class="header_icon" />
                  <img src="../assets/ic_delete@3x.png" @click="delHouse" alt="Borrar" class="header_icon" />
                </div>
              </div>

              <div class="d-flex align-items-center mb-2">
                <img src="../assets/ic_location@3x.png" class="small_icon me-2" />
                <p class="mb-0">{{ address }}</p>
              </div>

              <div class="d-flex align-items-center flex-wrap gap-3 mb-2">
                <div class="d-flex align-items-center">
                  <img src="../assets/ic_price@3x.png" class="small_icon me-2" />
                  <p class="mb-0">{{ price }}</p>
                </div>
                <div class="d-flex align-items-center">
                  <img src="../assets/ic_size@3x.png" class="small_icon me-2" />
                  <p class="mb-0">{{ size }} m²</p>
                </div>
                <div class="d-flex align-items-center">
                  <img src="../assets/ic_construction_date@3x.png" class="small_icon me-2" />
                  <p class="mb-0">Built in {{ constructionYear }}</p>
                </div>
              </div>

              <div class="d-flex align-items-center flex-wrap gap-3 mb-2">
                <div class="d-flex align-items-center">
                  <img src="../assets/ic_bed@3x.png" class="small_icon me-2" />
                  <p class="mb-0">{{ bedrooms }}</p>
                </div>
                <div class="d-flex align-items-center">
                  <img src="../assets/ic_bath@3x.png" class="small_icon me-2" />
                  <p class="mb-0">{{ bathrooms }}</p>
                </div>
                <div class="d-flex align-items-center">
                  <img src="../assets/ic_garage@3x.png" class="small_icon me-2" />
                  <p class="mb-0">{{ hasGarage ? 'Yes' : 'No' }}</p>
                </div>
              </div>

              <p class="mt-4">{{ description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna derecha -->
      <div class="col-md-4 col-lg-4">
        <h4 class="mb-4 mt-4">Recommended for you</h4>
        <NewCardHouse v-for="house in houses_recomended.slice(0, 3)" :key="house.id" :house="house" class="mb-3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HomeService from '@/services/HomeService'
import type { House } from '@/services/HomeService'
import NewCardHouse from '@/components/CardHouse.vue'
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
  console.log('clicked')
}

const goToEditHouse = () => {
  router.push({ name: 'EditHouse', params: { id: houseId.value } })
}

const goToHomePage = () => {
  router.push({ name: 'Home' })
}
</script>

<style scoped>
#button_back img {
  height: 25px;
  width: auto;
}

.header_icon {
  height: 25px;
  width: 25px;
  cursor: pointer;
}

.small_icon {
  height: 15px;
  width: 15px;
}

.imagen {
  max-width: 100%;
  height: auto;
}

.house_wrapper {
  max-width: 600px;
  width: 100%;
}
</style>
