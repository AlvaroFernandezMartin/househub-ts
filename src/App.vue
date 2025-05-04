<template>
  <div class="d-none d-sm-block">
    <NavbarHauses />
  </div>
  <div class="page-content">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import NavbarHauses from '@/components/NavbarHauses.vue'

</script>

<style>
*{
  margin: 0 !important;
  padding: 0 !important;
}
.page-content {
  background-color: #f4f4f4;
  min-height: 100vh;
  /* background-color: #e03737; */

}
</style>
