import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Dashboard from '@/components/layouts/Dashboard.vue'
import Producto from '@/views/dashboard/producto/Producto.vue'
import Proveedor from '@/views/dashboard/proveedor/Proveedor.vue'
import Ingreso from '@/views/dashboard/ingreso/Ingreso.vue'
import Login from '@/views/login/login.vue'
import { useAuthStore } from '@/stores/Auth'
import { PUBLIC_ROUTES } from './namedRoutes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    redirect: '/dashboard/productos',
    children: [
      {
        path: 'productos',
        name: 'dashboard-productos',
        component: Producto,
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Middleware
router.beforeEach((to, from, next) => {
  const { userStore } = useAuthStore();
  if (to.path == PUBLIC_ROUTES.LOGIN && userStore.isAuthenticated) {
    next("/dashboard")
  } else if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next(PUBLIC_ROUTES.LOGIN); // Redirigir al login si no está autenticado
  } else {
    next();
  }
});

export default router