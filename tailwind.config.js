/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // ต้องตรงกับที่คุณเขียน component
  ],
  theme: {
    extend: {
      colors: {
        brand: '#FF5722', // เพิ่มสี custom ได้
      },
    },
  },
  plugins: [],
}
