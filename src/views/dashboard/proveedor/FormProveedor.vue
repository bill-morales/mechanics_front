<script setup lang="ts">
import { defineForm, field, isValidForm, toObject } from "vue-yup-form";

import * as yup from 'yup';
import { ref, shallowRef } from 'vue';
import type { IProveedor } from "./types";
import { ProveedorService } from "./proveedorService";

interface ProveedorProps {
    data: {
        proveedor: IProveedor | null,
        onClose: (res: boolean) => void
    }
}

const props = defineProps<ProveedorProps>()

const generateForm = (proveedor: IProveedor | null = null) => {
    return defineForm({
        name: field(proveedor?.name || '', yup.string().required('Nombre requerido')),
        code: field(proveedor?.code || '', yup.string().required('Codigo requerido')),
        address: field(proveedor?.address || '', yup.string().required('Direccion requerido')),
        phone_number: field(proveedor?.phone_number || '', yup.string().required('Telefono requerido')),
        ruc: field(proveedor?.ruc || '', yup.string().required('RUC requerido').matches(/^[0-9]+$/, 'El RUC debe contener solo números')),
    })
}
const submitted = ref(false);
const submitting = ref(false);
const form = shallowRef(generateForm(props.data.proveedor));


const handleSubmit = async () => {
    submitted.value = true;
    submitting.value = true;
    if (!isValidForm(form.value)) return
    const proveedor: IProveedor = toObject(form.value);
    proveedor.id = props.data.proveedor?.id;
    try {
     props.data.proveedor ?  await ProveedorService.updateProveedores(proveedor) : await ProveedorService.createProveedores(proveedor)
    //   if (props.data.listarProvs) await props.data.listarProvs()
    //   props.data.listarProvs?.()
    //   modalStore.closeModal() 
        props.data.onClose(true)
    } catch (error:any) {
      console.error(error.message)        
    }
}
</script>

<template>
    <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">

    <form class="card-body" @submit.prevent="handleSubmit">
        <div class="form-control">
            <label class="label">
                <span class="label-text">Nombre</span>
            </label>
            <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm"
                v-model="form.name.$value" />
            <p v-if="submitted && form.name.$error" class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{ form.name.$error?.message }}</span>
            </p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Dirección</span>
            </label>
            <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm"
                v-model="form.address.$value" />
            <p v-if="submitted && form.address.$error" class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{ form.address.$error?.message }}</span>
            </p>

        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Teléfono</span>
            </label>
            <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm"
                v-model="form.phone_number.$value" />
            <p v-if="submitted && form.phone_number.$error" class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{ form.phone_number.$error?.message }}</span>
            </p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Codigo</span>
            </label>
            <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm"
                v-model="form.code.$value" />
            <p v-if="submitted && form.code.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.code.$error.message }}</span></p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">RUC</span>
            </label>
            <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm"
                v-model="form.ruc.$value" />
            <p v-if="submitted && form.ruc.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.ruc.$error.message }}</span></p>
        </div>

        <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">guardar</button>
        </div>
    </form>
</template>