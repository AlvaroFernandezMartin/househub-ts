<template>
  <div class="container">
    <div class="column-left"></div>
    <div class="column-main">
      <div class="exit_container">
        <button @click="goToHomePage()" id="button_back">
          <img src="../assets/ic_back_grey@3x.png" alt="exit_arrow" />
        </button>
        <label>Back to overview</label>
      </div>
      <h1>{{ formTitle }}</h1>
      <form @submit.prevent="checkInputs">
        <div class="form_group full_width">
          <label for="streetName">Street name*</label>
          <input id="streetName" v-model="form.streetName" type="text" placeholder="Enter the street name" />
        </div>

        <div class="form_group split_width">
          <div class="column">
            <label for="houseNumber">House number*</label>
            <input id="houseNumber" v-model="form.houseNumber" type="text" placeholder="Enter house number" />
          </div>
          <div class="column">
            <label for="numberAddition">Addition (optional)</label>
            <input id="numberAddition" v-model="form.numberAddition" type="text" placeholder="e.g. A" />
          </div>
        </div>

        <div class="form_group full_width">
          <label for="zip">Postal code*</label>
          <input id="zip" v-model="form.zip" type="text" placeholder="e.g. 1000 AA" />
        </div>

        <div class="form_group full_width">
          <label for="city">City*</label>
          <input id="city" v-model="form.city" type="text" placeholder="e.g. Utrecht" />
        </div>

        <div class="form_group full_width">
          <label for="upload_picture">Upload picture (PNG or JPG)*</label>
          <img :src="previewImage || defaultImage" alt="Upload Picture" class="upload-img" @click="triggerFileInput"
            :style="{ width: '100px', height: '100px', objectFit: 'cover' }" />
          <input
            id="upload_picture"
            type="file"
            accept="image/png, image/jpeg"
            class="file-input"
            @change="handleFileUpload"
            ref="fileInput"
            style="display: none;"
          />
        </div>

        <div class="form_group full_width">
          <label for="price">Price*</label>
          <input id="price" v-model="form.price" type="text" placeholder="e.g. €150,000" />
        </div>

        <div class="form_group split_width">
          <div class="column">
            <label for="size">Size*</label>
            <input id="size" v-model="form.size" type="text" placeholder="e.g. 60m2" />
          </div>
          <div class="column">
            <label for="hasGarage">Garage*</label>
            <select id="hasGarage" v-model="form.hasGarage">
              <option value="" disabled selected>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <div class="form_group split_width">
          <div class="column">
            <label for="bedrooms">Bedrooms*</label>
            <input id="bedrooms" v-model="form.bedrooms" type="number" min="0" placeholder="Enter amount" />
          </div>
          <div class="column">
            <label for="bathrooms">Bathrooms*</label>
            <input id="bathrooms" v-model="form.bathrooms" type="number" min="0" placeholder="Enter amount" />
          </div>
        </div>

        <div class="form_group full_width">
          <label for="constructionYear">Construction date*</label>
          <input id="constructionYear" v-model="form.constructionYear" type="text" placeholder="e.g. 1990" />
        </div>

        <div class="form_group full_width">
          <label for="description">Description*</label>
          <textarea id="description" v-model="form.description" placeholder="Enter description"></textarea>
        </div>

        <button type="submit" id="button">{{ formButtonText }}</button>
      </form>
      <p v-if="requiered_fild" style="color: red;">Required field missing</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import defaultImage from '../assets/ic_upload@3x.png'
import HomeService from '@/services/HomeService'
import { useRouter } from 'vue-router'

const router = useRouter()
const homeService = new HomeService()

const previewImage = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const requiered_fild = ref(false)

const form = ref({
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  price: '',
  size: '',
  hasGarage: '',
  bedrooms: '',
  bathrooms: '',
  constructionYear: '',
  description: '',
})

const props = defineProps<{
  mode?: 'edit' | 'create'
  id?: number
}>()

const formTitle = computed(() => (props.mode === 'edit' ? 'Edit listing' : 'Create new listing'))
const formButtonText = computed(() => (props.mode === 'edit' ? 'UPDATE' : 'POST'))

onMounted(async () => {
  if (props.id) {
    try {
      const houseData = await homeService.fetchById(props.id)
      const house = houseData 

      if (!house) return

      form.value = {
        streetName: house.location.street,
        houseNumber: house.location.houseNumber.toString(),
        numberAddition: house.location.houseNumberAddition ?? '',
        zip: house.location.zip,
        city: house.location.city,
        price: house.price.toString(),
        size: house.size.toString(),
        hasGarage: house.hasGarage ? 'true' : 'false',
        bedrooms: house.rooms.bedrooms.toString(),
        bathrooms: house.rooms.bathrooms.toString(),
        constructionYear: house.constructionYear.toString(),
        description: house.description,
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }
})

const validateInputs = (): boolean => {
  requiered_fild.value = false
  let allFieldsCompleted = true

  for (const [key, value] of Object.entries(form.value)) {
    const element = document.getElementById(key)
    if (element) {
      if (!value) {
        element.style.border = '1px solid red'
        requiered_fild.value = true
        allFieldsCompleted = false
      } else {
        element.style.border = ''
      }
    }
  }

  return allFieldsCompleted
}

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const checkInputs = async () => {
  if (!validateInputs()) {
    console.error('Missing required fields.')
    return
  }

  const preparedData = {
    price: Number(form.value.price),
    size: Number(form.value.size),
    constructionYear: Number(form.value.constructionYear),
    hasGarage: form.value.hasGarage === 'true',
    description: form.value.description,
    rooms: {
      bedrooms: Number(form.value.bedrooms),
      bathrooms: Number(form.value.bathrooms),
    },
    location: {
      street: form.value.streetName,
      houseNumber: Number(form.value.houseNumber),
      houseNumberAddition: form.value.numberAddition,
      city: form.value.city,
      zip: form.value.zip,
    },
  }

  try {
    let houseId: number | undefined
    if (props.mode === 'edit' && props.id !== undefined) {
      houseId = props.id
      await homeService.updateHouse(houseId, preparedData)
    } else {
      houseId = await homeService.createHouse(preparedData)
    }

    const imageFile = fileInput.value?.files?.[0]
    if (imageFile && houseId !== undefined) {
      await homeService.insertImg(houseId, imageFile)
    }

    if (houseId !== undefined) {
      goToHouseDetail(houseId)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const goToHomePage = () => {
  router.push({ name: 'Home' })
}

const goToHouseDetail = (houseId: number) => {
  router.push({ name: 'HouseDetail', params: { id: houseId } })
}
</script>


<style scoped>

.container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
  background-image: url('../assets/img_background@3x.png');
  background-size: cover;
  background-attachment: fixed;

}

.column-left {
  width: 15%;
  height: auto;
}

.column-main {
  position: relative;
  width: 20%;
  height: auto;
}

/* Exit arrow */
.exit_container{
display: flex;
margin-top: 10%;
margin-bottom: 2.5%;
}
.exit_container label{
color: #000000;
font-family: 'Open Sans', sans-serif;
font-weight: bold;
display: block;
}
#button_back{
  all: unset;
  cursor: pointer;

}
#button_back img{
  height: 25px;
  width: auto;
  margin-right: 15px;
}
/* form styles */

h1{
  font-family: 'Montserrat', sans-serif;
}

input , select{
  all: unset;
  background-color: #ffffff;
  height: 40px;
  border-radius: 10px;
  padding-left: 10px;
}

label{
  font-family: 'Open Sans', sans-serif;
  font-weight: bolder;
}
.form_group{
margin-top: 5px;
}
.full_width input{
    width: 100%;
}
.split_width{
  display: flex;
  gap: 30px;
}
.split_width input{
  width: 100%;
}
.column{
  width: 100%;
}

form label {
  display: block;
  margin-bottom: 8px;
}

form input,form select,form textarea {
  margin-bottom: 10px;
}
/* File input */

.upload-img {
  cursor: pointer;
  border: 2px solid #cccccc;
  border-radius: 5px;
}
.file-input {
  display: none;
}


#description{
  all: unset;
  background-color: #ffffff;
  width: 100%;
  height: 150px;
  border-radius: 10px;;
}


#hasGarage{
  width: 100%;
  text-indent: 10px;
  line-height: 40px;

}

#button{
  all: unset;
  background-color: #EB5440;
  width: 50%;
  height: 40px;
  margin-left: 50%;
  margin-top: 20px;
  border-radius: 10px;
  text-align: center;
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;


}
#button:hover{
  background-color: #ee260b;

}
</style>

