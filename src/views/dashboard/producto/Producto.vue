<script setup lang="ts">
import ButtonV from '@/components/buttonV.vue';
import { onMounted, ref } from 'vue';
import type { Iproducto } from './types';
import { usePagination } from '@/pagination/usePagination';
import { productoService } from './productoService';
import { useModalStore } from '@/stores/modalStore';
import FormProducto from './FormProducto.vue';
import { useToast } from 'vue-toast-notification';
import router from '@/router';
import AlertForDelete from '@/components/AlertForDelete.vue';
const $toast = useToast();
const productos = ref<Iproducto[]>([])
const { currentPage, total, pageSize, nextPage, prevPage, changePageSize, setTotal } = usePagination()
const listarProductos = async (currentPage: number, pageSize: number) => {
    try {
        const response = await productoService.getProducto(currentPage, pageSize)
        productos.value = response.data.results
        setTotal(response.data.count)
    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
    listarProductos(currentPage.value, pageSize.value)
})
const goToHistorial = (id: number) => {
    router.push({ name: 'dashboard-productos-mov', params: { id } })
}
//USE MODAL STORE
const modalStore = useModalStore()
const openNewProducto = ()=>{
    modalStore.openModal('Nuevo Producto', FormProducto, {
        producto: null,
        onClose: function (res: boolean) {
            if (res) {
                listarProductos(1, pageSize.value)
                modalStore.closeModal()
                $toast.success('Producto creado correctamente!', {duration: 3000});
            }
        }
    })
}
const openEditModal=(item:Iproducto)=>{
 modalStore.openModal('Editar Producto',  FormProducto, {
        producto: item,
        onClose: function (res: boolean) {
            if (res) {
                listarProductos(currentPage.value, pageSize.value)
                modalStore.closeModal()
                $toast.success('Producto actualizado correctamente!', {duration: 3000});
            }
        }
    })
}
const handleDelete = async (item: Iproducto) => {
    try {
        const res = await productoService.deleteProducto(item)
        console.log(res)
        listarProductos(1, pageSize.value)
        modalStore.closeModal()
        $toast.info('Producto eliminado correctamente!', {duration: 3000});
    } catch (error) {
        console.error("Error al eliminar tipo producto:", error);
    }
}
const openDelProducto = (item: Iproducto) => {
    modalStore.openModal('Eliminar Producto', AlertForDelete, {
        msg: "Seguro que quieres eliminar tipo producto?",
        onDelete: () => handleDelete(item)
    })
}
</script>
<template>
    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-center">
            <div class=" overflow-x-scroll w-full lg:w-5/6 ">
                <div>
                    <button class="btn btn-success" @click="openNewProducto">NUEVO</button>
                </div>
                <table class="text-sm text-left  text-gray-500 dark:text-gray-400 w-full">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Tipo de producto
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Codigo producto
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Modelo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Altura
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Ancho
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Largo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                diametro externo
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                detalles
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                stock
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                proveedor
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                marca
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in productos" :key="item.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                {{ item.type_product?.name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.code_product }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.model }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.high }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.width }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.long }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.diameter_ext }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.inf_extra }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.inventory.cant }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.supplier?.name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.mark_product?.name }}
                            </td>
                            <td class="px-6 py-4 flex gap-3">
                                <ButtonV @click="openEditModal(item)" title="Editar" modifer="btn-info btn-sm" />
                                <ButtonV @click="item?.id !== undefined && goToHistorial(Number(item.id))" title="historial" modifer="btn-warning btn-sm" />
                                <ButtonV @click="openDelProducto(item)" title="Eliminar" modifer="btn-error btn-sm" />
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
                        Showing <span class="font-semibold text-gray-900 ">{{ currentPage * pageSize - pageSize + 1
                            }}</span> to <span
                            class="font-semibold text-gray-900 ">{{ pageSize * currentPage }}</span>
                        of <span class="font-semibold text-gray-900 ">{{ total }}</span>
                        Entries
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