/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        light: '#FBFADA',
        normal: '#ADBC9F',
        medium: '#436850',
        deep: '#12372A',
      },
      animation: {
        'bounce-updown': 'bounce-updown 1s infinite ease-in-out',
      },
      keyframes: {
        'bounce-updown': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
