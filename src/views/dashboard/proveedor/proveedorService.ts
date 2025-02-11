import apiClient from "@/services/api";
import type { IResponsePagination } from "@/types/reponse";
import type { IProveedor } from "@/views/dashboard/proveedor/types";
export class ProveedorService{
    static async getProveedores(page: number, pageSize: number) {
        const url = `/suppliers?page=${page}&page_size=${pageSize}`
        return  await apiClient.get<IResponsePagination<IProveedor>>(url);
    }
    static async createProveedores(data:IProveedor){
        return  await apiClient.post("/suppliers",data);
    }
    static async updateProveedores(data:IProveedor){
        return  await apiClient.put("/suppliers",data);
    }
    static async deleteProveedores(data:IProveedor){
        return  await apiClient.delete(`/suppliers/${data.id}/supplier`);
    }
}
