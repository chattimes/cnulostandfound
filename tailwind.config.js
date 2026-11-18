/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cnu: {
          DEFAULT: '#006838', // 전남대학교 공식 상징 딥그린
          dark: '#004d2a',
          light: '#00874a',
          tint: '#e8f5ee',
          subtle: '#f0fdf4'
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
