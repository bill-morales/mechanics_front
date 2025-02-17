<script setup lang="ts">
import { defineForm, field, isValidForm, toObject } from "vue-yup-form";
import * as yup from 'yup';
import { onMounted, ref, shallowRef } from 'vue';
import type { Iproducto } from './types';
import { productoService } from "./productoService";
import { ProveedorService } from "../proveedor/proveedorService";
import type { IProveedor } from "../proveedor/types";
import { tipoProductService } from "../tipoProducto/tipoproductService";
import type { ItipoProducto } from "../tipoProducto/types";
import { marcaService } from "../marca/marcaService";
import type { Imarca } from "../marca/types";

interface ProductoProps {
    data: {
        producto: Iproducto | null,
        onClose: (res: boolean) => void
    }
}
const flag = ref(0)
const flag2 = ref(0)
const flag3 = ref(0)
const proveedores = ref<IProveedor[]>([])
const tipoProductos = ref<ItipoProducto[]>([])
const marcas = ref<Imarca[]>([])
const props = defineProps<ProductoProps>()
const totalProveedores = async (currentPage: number, pageSize: number) => {
    try {
        const response1 = await ProveedorService.getProveedores(currentPage, pageSize)
        const response2 = await tipoProductService.getTipoProducto(currentPage, pageSize)
        const response3 = await marcaService.getMarca(currentPage, pageSize)
        proveedores.value = response1.data.results
        tipoProductos.value = response2.data.results
        marcas.value = response3.data.results
        flag.value = proveedores.value[0].id || 2
        flag2.value = tipoProductos.value[0].id || 2
        flag3.value = marcas.value[0].id || 2
    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
    totalProveedores(1, 50)
})
const generateForm = (producto: Iproducto | null = null) => {
    return defineForm({
        code_product: field(producto?.code_product || '', yup.string().required('Codigo producto requerido')),
        model: field(producto?.model || '', yup.string().required('modelo requerido')),
        high: field(producto?.high || '', yup.string().nullable()),
        width: field(producto?.width || '', yup.string().nullable()),
        long: field(producto?.long || '', yup.string().nullable()),
        diameter_ext: field(producto?.diameter_ext || '', yup.string().nullable()),
        diameter_int: field(producto?.diameter_int || '', yup.string().nullable()),
        inf_extra: field(producto?.inf_extra || '', yup.string().required('detalles requerido')),
        stock_initial: field(producto?.inventory.cant || 0, yup.number().required('stock requerido').typeError('Debe ser un número')),
        id_supplier: field(producto?.id_supplier || flag, yup.number().required('proveedor requerido')),
        id_type_product: field(producto?.id_type_product || flag2, yup.number().required('proveedor requerido')),
        id_mark_product: field(producto?.id_mark_product || flag3, yup.number().required('proveedor requerido')),
    })
}
const submitted = ref(false);
const submitting = ref(false);
const form = shallowRef(generateForm(props.data.producto));

const handleSubmit = async () => {
    submitted.value = true;
    submitting.value = true;
    console.log(form.value)
    if (!isValidForm(form.value)) return
    const producto: Iproducto = toObject(form.value);
    producto.id = props.data.producto?.id;
    try {
        props.data.producto ? await productoService.updateProducto(producto): await productoService.createProducto(producto)
        props.data.onClose(true)
    } catch (error: any) {
        console.error(error.message)
    }
}
</script>
<template>
    <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">

    <form class="card-body" @submit.prevent="handleSubmit">
        <div class="form-control">
            <label class="label">
                <span class="label-text">Codigo producto</span>
            </label>
            <input type="text" placeholder="Ingrese codigo producto" class="input input-bordered input-sm"
                v-model="form.code_product.$value" />
            <p v-if="submitted && form.code_product.$error" class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{ form.code_product.$error?.message }}</span>
            </p>

        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Modelo</span>
            </label>
            <input type="text" placeholder="Ingrese modelo" class="input input-bordered input-sm"
                v-model="form.model.$value" />
            <p v-if="submitted && form.model.$error" class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{ form.model.$error?.message }}</span>
            </p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Alto</span>
            </label>
            <input type="text" placeholder="Ingrese alto" class="input input-bordered input-sm" v-model="form.high.$value" />
            <p v-if="submitted && form.high.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.high.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Ancho</span>
            </label>
            <input type="text" placeholder="Ingrese ancho" class="input input-bordered input-sm" v-model="form.width.$value" />
            <p v-if="submitted && form.width.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.width.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">longitud</span>
            </label>
            <input type="text" placeholder="Ingrese longitud" class="input input-bordered input-sm" v-model="form.long.$value" />
            <p v-if="submitted && form.long.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.long.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">diametro exterior</span>
            </label>
            <input type="text" placeholder="Ingrese diametro exterior" class="input input-bordered input-sm"
                v-model="form.diameter_ext.$value" />
            <p v-if="submitted && form.diameter_ext.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.diameter_ext.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">diametro interior</span>
            </label>
            <input type="text" placeholder="Ingrese diametro interior" class="input input-bordered input-sm"
                v-model="form.diameter_int.$value" />
            <p v-if="submitted && form.diameter_int.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.diameter_int.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">detalle</span>
            </label>
            <input type="text" placeholder="Ingrese detalle" class="input input-bordered input-sm"
                v-model="form.inf_extra.$value" />
            <p v-if="submitted && form.inf_extra.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.inf_extra.$error.message }}</span></p>
        </div>
        <div class="form-control" v-if="!props.data.producto">
            <label class="label">
                <span class="label-text">stock inicial</span>
            </label>
            <input type="number" placeholder="Ingrese stock inicial" class="input input-bordered input-sm"
                v-model="form.stock_initial.$value" />
            <p v-if="submitted && form.stock_initial.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.stock_initial.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">proveedor</span>
            </label>
            <select class="select select-bordered  select-sm w-auto" v-model="form.id_supplier.$value">
                <!-- <option disabled selected>Who shot first?</option> -->
                <option :value="item.id" :key="item.id" v-for="item in proveedores">{{ item.name }}</option>
            </select>
            <p v-if="submitted && form.id_supplier.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.id_supplier.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">tipo de producto</span>
            </label>
            <select class="select select-bordered  select-sm w-auto" v-model="form.id_type_product.$value">
                <!-- <option disabled selected>Who shot first?</option> -->
                <option :value="item.id" :key="item.id" v-for="item in tipoProductos">{{ item.name }}</option>
            </select>
            <p v-if="submitted && form.id_type_product.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.id_type_product.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Marca</span>
            </label>
            <select class="select select-bordered  select-sm w-auto" v-model="form.id_mark_product.$value">
                <!-- <option disabled selected>Who shot first?</option> -->
                <option :value="item.id" :key="item.id" v-for="item in marcas">{{ item.name }}</option>
            </select>
            <p v-if="submitted && form.id_mark_product.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.id_mark_product.$error.message }}</span></p>
        </div>
        <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">guardar</button>
        </div>
    </form>
</template>