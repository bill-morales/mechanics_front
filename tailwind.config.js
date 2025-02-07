/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // o 'media' o 'class'
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"], // Aquí especificas que solo quieres el tema claro
  },
}

