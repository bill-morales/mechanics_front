<script setup lang="ts">
import ButtonV from '@/components/buttonV.vue';
import ModalV from '@/components/ModalV.vue';
import { ref } from 'vue';
const isModalOpen = ref(false)
const openModal = () => {
    isModalOpen.value = true
}


</script>
<template>
    <ButtonV />

    <!-- You can open the modal using ID.showModal() method -->
    <button class="btn btn-info" @click="openModal">open modal</button>
    <ModalV v-model="isModalOpen">
        <template #title>
            <h1 class="text-xl font-bold text-center">Proveedores</h1>
        </template>
        <template #content>
            <form class="card-body">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">ID</span>
                    </label>
                    <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm" required />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Nombre</span>
                    </label>
                    <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm" required />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Dirección</span>
                    </label>
                    <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm" required />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Teléfono</span>
                    </label>
                    <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm" required />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Codigo</span>
                    </label>
                    <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm" required />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">RUC</span>
                    </label>
                    <input id="email" type="text" placeholder="Usuario" class="input input-bordered input-sm" required />
                </div>

                <div class="form-control mt-6">
                    <button type="submit" class="btn btn-primary">guardar</button>
                </div>
            </form>
        </template>

    </ModalV>
</template>