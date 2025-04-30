<template>
  <div class="container">
    <div class="modal">
      <h2>Delete listing</h2>
      <p>Are you sure you want to delet this listing?</p>
      <p>This action cant be undone</p>
      <div class="buttons">
        <button id="confirm" @click="confirm">YES,DELETE</button>
        <button id="cancel" @click="cancel">GO BACK</button>
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
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 600px;
    height: 300px;
  }

  h2{
    color: #000000;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    margin-top: 3%;
    margin-bottom: 3%;
  }

  p{
    color: #4A4B4C;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
  }
  .buttons {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #confirm {
    width: 60%;
    background-color: #EB5440;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  #cancel {
    width: 60%;
    background-color: #ccc;
    color: #4A4B4C;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  #confirm:hover {
    background-color: #c24030;
  }

  #cancel:hover {
    background-color: #a1a1a1;
  }
</style>
