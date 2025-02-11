import { ref } from "vue"

export const usePagination = () => {
    const currentPage = ref(1)
    const total = ref(0)
    const pageSize = ref(10)

    const nextPage = () => {
        const limit = Math.ceil(total.value / pageSize.value)
        if (currentPage.value >= limit) return
        currentPage.value++
    }

    const prevPage = () => {
        if (currentPage.value <= 1) return
        currentPage.value--
    }

    const resetPage = () => {
        currentPage.value = 1
    }

    const changePageSize = (size: number) => {
        pageSize.value = size
        resetPage()
    }

    const setTotal = (totalData: number) => {
        total.value = totalData
    }

    return {
        currentPage, total, pageSize, nextPage, prevPage, resetPage, changePageSize, setTotal
    }
}

