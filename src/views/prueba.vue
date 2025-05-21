<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import HomeService, { type House } from '@/services/HomeService'
import NewCardHouse from '@/components/CardHouse.vue'

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