/** @type {import('tailwindcss').Config} */
const config: any = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // ต้องตรงกับที่คุณเขียน component
  ],
  theme: {
    extend: {
      colors: {
        'brown-600': '#26231E',
        'brown-500': '#43403B',
        'brown-400': '#75716B',
        'brown-300': '#DAD6D1',
        'brown-200': '#EFEEEB',
        'brown-100': '#F9F8F6',
        'white': '#FFFFFF',
        'orange': '#F2B68C',
        'green': '#12B279',
        'green-light': '#D7F2E9',
        'red': '#EB5164',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1': '52px',
        'h2': '40px',
        'h3': '24px',
        'h4': '20px',
        'body-lg': '16px',
        'body-md': '14px',
        'body-sm': '12px',
      },
      fontWeight: {
        'regular': 400,
        'medium': 500,
        'bold': 700,
      },
    },
  },
  plugins: [],
}

export default config;