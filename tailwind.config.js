/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#050510',
        'primary-blue': '#6534FF',
        'primary-gray': '#97979B',
        'secondary-gray': '#55555C',
        'primary-placeholder': '#c3c3c6',
        'primary-input-bg': '#f7f7f8',
        'test-red': '#ff0000',
      },
    },
  },
  plugins: [],
};
