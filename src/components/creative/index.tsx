'use client';

import Link from 'next/link';
import { collections } from '@/data/creative';
import CollectionHeader from './CollectionHeader';
import Sidebar from './Sidebar';
import TrackList from './TrackList';
import { useDurations } from './useDurations';

const allTracks = collections.flatMap((c) => c.tracks);

// /creative : AI 로 만든 것들. 음악 스트리밍 앱처럼 — 왼쪽 패널, 컬렉션마다 그라디언트 머리 + 곡 목록.
// 아래 고정 플레이어(PlayerBar)는 루트 레이아웃에 있어서 다른 페이지로 가도 이어서 난다.
const CreativePage = () => {
  const durations = useDurations(allTracks);

  return (
    <div className='wd-creative min-h-screen bg-cr-bg text-white selection:bg-cr-accent selection:text-cr-bg'>
      <div className='mx-auto flex max-w-[1400px]'>
        <Sidebar />

        <main className='min-w-0 flex-1 space-y-3 p-2 pb-32 md:p-3'>
          {/* 모바일 상단 바 */}
          <div className='flex items-center justify-between px-3 py-3 lg:hidden'>
            <Link href='/' className='text-[15px] font-bold tracking-[-0.01em]'>
              HYUNWOO<span className='text-cr-accent'>.</span>
            </Link>
            <nav className='flex gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50'>
              <Link href='/archive' className='hover:text-white'>Archive</Link>
              <Link href='/portfolio' className='hover:text-white'>Portfolio</Link>
            </nav>
          </div>

          {collections.map((c) => (
            <section key={c.id} id={c.id} className='scroll-mt-3 rounded-[10px] bg-cr-panel/60'>
              <CollectionHeader collection={c} durations={durations} />
              <TrackList tracks={c.tracks} durations={durations} />
            </section>
          ))}

          <footer className='flex flex-col justify-between gap-2 px-4 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35 md:flex-row'>
            <span>© {new Date().getFullYear()} WoohDev — made with prompts.</span>
            <span>Video — soon</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default CreativePage;
