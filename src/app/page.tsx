import Link from 'next/link';

// TODO: 새 메인 페이지로 교체 예정 (임시 페이지)
const App = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0a0a0a] text-white'>
      <span className='text-[11px] uppercase tracking-[0.3em] text-white/40'>
        WoohDev
      </span>
      <nav className='flex gap-8 text-sm uppercase tracking-[0.25em] text-white/70'>
        <Link href='/archive' className='transition-colors hover:text-white'>
          Archive
        </Link>
        <Link href='/portfolio' className='transition-colors hover:text-white'>
          Portfolio
        </Link>
      </nav>
    </main>
  );
};

export default App;
