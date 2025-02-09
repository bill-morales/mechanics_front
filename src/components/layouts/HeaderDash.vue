<script setup lang="ts">
import { PUBLIC_ROUTES } from '@/router/namedRoutes';
import { useAuthStore } from '@/stores/Auth';
import { useRouter } from 'vue-router';
    const authStore = useAuthStore()
    const router = useRouter()
    const logout = () => {
        authStore.resetAuthStore()
        router.push(PUBLIC_ROUTES.LOGIN)
    }
</script>

<template>
    <div class="navbar bg-gray-900" draggable="false">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl text-stone-300"  >Mecanica</a>
        </div>
        <div class="flex-none gap-2">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 p-2 shadow">
                    <li @click="logout"><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
