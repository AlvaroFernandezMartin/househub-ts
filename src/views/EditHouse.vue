<template>
  <FormHouse v-bind="{ mode: 'edit', id: Number(route.params.id) }" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import FormHouse from '@/components/FormHouse.vue'

const route = useRoute()
</script>

