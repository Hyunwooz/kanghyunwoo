import Link from 'next/link';
import { nav } from '@/data/portfolio';

const SITE = [
  { label: 'Home', href: '/' },
  { label: 'Archive', href: '/archive' },
  { label: 'Creative', href: '/creative' },
];

const LINK = 'text-quiet-mute transition-colors hover:text-quiet-ink';

// 상단 바. 이름, 섹션 이동, 사이트 이동. 전부 같은 크기의 작은 글자다.
const TopBar = () => {
  return (
    <header className='sticky top-0 z-30 border-b border-quiet-line bg-quiet-paper/90 backdrop-blur-md'>
      <div className='mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 text-[13px] md:px-10 lg:px-14'>
        <a href='#top' className='font-medium tracking-[-0.01em]'>
          Hyunwoo Kang
        </a>
        <nav className='hidden items-center gap-7 md:flex'>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={LINK}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className='flex items-center gap-5'>
          {SITE.map((s) => (
            <Link key={s.href} href={s.href} className={LINK}>
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
