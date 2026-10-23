import { forwardRef } from 'react';
import { WORDMARK_VIEWBOX, wordmarkLetters } from '@/data/wordmark';

interface WordmarkSvgProps {
  className?: string;
}

// 글자마다 path 가 나뉜 워드마크. 마지막 점(accent)은 원본의 아포스트로피 역할.
const WordmarkSvg = forwardRef<SVGSVGElement, WordmarkSvgProps>(({ className }, ref) => (
  <svg
    ref={ref}
    viewBox={WORDMARK_VIEWBOX}
    className={className}
    fill='currentColor'
    aria-label='WOOHYUN.'
    role='img'
    style={{ overflow: 'visible', display: 'block', width: '100%', height: 'auto' }}
  >
    {wordmarkLetters.map((letter, index) => (
      <path
        key={index}
        d={letter.d}
        data-letter-path={letter.accent ? undefined : ''}
        data-accent-path={letter.accent ? '' : undefined}
      />
    ))}
  </svg>
));

WordmarkSvg.displayName = 'WordmarkSvg';

export default WordmarkSvg;
