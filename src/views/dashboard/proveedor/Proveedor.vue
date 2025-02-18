<script setup lang="ts">
import ButtonV from '@/components/buttonV.vue';
import FormProveedor from '@/views/dashboard/proveedor/FormProveedor.vue';
import { useModalStore } from '@/stores/modalStore';
import type { IProveedor } from './types';
import AlertForDelete from '@/components/AlertForDelete.vue';
import { ProveedorService } from './proveedorService';
import { onMounted, ref, watch } from 'vue';
import { usePagination } from '@/pagination/usePagination';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

const proveedores = ref<IProveedor[]>([])

const { currentPage, total, pageSize, nextPage, prevPage, changePageSize, setTotal } = usePagination()

const listarProveedores = async (currentPage: number, pageSize: number) => {
    try {
        const response = await ProveedorService.getProveedores(currentPage, pageSize)
        proveedores.value = response.data.results
        setTotal(response.data.count)
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    listarProveedores(currentPage.value, pageSize.value)
})
//USE MODAL STORE
const modalStore = useModalStore()

const openNewProveedor = () => {
    modalStore.openModal('Nuevo Proveedor', FormProveedor, {
        proveedor: null,
        onClose: function (res: boolean) {
            if (res) {
                listarProveedores(1, pageSize.value)
                modalStore.closeModal()
                $toast.success('Proveedor creado correctamente!', { duration: 3000 });
            }
        }
    })
}

const handleDelete = async (item: IProveedor) => {
    try {
        const res = await ProveedorService.deleteProveedores(item)
        console.log(res)
        listarProveedores(1, pageSize.value)
        modalStore.closeModal()
        $toast.info('Proveedor eliminado correctamente!', { duration: 3000 });
    } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
    }
    console.log("peticion para elimianar proveedor" + item)
}

const openDelteProveedor = (item: IProveedor) => {
    modalStore.openModal('Eliminar Proveedor', AlertForDelete, {
        msg: "Seguro que quieres eliminar el proveedor?",
        onDelete: () => handleDelete(item)
    })
}

const openModalEditProveedor = (item: IProveedor) => {
    modalStore.openModal('Nuevo Proveedor', FormProveedor, {
        proveedor: item,
        onClose: function (res: boolean) {
            if (res) {
                listarProveedores(currentPage.value, pageSize.value)
                modalStore.closeModal()
                $toast.success('Proveedor actualizado correctamente!', { duration: 3000 });
            }
        }
    })
}

watch([pageSize, currentPage], ([newPageSize, newCurrentPage], _) => {
    listarProveedores(newCurrentPage, newPageSize)
})

</script>

<template>
    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-start lg:w-5/6 gap-5">
            <div>
                <button class="btn btn-success" @click="openNewProveedor">NUEVO</button>
            </div>
        </div>
    </div>
    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-center">
            <div class=" overflow-x-scroll w-full lg:w-5/6 ">
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
                                <ButtonV @click="openModalEditProveedor(item)" title="Editar"
                                    modifer="btn-info btn-sm" />
                                <ButtonV @click="openDelteProveedor(item)" title="Eliminar"
                                    modifer="btn-error btn-sm" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-5 sm:w-5/6 w-full gap-4  flex justify-between items-center">
                <div class=" space-x-4">
                    <p class="inline">filas por página </p>
                    <select class="select select-bordered  select-sm w-auto"
                        @change="(e) => changePageSize(parseInt((e.target as HTMLSelectElement).value))"
                        :value="pageSize">
                        <!-- <option disabled selected>Who shot first?</option> -->
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div class=" space-x-4">
                    <span class="text-sm text-gray-700">
                        Mostrando <span class="font-semibold text-gray-900 ">{{ currentPage * pageSize - pageSize + 1
                        }}</span> a <span class="font-semibold text-gray-900 ">{{ pageSize * currentPage }}</span>
                        de <span class="font-semibold text-gray-900 ">{{ total }}</span>
                        registros
                    </span>
                    <div class="join">
                        <button class="join-item btn" @click="prevPage">«</button>
                        <button class="join-item btn" @click="nextPage">»</button>
                    </div>
                </div>
            </div>
        </div>
    </div>




</template>