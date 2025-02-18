<script setup lang="ts">
import { defineForm, field, isValidForm, toObject } from "vue-yup-form";

import * as yup from 'yup';
import { ref, shallowRef } from 'vue';
import type { ItipoProducto } from "./types";
import { tipoProductService } from './tipoproductService';


interface ProveedorProps {
    data: {
        tipoProducto: ItipoProducto | null,
        onClose: (res: boolean) => void
    }
}

const props = defineProps<ProveedorProps>()

const generateForm = (tipoProducto: ItipoProducto | null = null) => {
    return defineForm({
        name: field(tipoProducto?.name || '', yup.string().required('Nombre requerido')),
    })
}
const submitted = ref(false);
const submitting = ref(false);
const form = shallowRef(generateForm(props.data.tipoProducto));


const handleSubmit = async () => {
    submitted.value = true;
    submitting.value = true;
    if (!isValidForm(form.value)) return
    const tipoProducto: ItipoProducto = toObject(form.value);
    tipoProducto.id = props.data.tipoProducto?.id;
    try {
     props.data.tipoProducto ?  await tipoProductService.updateTipoProducto(tipoProducto) : await tipoProductService.createTipoProducto(tipoProducto)
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
            <input id="email" type="text" placeholder="Ingrese nombre" class="input input-bordered input-sm"
                v-model="form.name.$value" />
            <p v-if="submitted && form.name.$error" class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{ form.name.$error?.message }}</span>
            </p>
        </div>
        <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">guardar</button>
        </div>
    </form>
</template>