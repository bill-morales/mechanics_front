import { useAuthStore } from '@/stores/Auth';
import axios from 'axios';
import { set } from 'date-fns';
import { useToast } from 'vue-toast-notification';
const $toast = useToast();
// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Cambia esto a tu URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Solicitud
apiClient.interceptors.request.use(
  (config) => {
    // Agregar un encabezado de autenticación
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejar errores de solicitud
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor de Respuesta
apiClient.interceptors.response.use(
  (response) => {
    // Modificar la respuesta si es necesario
    return response;
  },
  (error) => {
    // Manejar errores de respuesta
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      switch (error.response.status) {
        case 400:
          // Manejar el caso de error de validación
          $toast.error(error.response.data.detail, { duration: 3000 });
          break;
        case 401:
          // Redirigir al usuario a la página de inicio de sesión si no está autorizado
          const authStore = useAuthStore();
          // toas with on coinfirm button
          $toast.error('No autorizado, inicie sesión de nuevo', {
            duration: 2000, 
            onDismiss: () => {
              window.location.href = '/';
              authStore.resetAuthStore();
            },
            pauseOnHover: true,
          });
          break;
        case 403:
          // Manejar el caso de acceso prohibido
          $toast.error('Acceso prohibido');
          break;
        case 404:
          // Manejar el caso de recurso no encontrado
          $toast.error('Recurso no encontrado:');
          break;
        case 500:
          // Manejar el caso de error interno del servidor
          $toast.error('Error interno del servidor: Contacte a soporte técnico 926590107');

          break;
        default:
          // Manejar otros códigos de estado
          console.error('Error en la respuesta:', error.response.data.message);
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      $toast.error('El servidor no responde, contacte a soporte técnico 926590107');
    } else {
      // Algo pasó al configurar la solicitud que desencadenó un error
      $toast.error('Error al configurar la solicitud:');

    }
    return Promise.reject(error);
  }
);

export default apiClient;

//fetch('usuariototal',()) data= [{nbio},{ahsie}......] //404 haz etso 405 esto 500 esto
