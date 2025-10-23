/** @type {import('tailwindcss').Config} */
const config: any = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // ต้องตรงกับที่คุณเขียน component
  ],
  safelist: [
    'text-h1',
    'text-h2',
    'text-h3',
    'text-h4',
    'text-body-lg',
    'text-body-md',
    'text-body-sm',
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
        'h1': ['52px', { lineHeight: '1.2' }],
        'h2': ['40px', { lineHeight: '1.2' }],
        'h3': ['24px', { lineHeight: '1.3' }],
        'h4': ['20px', { lineHeight: '1.4' }],
        'body-lg': ['16px', { lineHeight: '1.5' }],
        'body-md': ['14px', { lineHeight: '1.5' }],
        'body-sm': ['12px', { lineHeight: '1.5' }],
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