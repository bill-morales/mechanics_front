import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Dashboard from '@/components/layouts/Dashboard.vue'
import Producto from '@/views/dashboard/producto/Producto.vue'
import Proveedor from '@/views/dashboard/proveedor/Proveedor.vue'
import Ingreso from '@/views/dashboard/ingreso/Ingreso.vue'
import Login from '@/views/login/login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'productos',
        name: 'dashboard-productos',
        component: Producto
      },
      {
        path: 'Proveedores',
        name: 'dashboard-Proveedores',
        component: Proveedor
      },
      {
        path: 'ingresos',
        name: 'dashboard-ingresos',
        component: Ingreso
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router