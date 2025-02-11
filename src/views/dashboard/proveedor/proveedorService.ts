import apiClient from "@/services/api";
import type { IProveedor } from "@/views/dashboard/proveedor/types";
export class ProveedorService{
    static async getProveedores(){
        return  await apiClient.get("/suppliers");
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
