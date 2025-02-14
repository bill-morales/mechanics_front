import apiClient from "@/services/api";
import type { IResponsePagination } from "@/types/reponse";
import type { ItipoProducto } from "./types";
export class tipoProductService{
    static async getTipoProducto(page: number, pageSize: number) {
        const url = `/typeproducts?page=${page}&page_size=${pageSize}`
        return  await apiClient.get<IResponsePagination<ItipoProducto>>(url);
    }
    static async createTipoProducto(data:ItipoProducto){
        return  await apiClient.post("/typeproducts",data);
    }
    static async updateTipoProducto(data:ItipoProducto){
        return  await apiClient.put("/typeproducts",data);
    }
   static async deleteTipoProducto(data:ItipoProducto){
       return  await apiClient.delete(`/suppliers/${data.id}/supplier`);
   }
}