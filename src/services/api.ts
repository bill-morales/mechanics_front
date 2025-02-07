import axios from 'axios';

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: 'https://api.example.com', // Cambia esto a tu URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Solicitud
apiClient.interceptors.request.use(
  (config) => {
    // Agregar un encabezado de autenticación
    const token = localStorage.getItem('token');
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
        case 401:
          // Redirigir al usuario a la página de inicio de sesión si no está autorizado
          window.location.href = '/login';
          break;
        case 403:
          // Manejar el caso de acceso prohibido
          console.error('Acceso prohibido:', error.response.data.message);
          break;
        case 404:
          // Manejar el caso de recurso no encontrado
          console.error('Recurso no encontrado:', error.response.data.message);
          break;
        case 500:
          // Manejar el caso de error interno del servidor
          console.error('Error interno del servidor:', error.response.data.message);
          break;
        default:
          // Manejar otros códigos de estado
          console.error('Error en la respuesta:', error.response.data.message);
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Algo pasó al configurar la solicitud que desencadenó un error
      console.error('Error al configurar la solicitud:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

//fetch('usuariototal',()) data= [{nbio},{ahsie}......] //404 haz etso 405 esto 500 esto
