<script setup lang="ts">
import ButtonV from '@/components/buttonV.vue';
import { onMounted, ref, watch } from 'vue';
import type { FilterProductos, Iproducto } from './types';
import { usePagination } from '@/pagination/usePagination';
import { productoService } from './productoService';
import { useModalStore } from '@/stores/modalStore';
import FormProducto from './FormProducto.vue';
import { useToast } from 'vue-toast-notification';
import router from '@/router';
import AlertForDelete from '@/components/AlertForDelete.vue';
import { marcaService } from '../marca/marcaService';
import type { Imarca } from '../marca/types';
import { tipoProductService } from '../tipoProducto/tipoproductService';
import type { ItipoProducto } from '../tipoProducto/types';
import { ProveedorService } from '../proveedor/proveedorService';
import type { IProveedor } from '../proveedor/types';
const $toast = useToast();
const filter = ref<FilterProductos>({
    id_supplier: '0',
    id_type_product: '0',
    id_mark_product: '0'
})
const productos = ref<Iproducto[]>([])
const marcas = ref<Imarca[]>([])
const tipoProductos = ref<ItipoProducto[]>([])
const proveedores = ref<IProveedor[]>([])
const { currentPage, total, pageSize, nextPage, prevPage, changePageSize, setTotal, resetPage } = usePagination()
const listarProductos = async (currentPage: number, pageSize: number, filter: FilterProductos) => {
    try {
        const response = await productoService.getProducto(currentPage, pageSize, filter)
        productos.value = response.data.results
        setTotal(response.data.count)
    } catch (error) {
        console.error(error);
    }
}
const listarMarcas = async (currentPage: number, pageSize: number) => {
    const response = await marcaService.getMarca(currentPage, pageSize)
    marcas.value = response.data.results
    console.log(marcas.value)
}
const listartipoProducto = async (currentPage: number, pageSize: number) => {
    const response = await tipoProductService.getTipoProducto(currentPage, pageSize)
    tipoProductos.value = response.data.results
    console.log(tipoProductos.value)
}
const listarProveedor = async (currentPage: number, pageSize: number) => {

    const response = await ProveedorService.getProveedores(currentPage, pageSize)
    proveedores.value = response.data.results
    console.log(proveedores.value)

}
onMounted(() => {
    listarProductos(currentPage.value, pageSize.value, filter.value)
    listarMarcas(currentPage.value, pageSize.value)
    listartipoProducto(currentPage.value, pageSize.value)
    listarProveedor(currentPage.value, pageSize.value)
    console.log(marcas.value)

})
const goToHistorial = (id: number) => {
    router.push({ name: 'dashboard-productos-mov', params: { id } })
}
//USE MODAL STORE
const modalStore = useModalStore()
const openNewProducto = () => {
    modalStore.openModal('Nuevo Producto', FormProducto, {
        producto: null,
        onClose: function (res: boolean) {
            if (res) {
                listarProductos(1, pageSize.value, filter.value)
                modalStore.closeModal()
                $toast.success('Producto creado correctamente!', { duration: 3000 });
            }
        }
    })
}
const openEditModal = (item: Iproducto) => {
    modalStore.openModal('Editar Producto', FormProducto, {
        producto: item,
        onClose: function (res: boolean) {
            if (res) {
                listarProductos(currentPage.value, pageSize.value, filter.value)
                modalStore.closeModal()
                $toast.success('Producto actualizado correctamente!', { duration: 3000 });
            }
        }
    })
}
const handleDelete = async (item: Iproducto) => {
    try {
        const res = await productoService.deleteProducto(item)
        console.log(res)
        listarProductos(1, pageSize.value, filter.value)
        modalStore.closeModal()
        $toast.info('Producto eliminado correctamente!', { duration: 3000 });
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
const handlerFilter = async () => {
    listarProductos(1, pageSize.value, filter.value)

}
const handlerLimpiar = async () => {
    filter.value.id_supplier = '0'
    filter.value.id_type_product = '0'
    filter.value.id_mark_product = '0'
    listarProductos(1, pageSize.value, filter.value)
    resetPage()

}
watch([pageSize, currentPage], ([newPageSize, newCurrentPage]) => {
    listarProductos(newCurrentPage, newPageSize, filter.value)
    console.log(filter.value)
})
</script>
<template>
    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-start lg:w-5/6 gap-5">
            <div>
                <button class="btn btn-success" @click="openNewProducto">NUEVO</button>
            </div>
            <div class="gap-5 w-full lg:w-5/6 flex">
                <select id="countries" v-model="filter.id_mark_product"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled value="0">Marca</option>
                    <option :value="item.id" v-for="item in marcas" selected>{{ item.name }}</option>
                </select>
                <select id="countries" v-model="filter.id_type_product"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled value="0">Tipos</option>
                    <option :value="item.id" v-for="item in tipoProductos" selected>{{ item.name }}</option>
                </select>
                <select id="countries" v-model="filter.id_supplier"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled value="0">Proveedores</option>
                    <option :value="item.id" v-for="item in proveedores" selected>{{ item.name }}</option>
                </select>
                <ButtonV @click="handlerFilter" title="filtrar" modifer="btn-info btn-md" />
                <ButtonV @click="handlerLimpiar" title="Limpiar" modifer="btn-warning  btn-md" />

            </div>
        </div>
    </div>
    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-center">
            <div class=" overflow-x-scroll w-full lg:w-5/6 ">
                <table class="text-sm text-left  text-gray-500 dark:text-gray-400 w-full table table-md">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="">
                                Tipo
                            </th>
                            <th scope="col" class="">
                                Codigo
                            </th>
                            <th scope="col" class="">
                                Modelo
                            </th>
                            <th scope="col" class="text-center">
                                proveedor
                            </th>
                            <th scope="col" class="text-center">
                                marca
                            </th>
                            <th scope="col" class="text-center">
                                stock
                            </th>
                            <th scope="col" class="">
                                Altura
                            </th>
                            <th scope="col" class="">
                                Ancho
                            </th>
                            <th scope="col" class="">
                                Largo
                            </th>
                            <th scope="col" class="">
                                diametro externo
                            </th>
                            <th scope="col" class="text-center">
                                detalles
                            </th>
                            <th scope="col" class="text-center">
                                acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in productos" :key="item.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="text-nowrap">
                                {{ item.type_product?.name }}
                            </td>
                            <td class="">
                                {{ item.code_product }}
                            </td>
                            <td class="">
                                {{ item.model }}
                            </td>
                            <td class="text-nowrap">
                                {{ item.supplier?.name }}
                            </td>
                            <td class="">
                                {{ item.mark_product?.name }}
                            </td>
                            <td class="">
                                {{ item.inventory.cant }}
                            </td>
                            <td class="">
                                {{ item.high }}
                            </td>
                            <td class="">
                                {{ item.width }}
                            </td>
                            <td class="">
                                {{ item.long }}
                            </td>
                            <td class="">
                                {{ item.diameter_ext }}
                            </td>
                            <td class="">
                                {{ item.inf_extra }}
                            </td>
                            <td class="flex gap-3">
                                <ButtonV @click="openEditModal(item)" title="Editar" modifer="btn-info btn-sm" />
                                <ButtonV @click="item?.id !== undefined && goToHistorial(Number(item.id))"
                                    title="historial" modifer="btn-warning btn-sm" />
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
                            }}</span> to <span class="font-semibold text-gray-900 ">{{ pageSize * currentPage }}</span>
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