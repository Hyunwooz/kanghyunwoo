/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1720px',
      },
      colors: {
        light: '#F6F6E0',
        normal: '#ADBC9F',
        medium: '#436850',
        main: '#FFFFF5',
        background: '#12372A',
        tagColor: '#66d9ed',
        funcColor: '#6de58b',
        closeColor: '#BB77FF',
      },
      animation: {
        'bounce-updown': 'bounce-updown 1s infinite ease-in-out',
        blink: 'blink 1s infinite',
      },
      keyframes: {
        'bounce-updown': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
