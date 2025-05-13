<template>
  <div class="columns-div">
    <div class="left"></div>
    <div class="main">
      <div class="action-div">
        <h1>Houses</h1>
        <button id="button_create_new" @click="goToNewHause">+ CREATE NEW</button>
        <div class="input-div">
          <img id="img_search" src="../assets/ic_search@3x.png" alt="Buscar" class="icon" />
          <input type="text" placeholder="Search for a house" v-model="sheard" />
          <button @click="clear_imput" id="button_clear">
            <img
              v-if="clear_input"
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
            :style="{ backgroundColor: activeButton === 'Price' ? '#EB5440' : '#E8E8E8' }"
            @click="filtering_hauses('Price')"
          >
            Price
          </button>
          <button
            id="button_size"
            :style="{ backgroundColor: activeButton === 'Size' ? '#EB5440' : '#E8E8E8' }"
            @click="filtering_hauses('Size')"
          >
            Size
          </button>
        </div>
      </div>

      <div v-if="successful_search" class="card-hauses-div">
        <h3 v-if="number_results > 0">{{ number_results }} results found</h3>
        <CardHouse
          v-for="house in filtered_houses"
          :key="house.id"
          :house="house"
          :all_icons="true"
          @delete-house="goToDeleteHouse"
          @edit-house="goToEditHouse(house.id)"
        />
      </div>

      <div v-else-if="sheard && number_results === 0" id="div_empty_houses">
        <img id="img_empty_houses" src="../assets/img_empty_houses@3x.png" alt="No results found" />
        <label>No results found.</label>
        <label>Please key another keyword.</label>
      </div>

      <div v-if="loading">Loading houses...</div>
      <div v-if="error">{{ error }}</div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import HomeService, { type House } from '@/services/HomeService'
import CardHouse from '@/components/CardHouse.vue'

const homeService = new HomeService()
const houses = ref<House[]>([])
const filtered_houses = ref<House[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const clear_input = ref<boolean>(false)
const successful_search = ref<boolean>(true)
const sheard = ref<string>('')
const number_results = ref<number>(0)
const ordering_by = ref<'Price' | 'Size'>('Price')
const activeButton = ref<'Price' | 'Size'>('Price')

const router = useRouter()

onMounted(async () => {
  await getDates()
})

const getDates = async () => {
  try {
    loading.value = true
    await homeService.fetchAll()
    houses.value = homeService.houses.value
    filtered_houses.value = houses.value
    filtering_hauses(ordering_by.value)
  } catch (err) {
    error.value = 'Error to obtain the houses'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const filtering_locations = () => {
  if (!sheard.value) {
    successful_search.value = true
    filtered_houses.value = houses.value
    number_results.value = 0
    clear_input.value = false
  } else {
    clear_input.value = true
    const searchTerm = sheard.value.toLowerCase()
    filtered_houses.value = houses.value.filter((house) => {
      const zip = house.location?.zip?.toLowerCase() || ''
      const city = house.location?.city?.toLowerCase() || ''
      return zip.includes(searchTerm) || city.includes(searchTerm)
    })

    number_results.value = filtered_houses.value.length
    successful_search.value = number_results.value > 0
  }
}

watch(sheard, filtering_locations)

const clear_imput = () => {
  sheard.value = ''
  successful_search.value = true
  number_results.value = 0
}

const filtering_hauses = (new_ordering: 'Price' | 'Size') => {
  if (ordering_by.value !== new_ordering) {
    ordering_by.value = new_ordering
    filtered_houses.value = [...filtered_houses.value].sort((a, b) => {
      if (new_ordering === 'Price') return a.price - b.price
      if (new_ordering === 'Size') return a.size - b.size
      return 0
    })
    activeButton.value = new_ordering
  }
}

const goToNewHause = () => {
  router.push({ name: 'NewHouse' })
}

const goToDeleteHouse = (houseId: number) => {
  router.push({ name: 'HouseDetail', params: { id: houseId }, query: { delete: 'true' } })
}

const goToEditHouse = (id: number) => {
  router.push({ name: 'EditHouse', params: { id } })
}
</script>

<style scoped>
.columns-div {
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

.right {
  width: 15%;
}

.action-div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
}

h1 {
  text-align: left;
  margin-top: 40px;
  font-family: 'Montserrat', sans-serif;
}

input {
  background-color: #e8e8e8;
  margin-top: 20px;
}

.input-div {
  position: relative;
  display: flex;
  align-items: center;
  width: 300px;
}

.input-div input {
  width: 100%;
  padding: 10px 10px 10px 35px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#img_search {
  position: absolute;
  left: 10px;
  width: 20px;
  height: 20px;
  margin-top: 20px;
}

#button_clear {
  position: absolute;
  margin-left: 90%;
  border: 0px;
  cursor: pointer;
  background: none;
}

#img_clear {
  left: 90%;
  width: 20px;
  height: 20px;
  margin-top: 20px;
}

#div_empty_houses {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

#div_empty_houses img {
  max-width: 30%;
  height: auto;
  margin-top: 10%;
  margin-bottom: 50px;
}

#div_empty_houses label {
  font-family: 'Montserrat', sans-serif;
  color: #4a4b4c;
  font-weight: 300;
}

/*  Button Styles (Create, Filter) */
#button_create_new {
  background-color: #eb5440;
  color: #ffffff;
  height: 30px;
  width: 150px;
  text-align: center;
  border-radius: 7px;
  border: none;
  align-self: end;
  margin-left: 70%;
  cursor: pointer;
}

.button-div button {
  margin-top: 30px;
  height: 30px;
  width: 120px;
  color: #ffffff;
  text-align: center;
  border-radius: 7px;
  border: none;
}

#button_price {
  background-color: #eb5440;
  margin-left: 51%;
  cursor: pointer;
}

#button_size {
  background-color: #e8e8e8;
  cursor: pointer;
}

/*  Card Items div */
.card-hauses-div > * {
  margin-top: 20px;
}

h3 {
  font-family: 'Montserrat', sans-serif;
  display: block;
  margin-top: 20px;
}
</style>
