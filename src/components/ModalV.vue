<script setup lang="ts">
import { ref, watch } from 'vue';
interface ModalProps {
    modelValue: boolean;
}
interface emit {
    (event: 'update:modelValue', value: boolean): void;
}
const modal = ref<HTMLDialogElement | null>(null);
const props = defineProps<ModalProps>()
const emit = defineEmits<emit>()

watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        modal.value?.showModal()
    } else {
        modal.value?.close()
    }
})
const closeModal = () => {
    emit('update:modelValue', false)
}
</script>
<template>
    <dialog ref="modal" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <slot name="title"></slot>
            <slot name="content"></slot>
            <slot name="footer"></slot>
        </div>
    </dialog>
</template>