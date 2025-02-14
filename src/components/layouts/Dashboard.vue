<script setup lang="ts">
import { reactive, ref } from 'vue'
import HeaderDash from './HeaderDash.vue'
interface RutasDash {
   name: string,
   icon: string,
   href: string,
   current: boolean
}
const rutasDash = reactive<RutasDash[]>([
   {
      name: 'Dashboard',
      icon: 'fa-solid fa-gauge',
      href: 'dashboard-productos',
      current: false
   },
   {
      name: 'productos',
      icon: 'fa-solid fa-gauge',
      href: 'dashboard-productos',
      current: false
   },
   {
      name: 'Proveedores',
      icon: 'fa-solid fa-truck',
      href: 'dashboard-Proveedores',
      current: false
   },
   {
      name: 'Tipo productos',
      icon: 'fa-solid fa-gauge',
      href: 'dashboard-tipoproductos',
      current: false
   },
   {
      name: 'Marcas',
      icon: 'fa-solid fa-gauge',
      href: 'dashboard-marcas',
      current: false
   }
])
const isToogle = ref(false)
const toggle = () => {
   isToogle.value = !isToogle.value
}
</script>

<template>

   <button @click="toggle" type="button"
      class="fixed bottom-5 right-5 items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:bg-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
         xmlns="http://www.w3.org/2000/svg">
         <path clip-rule="evenodd" fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
         </path>
      </svg>
   </button>

   <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0"
      :class="[isToogle ? '' : '-translate-x-full']" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
         <ul class="space-y-6 font-medium">
            <li v-for="ruta in rutasDash" :key="ruta.name">
               <router-link :to="{ name: ruta.href }"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <font-awesome-icon :icon="ruta.icon" />
                  <span class="ms-3">{{ ruta.name }}</span>
               </router-link>
            </li>
         </ul>
      </div>
   </aside>

   <div class="p-0 sm:ml-64">
      <HeaderDash/>
      <router-view />
   </div>
</template>
