import Link from 'next/link';
import { nav } from '@/data/portfolio';

// 얇은 상단 바. 이름 / 섹션 앵커 / 다른 페이지 링크.
const TopBar = () => {
  return (
    <header className='sticky top-0 z-30 border-b border-rule bg-paper/85 backdrop-blur-md'>
      <div className='mx-auto flex max-w-[1680px] items-center justify-between px-5 py-3.5 md:px-10 lg:px-14'>
        <a href='#top' className='font-serif text-[18px] leading-none tracking-[-0.01em]'>
          Hyunwoo Kang
        </a>
        <nav className='hidden items-center gap-7 md:flex'>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className='font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink'
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className='flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.16em]'>
          <Link href='/archive' className='text-muted transition-colors hover:text-ink'>
            Archive
          </Link>
          <Link href='/' className='text-muted transition-colors hover:text-ink'>
            Home
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
