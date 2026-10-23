import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface PillProps {
  href: string;
  children: React.ReactNode;
  icon?: string;
  external?: boolean;
  // 먹색 배경 위에서는 반전
  inverted?: boolean;
  className?: string;
}

const Pill = ({
  href,
  children,
  icon = '→',
  external,
  inverted,
  className,
}: PillProps) => {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={twMerge(
        'group inline-flex h-11 items-center gap-3 rounded-full border px-5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
        inverted
          ? 'border-paper/40 text-paper hover:bg-paper hover:text-ink'
          : 'border-ink bg-ink text-paper hover:bg-transparent hover:text-ink',
        className,
      )}
    >
      {children}
      <span className='transition-transform group-hover:translate-x-1'>
        {icon}
      </span>
    </Link>
  );
};

export default Pill;
