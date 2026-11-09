import Link from 'next/link';
import { collectionNav, siteNav } from '@/data/creative';

// 데스크톱 왼쪽 패널. 사이트 이동 + 컬렉션 목록.
const Sidebar = () => {
  return (
    <aside className='sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col gap-2 p-3 lg:flex'>
      <div className='rounded-[10px] bg-cr-panel px-5 py-5'>
        <Link href='/' className='block text-[15px] font-bold tracking-[-0.01em]'>
          HYUNWOO<span className='text-cr-accent'>.</span>
        </Link>
        <p className='mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40'>creative / ai works</p>
        <ul className='mt-6 space-y-1'>
          {siteNav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className='block rounded-md px-2 py-1.5 text-[14px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white'>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex-1 rounded-[10px] bg-cr-panel px-5 py-5'>
        <p className='font-mono text-[10px] uppercase tracking-[0.22em] text-white/40'>Collections</p>
        <ul className='mt-4 space-y-1'>
          {collectionNav.map((c) => (
            <li key={c.kind}>
              {c.ready ? (
                <a href={`#${c.kind}`} className='flex items-center justify-between rounded-md bg-white/[0.06] px-2 py-2 text-[14px] font-semibold text-white'>
                  {c.label}
                  <span className='h-1.5 w-1.5 rounded-full bg-cr-accent' />
                </a>
              ) : (
                <span className='flex items-center justify-between px-2 py-2 text-[14px] text-white/30'>
                  {c.label}
                  <span className='font-mono text-[9px] uppercase tracking-[0.18em]'>soon</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
