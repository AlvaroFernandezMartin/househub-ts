<template>
  <div class="container-fluid ">
    <div class="row justify-content-center min-vh-100 ">

      <!-- Lateral izquierdo, visible solo en sm+ -->
      <aside class="d-none d-sm-block col-sm-2 "></aside>

      <!-- Contenido central -->
      <main class="col-12 col-sm-8 ">
        <div class="row row1">
          <div class="d-flex justify-content-between pt-4">
            <h1 class="fw-bold ">Houses</h1>
            <button id="button_create_new" @click="goToNewHause">+ CREATE NEW</button>
          </div>
          <div class="col-12 col-sm-6   d-flex align-items-end bg-inf ">
            <div class="input_container position-relative">
              <img src="../assets/ic_search@3x.png" alt="Buscar" id="icon-search" class="icon " />
              <input type="text" placeholder="Search for a house" v-model="sheard" class="ps-5" />
              <button>
                <img src="../assets/ic_clear@3x.png" @click="clear_imput" v-if="sheard" alt="clear" id="icon-clean"
                  class="icon" />
              </button>

            </div>

          </div>
          <div class="col-12 col-sm-6 d-flex justify-content-end align-items-end">
            <div class="button_container">
              <button id="button_price" :style="{ backgroundColor: activeButton === 'Price' ? '#EB5440' : '#E8E8E8' }"
                @click="filtering_hauses('Price')">Price</button>
              <button id="button_size" :style="{ backgroundColor: activeButton === 'Size' ? '#EB5440' : '#E8E8E8' }"
                @click="filtering_hauses('Size')">Size</button>
            </div>
          </div>

        </div>
        <div class="row h-75">
          <div v-if="successful_search" class="pt-3">
            <h3 v-if="number_results > 0">{{ number_results }} results found</h3>
            <CardHouse class="mt-3" v-for="house in filtered_houses" :key="house.id" :house="house" :all_icons="true"
              @delete-house="goToDeleteHouse" @edit-house="goToEditHouse(house.id)" />
          </div>

          <div v-else-if="sheard && number_results === 0"
            class="d-flex flex-column align-items-center text-center mt-5">

            <img id="img_empty_houses" src="../assets/img_empty_houses@3x.png" alt="No results found" />
            <label>No results found.</label>
            <label>Please key another keyword.</label>
          </div>

          <div v-if="loading">Loading houses...</div>
          <div v-if="error">{{ error }}</div>
        </div>
      </main>

      <!-- Lateral derecho, visible solo en sm+ -->
      <aside class="d-none d-sm-block col-sm-2 "></aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import HomeService, { type House } from '@/services/HomeService'
import CardHouse from '@/components/CardHouse.vue'
import { useUserStore } from '@/stores/user_info'

const currentUser = ref<{ id: number, username: string } | null>(null)
const homeService = new HomeService()
const houses = ref<House[]>([])
const filtered_houses = ref<House[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)
const successful_search = ref<boolean>(true)
const sheard = ref<string>('')
const number_results = ref<number>(0)
const ordering_by = ref<'Price' | 'Size'>('Price')
const activeButton = ref<'Price' | 'Size'>('Price')

const router = useRouter()

onMounted(async () => {
  const userStore = useUserStore()
  currentUser.value = userStore.user
  await getDates()
})

const getDates = async () => {
  try {
    loading.value = true
    await homeService.fetchAll()
    houses.value = homeService.houses.value
    filtered_houses.value = [...houses.value] // copia nueva
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
    filtered_houses.value = [...houses.value]
    number_results.value = 0
    successful_search.value = true
  } else {
    const searchTerm = sheard.value.toLowerCase()
    filtered_houses.value = houses.value.filter((house) => {
      const zip = house.location?.zip?.toLowerCase() || ''
      const city = house.location?.city?.toLowerCase() || ''
      return zip.includes(searchTerm) || city.includes(searchTerm)
    })
    number_results.value = filtered_houses.value.length
    successful_search.value = number_results.value > 0
  }

  filtering_hauses(ordering_by.value)
}

watch(sheard, filtering_locations)

const clear_imput = () => {
  sheard.value = ''
  filtered_houses.value = [...houses.value]
  number_results.value = 0
  successful_search.value = true
  filtering_hauses(ordering_by.value)
}

const filtering_hauses = (new_ordering: 'Price' | 'Size') => {
  ordering_by.value = new_ordering
  activeButton.value = new_ordering

  // Ordenar sin modificar el original
  filtered_houses.value = [...filtered_houses.value].sort((a, b) => {
    if (new_ordering === 'Price') return a.price - b.price
    if (new_ordering === 'Size') return a.size - b.size
    return 0
  })

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
.row1 {
  height: 150px;
}

h1 {
  font-family: 'Montserrat', sans-serif;
  align-content: center;
}

#button_create_new {
  background-color: #eb5440;
  color: #ffffff;
  height: 30px;
  width: 150px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  align-self: center;

}

.input_container button {
  all: unset;
  cursor: pointer;
}


input {
  height: 35px;
  width: 350px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #E8E8E8;
  border: none;


}

input::placeholder {
  padding-left: 5%;
}


.icon {
  width: 20px;
  height: 20px;
  position: absolute;
}

#icon-search {
  position: absolute;
  left: 5%;
  top: 20%;
}

#icon-clean {
  right: 5%;
  bottom: 15%;
}

.button_container {
  position: absolute;
  display: flex;

}

.button_container button {
  background-color: #EB5440;
  color: white;
  cursor: pointer;
  height: 30px;
  width: 120px;
  border-radius: 7px;
  border: none;

}

#img_empty_houses {
  height: 200px;
  width: auto;
}

/* Vista móvil */
@media (max-width: 576px) {
  .row1 {
    flex-direction: column;
    height: auto;
  }

  .row1 h1 {
    text-align: center;
    width: 100%;
    margin-bottom: 10px;
  }

  .row1 .d-flex.justify-content-between {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .input_container {
    width: 100%;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
  }

  .button_container {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    position: static;
    width: 100%;
  }

  .button_container button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
