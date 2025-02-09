<template>
    <div class="max-w-sm w-full bg-white">
        <p class="text-gray-600 mb-4">{{ props.data.msg }}</p>
        <div class="flex justify-end">
            <button id="cancelarBtn"
                class="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2 hover:bg-gray-400" @click="modalStore.closeModal">Cancelar</button>
            <button id="eliminarBtn" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" @click="props.data.onDelete">Eliminar</button>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    data: {
        msg: string | null
        onDelete: () => void
    }
}

import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore()

const props = defineProps<Props>()

</script>
