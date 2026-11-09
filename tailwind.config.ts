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
        // 크리에이티브(스트리밍 앱 느낌의 다크): 바탕·패널·강조색
        cr: {
          bg: '#0B0B10',
          panel: '#16161D',
          accent: '#8B7CFF',
        },
        // 포트폴리오(레트로/시티팝): 틸 바탕 위에 핑크·옐로·바이올렛. 외곽선과 글자는 남색 ink.
        retro: {
          teal: '#3BBCA9',
          deep: '#1F8F80',
          pink: '#F2588C',
          yellow: '#F8D257',
          violet: '#6A4CE8',
          cream: '#FFF3DF',
          ink: '#1A1838',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-pretendard)', 'Impact', 'sans-serif'],
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
