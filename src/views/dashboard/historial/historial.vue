<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { productoService } from '../producto/productoService';
import type { Iproducto } from '../producto/types';
import { useToast } from 'vue-toast-notification';
import { usePagination } from '@/pagination/usePagination';
import { historialService } from './historialService';
import type { Ihistorial } from './types';
import { useModalStore } from '@/stores/modalStore';
import FormHistorial from './FormHistorial.vue';
import { formatDateFromString } from '@/utils/date_utils';
const $toast = useToast();
const modalStore = useModalStore()
const { currentPage, total, pageSize, nextPage, prevPage, changePageSize, setTotal } = usePagination()
interface Props {
    id: number
}
const camposProducto = [
    { key: 'type_product', key2: 'name', label: 'tipo Producto' },
    { key: 'code_product', label: 'Codigo Producto' },
    { key: 'model', label: 'modelo' },
    { key: 'supplier.name', label: 'Proveedor' },
    { key: 'mark_product.name', label: 'Marca' },
    { key: 'info_extra', label: 'detalles' },
    { key: 'high', label: 'alto' },
    { key: 'width', label: 'ancho' },
    { key: 'long', label: 'largo' },
    { key: 'diameter_ext', label: 'diametro externo' },
    { key: 'diameter_int', label: 'diametro interno' },
    // { key: 'stock', label: 'Stock' },
]
const producto = ref<Iproducto>()
const props = defineProps<Props>()
const historiales = ref<Ihistorial[]>([])
const getProducto = async () => {
    try {
        const response = await productoService.getIdProducto(props.id);
        producto.value = response.data;
        console.log(producto.value)
    } catch (error) {
        console.error(error)
    }
}
const listarhistorial = async (currentPage: number, pageSize: number) => {
    try {
        const response = await historialService.getHistorialesID(props.id, currentPage, pageSize)
        historiales.value = response.data.results
        console.log(historiales.value)
        setTotal(response.data.count)
    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
    console.log(props.id)
    getProducto()
    listarhistorial(currentPage.value, pageSize.value)
})

const openNewHistorial = () => {
    modalStore.openModal('Nuevo Historial', FormHistorial, {
        historial: null,
        onClose: function (res: boolean) {
            if (res) {
                listarhistorial(1, pageSize.value)
                getProducto()
                modalStore.closeModal()
                $toast.success('Historial creado correctamente!', { duration: 3000 });
            }
        },
        id: props.id
    })
}


watch([pageSize, currentPage], ([newPageSize, newCurrentPage]) => {
    listarhistorial(newCurrentPage, newPageSize)
})
</script>
<template>
    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-center">
            <div class="overflow-x-scroll w-full lg:w-5/6 ">
                <table class="text-sm text-left  text-gray-500 dark:text-gray-400 w-full table table-md">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th v-for="(item, _) in camposProducto" :key="item.key" scope="col" class="">
                                <p>{{ item.label }}</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                            <td scope="col" class="">
                                <p>{{ producto?.type_product?.name }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.code_product }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.model }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.supplier?.name }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.mark_product?.name }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.inf_extra }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.high }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.width }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.long }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.diameter_ext }}</p>
                            </td>
                            <td scope="col" class="">
                                <p>{{ producto?.diameter_int }}</p>
                            </td>

                            <!-- <td scope="col" class="px-6 py-3">
                                <p>{{ producto?.inventory.cant }}</p>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <div class="flex justify-center flex-col items-center mt-5 gap-4">
        <div class="w-full flex justify-center flex-col rounded-lg items-center">
            <div class=" overflow-x-scroll w-full lg:w-5/6 ">
                <div class="flex justify-between items-center">
                    <button class="btn btn-success" @click="openNewHistorial">NUEVO</button>
                    <div class="text-gray-700">
                        <p><span class="font-medium">Stock:</span> <span class="badge badge-success">{{
                            producto?.inventory?.cant || '0' }}</span></p>
                    </div>
                </div>
                <table class="text-sm text-left  text-gray-500 dark:text-gray-400 w-full">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Cantidad
                            </th>
                            <th scope="col" class="px-6 py-3 ">
                                detalle
                            </th>
                            <th scope="col" class="px-6 py-3 ">
                                tipo de movimiento
                            </th>
                            <th scope="col" class="px-6 py-3 ">
                                fecha
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, _) in historiales" :key="item.id"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="px-6 py-4">
                                {{ item.cant }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.inf_ext }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.type_movement }}
                            </td>
                            <td class="px-6 py-4">
                                {{ formatDateFromString(item.datetime_created) }}
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