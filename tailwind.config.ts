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
        // 포트폴리오(종이): 순백·순흑 없이. accent 는 번호와 밑줄에만.
        paper: '#F4F1EA',
        ink: '#161616',
        muted: '#75716A',
        rule: '#D8D3C8',
        accent: '#C8401F',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'var(--font-pretendard)', 'Georgia', 'serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'bounce-updown': 'bounce-updown 1s infinite ease-in-out',
        blink: 'blink 1s infinite',
        'archive-rise': 'archive-rise 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'archive-fade': 'archive-fade 500ms ease-out forwards',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
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
        'archive-rise': {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'archive-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
