'use client';

import type { Collection } from '@/shared/types/creative';
import Cover from './Cover';
import { fmtTotal } from './format';
import { useCurrentTrack, usePlayer } from './store';

interface CollectionHeaderProps {
  collection: Collection;
  durations: Record<string, number>;
}

// 컬렉션 머리. 재생 중인 곡(없으면 첫 곡) 색으로 물든 그라디언트 위에 커버 + 제목 + 메타.
// 재생 중이면 큰 커버가 LP 처럼 돈다.
const CollectionHeader = ({ collection, durations }: CollectionHeaderProps) => {
  const current = useCurrentTrack();
  const playing = usePlayer((s) => s.playing);
  const inThisList = current ? collection.tracks.some((t) => t.id === current.id) : false;

  const shown = inThisList && current ? current : collection.tracks[0];
  const hue = shown?.hue ?? 260;
  const total = fmtTotal(collection.tracks.map((t) => durations[t.id]));

  return (
    <header
      className='relative overflow-hidden rounded-t-[10px] px-5 pb-7 pt-16 transition-[background] duration-700 md:px-8 md:pb-8 md:pt-24'
      style={{
        background: `linear-gradient(180deg, hsl(${hue} 55% 42%) 0%, hsl(${hue} 40% 22%) 70%, transparent 100%)`,
      }}
    >
      <div className='flex flex-col gap-6 md:flex-row md:items-end md:gap-7'>
        {shown ? (
          <Cover
            track={shown}
            state={inThisList ? (playing ? 'playing' : 'paused') : 'idle'}
            priority
            className='w-[168px] shrink-0 rounded-[8px] shadow-[0_18px_50px_rgba(0,0,0,0.5)] md:w-[220px]'
          />
        ) : (
          <div className='aspect-square w-[168px] rounded-[8px] bg-cr-panel md:w-[220px]' />
        )}
        <div className='min-w-0'>
          <p className='font-mono text-[11px] uppercase tracking-[0.22em] text-white/70'>
            {inThisList ? 'Now playing' : 'Collection'}
          </p>
          <h1 className='mt-2 truncate text-[44px] font-black leading-[0.95] tracking-[-0.03em] md:text-[80px]'>
            {inThisList && shown ? shown.title : collection.title}
          </h1>
          <p className='mt-4 max-w-[46em] break-keep text-[14px] leading-[1.6] text-white/70 md:text-[15px]'>
            {inThisList && shown?.desc ? shown.desc : collection.description}
          </p>
          <p className='mt-4 flex flex-wrap items-center gap-x-2 text-[13px] text-white/80'>
            <span className='font-semibold text-white'>WoohDev</span>
            <span aria-hidden>·</span>
            <span>{collection.tracks.length}곡</span>
            {total && (
              <>
                <span aria-hidden>·</span>
                <span className='text-white/60'>{total}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </header>
  );
};

export default CollectionHeader;
