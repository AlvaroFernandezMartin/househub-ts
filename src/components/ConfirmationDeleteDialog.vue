<template>
  <div class="modal-backdrop d-flex justify-content-center align-items-center">
    <div class="dialog-box text-center p-4 bg-white rounded shadow">
      <h3 class="title">Delete listing</h3>
      <p class="text-description">Are you sure you want to delete this listing?</p>
      <p class="text-description mb-4">This action cannot be undone.</p>
      <div class="d-flex flex-column gap-2">
        <button class="btn-confirm" @click="confirm">YES, DELETE</button>
        <button class="btn-cancel" @click="cancel">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.dialog-box {
  max-width: 400px;
  width: 90%;
  background: #ffffff;
  border-radius: 12px;
}

.title {
  color: #000000;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  margin-bottom: 12px;
}

.text-description {
  color: #4A4B4C;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  margin: 0;
}

.btn-confirm {
  width: 100%;
  padding: 12px;
  background-color: #EB5440;
  color: white;
  border: none;
  border-radius: 999px;
  font-weight: bold;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #c24030;
}

.btn-cancel {
  width: 100%;
  padding: 12px;
  background-color: #4A4B4C;
  color: white;
  border: none;
  border-radius: 999px;
  font-weight: bold;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: #2f2f2f;
}
</style>
