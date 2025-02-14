<script setup lang="ts">
import ModalTemplate from './components/ModalTemplate.vue';

</script>

<template>
    <router-view />
    <ModalTemplate />
</template>

<style>
.vue-toast {
  z-index: 9999 !important; /* Asegúrate de que sea mayor que el z-index del modal */
}
</style>