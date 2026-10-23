import { twMerge } from 'tailwind-merge';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

// 섹션 이름: ( the step aside ) 처럼 괄호로 감싼 본문 크기 라벨
export const Label = ({ children, className }: LabelProps) => (
  <span className={twMerge('text-[15px] md:text-base', className)}>
    ( {children} )
  </span>
);

// 항목 이름: 작은 모노 대문자 라벨
export const Mono = ({ children, className }: LabelProps) => (
  <span
    className={twMerge(
      'font-mono text-[11px] uppercase tracking-[0.12em] opacity-60',
      className,
    )}
  >
    {children}
  </span>
);

export default Label;
