<script setup lang="ts">
import ButtonV from '@/components/buttonV.vue';
import { ref } from 'vue';
import ModalV from '@/components/ModalV.vue';
import FormProveedor from '@/components/formularios/FormProveedor.vue';
const isModalOpen = ref(false)
const currentAction = ref('')
const openModal = (action: string) => {
    isModalOpen.value = true
    currentAction.value = action
}

</script>

<template>

    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-center">
            <div class=" overflow-x-scroll w-full lg:w-5/6 ">
                <table class="text-sm text-left  text-gray-500 dark:text-gray-400 w-full">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Dirección
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Teléfono
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Codigo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                RUC
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td class="px-6 py-4">
                                Silver
                            </td>
                            <td class="px-6 py-4">
                                Laptop
                            </td>
                            <td class="px-6 py-4">
                                $2999
                            </td>
                            <td class="px-6 py-4">
                                <a href="#"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                            <td class="px-6 py-4">
                                $2999
                            </td>
                            <td class="px-6 py-4 space-x-2">
                                <ButtonV @click="openModal('edit')" title="Editar" modifer="btn-info btn-sm" />
                                <ButtonV @click="openModal('delete')" title="Eliminar" modifer="btn-error btn-sm" />
                            </td>
                        </tr>
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td class="px-6 py-4">
                                White
                            </td>
                            <td class="px-6 py-4">
                                Laptop PC
                            </td>
                            <td class="px-6 py-4">
                                $1999
                            </td>
                            <td class="px-6 py-4">
                                <a href="#"
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                            <td class="px-6 py-4">
                                Laptop PC
                            </td>
                            <td class="px-6 py-4">
                                Laptop PC
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-5 sm:w-5/6 w-full gap-4  flex justify-between items-center">
                <div class=" space-x-4">
                    <p class="inline">rows per page </p>
                    <select class="select select-bordered  select-sm w-auto">
                        <option disabled selected>Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
                <div class=" space-x-4">
                    <span class="text-sm text-gray-700">
                        Showing <span class="font-semibold text-gray-900 ">1</span> to <span
                            class="font-semibold text-gray-900 ">10</span> of <span
                            class="font-semibold text-gray-900 ">100</span>
                        Entries
                    </span>
                    <div class="join">
                        <button class="join-item btn">«</button>
                        <button class="join-item btn">»</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <ModalV v-model="isModalOpen">
        <template #title>
            <h1 v-if="currentAction === 'edit'" class="text-xl font-bold text-center">Proveedores</h1>
            <h1 v-if="currentAction === 'delete'" class="text-xl font-bold text-center">Eliminar Proveedor</h1>
        </template>
        <template #content>
            <div v-if="currentAction === 'edit'">
                <FormProveedor />
            </div>
            <div v-if="currentAction === 'delete'">
                <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">
                <p class="text-center my-5">Desea eliminar este registro?</p>
                <div class="text-right">
                    <ButtonV class="btn-error" title="Eliminar" modifer="btn-error" />
                </div>
            </div>
        </template>
    </ModalV>

</template>