import { forwardRef } from 'react';
import { WORDMARK_VIEWBOX, wordmarkLetters, type WordmarkLetter } from '@/data/wordmark';

interface WordmarkSvgProps {
  className?: string;
  // 기본은 HYUNWOO. 푸터는 footerWordmarkLetters 를 넘겨 WOOHYUN. 으로 뒤집는다.
  letters?: WordmarkLetter[];
  label?: string;
}

// 글자마다 path 가 나뉜 워드마크. 마지막 점(accent)은 원본의 아포스트로피 역할.
const WordmarkSvg = forwardRef<SVGSVGElement, WordmarkSvgProps>(({ className, letters = wordmarkLetters, label = 'HYUNWOO.' }, ref) => (
  <svg
    ref={ref}
    viewBox={WORDMARK_VIEWBOX}
    className={className}
    fill='currentColor'
    aria-label={label}
    role='img'
    style={{ overflow: 'visible', display: 'block', width: '100%', height: 'auto' }}
  >
    {letters.map((letter, index) => (
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
