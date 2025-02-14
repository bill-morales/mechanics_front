import apiClient from "@/services/api";
import type { IResponsePagination } from "@/types/reponse";
import type { Iproducto } from "./types";

export class productoService{
    static async getProducto(page: number, pageSize: number) {
        const url = `/products?page=${page}&page_size=${pageSize}`
        return  await  apiClient.get<IResponsePagination<Iproducto>>(url);
    }
    static async getIdProducto(id:number){
        const url = `/products/${id}/product`
        return  await apiClient.get(url);
    }
    static async createProducto(data:Iproducto){
        return  await apiClient.post("/products",data);
    }
    static async updateProducto(data:Iproducto){
        return  await apiClient.put(`/products`,data);
    }
    static async deleteProducto(data:Iproducto){
        return  await apiClient.delete(`/products/${data.id}/product`);
    }
    static async getMoviProducto(id:number,page: number, pageSize: number){
        const url = `/products/movements/${id}/product?page=${page}&page_size=${pageSize}/products/movements/${id}/product?page=${page}&page_size=${pageSize}`
        return  await apiClient.post(url);
    }
}