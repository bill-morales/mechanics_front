import { defineStore } from "pinia";
import { ref } from "vue";
interface CounterState {
    count: number
}
interface UserState {
    name: string
}
// 'aXCVasdrqwrqwefadfgadg'
export const useCounter = defineStore('counter',()=>{
    const count = ref<CounterState>({count:0})
    const increment = () => count.value.count++
    return {count,increment}
})


