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
  padding: 0;
  margin: 0;
}
.page-content {
  background-color: #f4f4f4;
  min-height: 100vh;

}
</style>
