import { API_URL } from "@/constants"
import type { IUser } from "@/types/user";
import axios from "axios"

export const login = async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', username)
    formData.append('password', password)
    const url = API_URL + '/auth/token';
    return await axios.post(url, formData)
}

export const loginMe = async (token: string) => {
    const url = API_URL + '/auth/me';
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.get<IUser>(url, config)
}
