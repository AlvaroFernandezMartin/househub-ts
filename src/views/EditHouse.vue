<template>
  <FormHouse mode="edit" :id="id" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import FormHouse from '@/components/FormHouse.vue'

const route = useRoute()
const id = ref<number>(parseInt(route.params.id as string))
</script>
