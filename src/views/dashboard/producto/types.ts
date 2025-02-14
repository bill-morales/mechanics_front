import type { Imarca } from "../marca/types"
import type { IProveedor } from "../proveedor/types"
import type { ItipoProducto } from "../tipoProducto/types"

export interface Iproducto {
    id?: number
    code?: string
    code_product: string
    model: string
    id_supplier: number
    id_type_product: number
    id_mark_product: number
    high: string
    width: string
    long: string
    diameter_ext: string
    diameter_int: string
    inf_extra: string
    stock_initial: number
    supplier?: IProveedor
    type_product?: ItipoProducto
    mark_product?: Imarca
    inventory?: any
  }
export interface FilterProductos {
  id_supplier: string
  id_type_product: string
  id_mark_product: string
}