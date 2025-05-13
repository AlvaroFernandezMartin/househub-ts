import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutInformation from '../views/AboutInformation.vue'
import AddNewHouse from '../views/AddNewHouse.vue'
import HouseDetail from '../views/HouseDetail.vue'
import EditHouse from '../views/EditHouse.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },

  {
    path: '/about',
    name: 'About',
    component: AboutInformation,
  },
  {
    path: '/add-new-house',
    name: 'NewHouse',
    component: AddNewHouse,
  },
  {
    path: '/edit-house/:id',
    name: 'EditHouse',
    component: EditHouse,
    props: true,
  },
  {
    path: '/house/:id',
    name: 'HouseDetail',
    component: HouseDetail,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
