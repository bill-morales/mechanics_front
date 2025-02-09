import { defineStore } from "pinia";
import { markRaw, reactive } from "vue";

interface ModalStoreState {
    isOpen: boolean
    innerComponent: any
    title: string,
    contentProps: any
}

export const useModalStore = defineStore('modalStore', () => {
    const modalState = reactive<ModalStoreState>({
        isOpen: false,
        innerComponent: null,
        title: '',
        contentProps: {}
    })
    const openModal = (title: string, component: any, contentProps: any) => {
        modalState.innerComponent = markRaw(component)
        modalState.title = title
        modalState.isOpen = true
        modalState.contentProps = contentProps
    }
    const closeModal = () => {
        modalState.innerComponent = null
        modalState.title = ''
        modalState.contentProps = {}
        modalState.isOpen = false
    }
    return { modalState, openModal, closeModal }
})
