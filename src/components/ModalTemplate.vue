<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore';
import { computed, ref, watch } from 'vue';

const modal = ref<HTMLDialogElement | null>(null);
const modalStore = useModalStore();
const contentComponent = computed(() => modalStore.modalState.innerComponent)
const title = computed(() => modalStore.modalState.title)
const contentProps = computed(() => modalStore.modalState.contentProps)

const closeModal = () => {
    modalStore.closeModal()
}

watch(() => modalStore.modalState.isOpen, (newValue) => {
    if (newValue) {
        modal.value?.showModal()
    } else {
        modal.value?.close()
    }
})

</script>

<template>
    <dialog ref="modal" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h1>{{ title }}</h1>
            <!-- <component :is="contentComponent" v-bind="contentProps" /> -->
            <component :is="contentComponent" :data="contentProps"/>
        </div>
    </dialog>
</template>