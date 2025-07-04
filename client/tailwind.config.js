/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5EABD6',
          hover: '#4A9BC6',
          light: '#7BB8DD',
          dark: '#4A8BB6'
        },
        accent: {
          light: '#FEFBC7',
          DEFAULT: '#FFB4B4',
          dark: '#FF9B9B'
        },
        cta: {
          DEFAULT: '#E14434',
          hover: '#D13A2A',
          light: '#F25A4A'
        }
      }
    },
  },
  plugins: [],
}

