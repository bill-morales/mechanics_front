import apiClient from "@/services/api";
import type { IResponsePagination } from "@/types/reponse";
import type { Imarca } from "./types";
export class marcaService{
    static async getMarca(page: number, pageSize: number) {
        const url = `/marks?page=${page}&page_size=${pageSize}`
        return  await apiClient.get<IResponsePagination<Imarca>>(url);
    }
    static async createMarca(data:Imarca){
        return  await apiClient.post("/marks",data);
    }
    static async updateMarca(data:Imarca){
        return  await apiClient.put("/marks",data);
    }
   static async deleteMarca(data:Imarca){
       return  await apiClient.delete(`/marks/${data.id}/mark`);
   }
}