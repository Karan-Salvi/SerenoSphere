/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf8fc',
          100: '#f4f0f8',
          200: '#e9e0f0',
          300: '#d8c8e3',
          400: '#c2a8d2',
          500: '#a888bd',
          600: '#8b5a9f',
          700: '#7a4c89',
          800: '#663f71',
          900: '#56365e',
          950: '#371f3c'
        },
        secondary: {
          50: '#fef7f7',
          100: '#feecec',
          200: '#fcdcdc',
          300: '#f9c0c0',
          400: '#f49494',
          500: '#eb6666',
          600: '#d84444',
          700: '#b53333',
          800: '#952e2e',
          900: '#7c2b2b',
          950: '#431212'
        },
        accent: {
          50: '#fef9f3',
          100: '#fef2e6',
          200: '#fce2c7',
          300: '#f9cc9d',
          400: '#f4b2c7',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7c2d12',
          950: '#431407'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}