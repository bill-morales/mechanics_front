import apiClient from "@/services/api";
import type { Ihistorial } from "./types";

export class historialService {
  static async getHistoriales(page: number, pageSize: number) {
    const url = `/products/movements?page=${page}&page_size=${pageSize}`;
    return await apiClient.get(url);
  }
  static async getHistorialesID(id:number,page: number, pageSize: number) {
    const url = `/products/movements/${id}/product?page=${page}&page_size=${pageSize}`;
    return await apiClient.get(url);
  }
  static async createHistorial(data: Ihistorial) {
    return await apiClient.post("/products/movements", data);
  }
}