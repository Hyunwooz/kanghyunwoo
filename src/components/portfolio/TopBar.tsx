import Link from 'next/link';
import { nav } from '@/data/portfolio';

// 크림색 상단 바. 두꺼운 남색 밑선, 디스플레이 서체 이름, 모노 네비.
const TopBar = () => {
  return (
    <header className='sticky top-0 z-30 border-b-[3px] border-retro-ink bg-retro-cream'>
      <div className='mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 md:px-10 lg:px-14'>
        <a href='#top' className='font-display text-[16px] uppercase leading-none tracking-[0.02em] md:text-[18px]'>
          Hyunwoo<span className='text-retro-pink'>.</span>
        </a>
        <nav className='hidden items-center gap-6 md:flex'>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className='relative font-mono text-[11px] uppercase tracking-[0.16em] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-retro-pink after:transition-[width] after:duration-300 hover:after:w-full'
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className='flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]'>
          <Link
            href='/archive'
            className='retro-card-sm bg-retro-cream px-2.5 py-1 transition-colors hover:bg-retro-yellow'
          >
            Archive
          </Link>
          <Link
            href='/'
            className='retro-card-sm bg-retro-ink px-2.5 py-1 text-retro-cream transition-colors hover:bg-retro-violet'
          >
            Home
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
