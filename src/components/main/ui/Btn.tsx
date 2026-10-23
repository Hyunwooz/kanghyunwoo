'use client';

import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { gsap } from '@/lib/gsap';

interface BtnProps {
  href: string;
  children: React.ReactNode;
  variant?: 'blend' | 'outline' | 'outline-dark';
  icon?: 'arrow' | 'at';
  className?: string;
  external?: boolean;
  [key: `data-${string}`]: string | boolean | undefined;
}

// noth.in 의 .btn: 대문자 작은 라벨 + 오른쪽 화살표. 호버 시 화살표 꼬리가 1.45배로 늘어난다.
const Btn = ({ href, children, variant = 'outline', icon = 'arrow', className, external, ...rest }: BtnProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const atRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const line = lineRef.current;
    const at = atRef.current;
    const width = line?.getBoundingClientRect().width ?? 0;
    const enter = () => {
      if (line) gsap.to(line, { width: width * 1.45, duration: 0.4, ease: 'power4.inOut', overwrite: 'auto' });
      if (at) gsap.to(at, { scale: 1.2, duration: 0.2, ease: 'power2.in' });
    };
    const leave = () => {
      if (line) gsap.to(line, { width, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
      if (at) gsap.to(at, { scale: 1, duration: 0.2, ease: 'power2.in' });
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={twMerge(
        'inline-flex items-center gap-[0.875rem] whitespace-nowrap rounded-full py-[1rem] pl-[1.25rem] pr-[2.25rem] text-[0.75rem] font-medium uppercase leading-[1.4] tracking-[0.078rem] max-lg:gap-3 max-lg:px-5 max-lg:py-3 max-lg:text-[11px]',
        // 부모가 mix-blend-difference 라서 흰 배경/검은 글자가 흰 화면 위에선 검은 버튼으로 보인다
        variant === 'blend' && 'bg-white text-black',
        variant === 'outline' && 'border border-white/40 text-white',
        variant === 'outline-dark' && 'border border-black/40 text-black',
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {icon === 'arrow' ? (
        <span className='relative flex h-[0.7rem] items-center'>
          <span ref={lineRef} className='block h-px w-[0.85rem] bg-current' />
          <svg viewBox='0 0 6 10' className='-ml-[0.3rem] h-[0.62rem] w-auto' fill='none' stroke='currentColor'>
            <polyline points='1,1 5,5 1,9' strokeWidth='1.1' />
          </svg>
        </span>
      ) : (
        <span ref={atRef} className='inline-block'>
          @
        </span>
      )}
    </a>
  );
};

export default Btn;
