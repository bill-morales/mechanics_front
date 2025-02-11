<script setup lang="ts">
import ButtonV from '@/components/buttonV.vue';
import FormProveedor from '@/views/dashboard/proveedor/FormProveedor.vue';
import { useModalStore } from '@/stores/modalStore';
import type { IProveedor } from './types';
import AlertForDelete from '@/components/AlertForDelete.vue';
import { ProveedorService } from './proveedorService';
import { onMounted, ref } from 'vue';

const PROVEDOR_DATA: IProveedor[] = [
    {
        id: 1,
        name: 'Proveedor 1',
        code: '123456',
        address: 'Calle 123',
        phone_number: '1234567890',
        ruc: '1234567890',
    },
    {
        id: 1,
        name: 'Proveedor 2',
        code: '123456',
        address: 'Calle 123',
        phone_number: '1234567890',
        ruc: '1234567890',
    },
    {
        id: 1,
        name: "Proveedor 3",
        code: "434343",
        address: "Calle 123",
        phone_number: "1234567890",
        ruc: "1234567890",
    }
]
const proveedores = ref<IProveedor[]>([])
const listarProveedores = async()=>{
 try {
  const response= await  ProveedorService.getProveedores()
  proveedores.value = response.data.results
console.log(response)
 } catch (error) {
    console.error(error);
    
 }
}
onMounted(()=>{
    listarProveedores()
})
//USE MODAL STORE
const modalStore = useModalStore()

const openNewProveedor = () => {
    modalStore.openModal('Nuevo Proveedor', FormProveedor, {
        proveedor: null
    })
}

const handleDelete = async (item: IProveedor) => {
    try {
       const res = await ProveedorService.deleteProveedores(item)
       console.log(res)
        listarProveedores()
        modalStore.closeModal()
    } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
    }
    console.log("peticion para elimianar proveedor"+item)
}

const openDelteProveedor = (item: IProveedor) => {
    modalStore.openModal('Eliminar Proveedor', AlertForDelete, {
        msg: "Seguro que quieres eliminar el proveedor?",
        onDelete: () => handleDelete(item)
    })
} 

const openModalEditProveedor = (action: string, item: IProveedor) => {
    modalStore.openModal('Nuevo Proveedor', FormProveedor, {
        proveedor: item,
        listarProvs:()=>listarProveedores()
    })
}

</script>

<template>

    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-center">
            <div class=" overflow-x-scroll w-full lg:w-5/6 ">
                <div>
                    <button class="btn btn-success" @click="openNewProveedor">NUEVO</button>
                </div>
                <table class="text-sm text-left  text-gray-500 dark:text-gray-400 w-full">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
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
                        <tr v-for="(item, _) in proveedores" :key="item.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                {{ item.name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.address }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.phone_number }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.code }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.ruc }}
                            </td>
                            <td class="px-6 py-4 space-x-2">
                                <ButtonV @click="openModalEditProveedor('edit', item)" title="Editar" modifer="btn-info btn-sm" />
                                <ButtonV @click="openDelteProveedor(item)" title="Eliminar" modifer="btn-error btn-sm" />
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




</template>