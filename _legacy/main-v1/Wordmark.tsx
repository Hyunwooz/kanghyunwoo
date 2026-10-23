import { twMerge } from 'tailwind-merge';

interface WordmarkProps {
  className?: string;
}

// 화면 폭에 딱 맞게 늘어나는 워드마크 (textLength 로 글리프 폭을 강제)
const Wordmark = ({ className }: WordmarkProps) => {
  return (
    <svg
      viewBox='0 0 1000 150'
      className={twMerge('block w-full', className)}
      aria-hidden
    >
      <text
        x='0'
        y='146'
        textLength='1000'
        lengthAdjust='spacingAndGlyphs'
        fontSize='205'
        fontWeight='800'
        letterSpacing='-10'
        fill='currentColor'
      >
        WOOHYUN
      </text>
    </svg>
  );
};

export default Wordmark;
