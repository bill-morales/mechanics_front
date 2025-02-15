import { defineStore } from "pinia";
import { ref } from "vue";

interface UserStoreState {
    userName: string | null
    token: string | null
    isAuthenticated: boolean
}

const initialState: UserStoreState = {
    userName: null,
    token: null,
    isAuthenticated: false
}

const getStateFromLocalStorage = () => {
    const userDate = localStorage.getItem('user')
    if (!userDate) return initialState
    return JSON.parse(userDate) as UserStoreState
}

export const useAuthStore = defineStore('authStore', () => {
    const userStore = ref<UserStoreState>(getStateFromLocalStorage())
    const setAuthStore = (token: string, userName: string) => {
        userStore.value.token = token
        userStore.value.userName = userName
        userStore.value.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(userStore.value))
    }
    const resetAuthStore = () => {
        userStore.value.userName = null
        userStore.value.token = null
        userStore.value.isAuthenticated = false
        localStorage.removeItem('user')
    }
    return { userStore, setAuthStore, resetAuthStore }
})
