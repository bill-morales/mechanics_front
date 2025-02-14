<script setup lang="ts">
import { defineForm, field, isValidForm, toObject } from "vue-yup-form";
import * as yup from 'yup';
import type { Ihistorial } from "./types";
import { ref, shallowRef } from "vue";
import { historialService } from "./historialService";
interface HistorialProps {
    data: {
        historial: Ihistorial | null,
        onClose: (res: boolean) => void,
        id:number
    }
}
const selectMovement = [
    { value: 'ENTRADA', name: 'Entrada' },
    { value: 'SALIDA', name: 'Salida' },
]
//const historial = ref<Ihistorial>()
const props = defineProps<HistorialProps>()
const generateForm = (historial: Ihistorial | null = null) => {
    return defineForm({
        cant: field(historial?.cant || '', yup.number().required('cantidad requerido').typeError('cantidad debe ser un numero')),
        inf_ext: field(historial?.inf_ext || '', yup.string().required('detalles requerido')),
        type_movement: field(historial?.type_movement || 'ENTRADA', yup.string().required('tipo movimiento requerido')),
    })
}
const submitted = ref(false);
const submitting = ref(false);
const form = shallowRef(generateForm(props.data.historial));
const handleSubmit = async () => {
    console.log(props.data.historial)
    submitted.value = true;
    submitting.value = true;

    if (!isValidForm(form.value)) return
    const historial = toObject(form.value) as Ihistorial;
    historial.id_product = props.data.id;
    try {
        await historialService.createHistorial(historial)
        props.data.onClose(true)
    } catch (error) {
        console.error(error)
    }
}
</script>
<template>
    <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">

    <form class="card-body" @submit.prevent="handleSubmit">
        <div class="form-control">
            <label class="label">
                <span class="label-text">Cantidad</span>
            </label>
            <input id="email" type="number" placeholder="Usuario" class="input input-bordered input-sm"
                v-model="form.cant.$value" />
            <p v-if="submitted && form.cant.$error" class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{ form.cant.$error?.message }}</span>
            </p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Detalles</span>
            </label>
            <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm"
                v-model="form.inf_ext.$value" />
            <p v-if="submitted && form.inf_ext.$error" class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">{{ form.inf_ext.$error?.message }}</span>
            </p>
        </div>
        <div class="form-control">
            <label class="label">
                <span class="label-text">Tipo de movimiento</span>
            </label>
            <select class="select select-bordered  select-sm w-auto" v-model="form.type_movement.$value">
                <!-- <option disabled selected>Who shot first?</option> -->
                <option :value="item.value" :key="item.value" v-for="item in selectMovement">{{ item.name }}</option>
            </select>
            <p v-if="submitted && form.type_movement.$error" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                    class="font-medium">{{ form.type_movement.$error.message }}</span></p>
        </div>
        <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">guardar</button>
        </div>
    </form>
</template>