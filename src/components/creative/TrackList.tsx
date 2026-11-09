'use client';

import type { Track } from '@/shared/types/creative';
import Cover from './Cover';
import { fmtTime } from './format';
import { EqBars, ExternalIcon, PauseIcon, PlayIcon } from './Icons';
import { useCurrentTrack, usePlayer } from './store';

interface TrackListProps {
  tracks: Track[];
  durations: Record<string, number>;
}

// 곡 목록. 줄을 누르면 그 곡부터 이 목록이 큐가 된다.
const TrackList = ({ tracks, durations }: TrackListProps) => {
  const current = useCurrentTrack();
  const playing = usePlayer((s) => s.playing);
  const play = usePlayer((s) => s.play);
  const toggle = usePlayer((s) => s.toggle);

  const inThisList = current ? tracks.some((t) => t.id === current.id) : false;

  const onRow = (i: number) => {
    if (current?.id === tracks[i].id) toggle();
    else play(tracks, i);
  };

  const onPlayAll = () => {
    if (inThisList) toggle();
    else play(tracks, 0);
  };

  return (
    <section className='px-3 pb-10 md:px-6'>
      {/* 컨트롤 */}
      <div className='flex items-center gap-5 py-5 md:py-6'>
        <button
          type='button'
          onClick={onPlayAll}
          disabled={!tracks.length}
          aria-label={inThisList && playing ? '일시정지' : '전체 재생'}
          className='flex h-14 w-14 items-center justify-center rounded-full bg-cr-accent text-cr-bg shadow-[0_8px_24px_rgba(139,124,255,0.35)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-40'
        >
          {inThisList && playing ? <PauseIcon className='h-7 w-7' /> : <PlayIcon className='h-7 w-7 translate-x-[1px]' />}
        </button>
        <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-white/40'>
          {inThisList && playing ? 'now playing' : 'play all'}
        </p>
      </div>

      {/* 머리글 */}
      <div className='grid grid-cols-[32px_1fr_auto] items-center gap-4 border-b border-white/10 px-2 pb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40 md:grid-cols-[32px_minmax(0,1fr)_140px_90px_64px]'>
        <span className='text-center'>#</span>
        <span>Title</span>
        <span className='hidden md:block'>Tool</span>
        <span className='hidden md:block'>Date</span>
        <span className='text-right'>Time</span>
      </div>

      {tracks.length === 0 && (
        <p className='px-2 py-10 text-[14px] text-white/40'>아직 올린 곡이 없어요.</p>
      )}

      <ol className='mt-1'>
        {tracks.map((t, i) => {
          const isCurrent = current?.id === t.id;
          const isPlaying = isCurrent && playing;
          return (
            <li key={t.id}>
              <div
                className={`group grid grid-cols-[32px_1fr_auto] items-center gap-4 rounded-md px-2 py-2 transition-colors hover:bg-white/[0.06] md:grid-cols-[32px_minmax(0,1fr)_140px_90px_64px] ${isCurrent ? 'bg-white/[0.04]' : ''}`}
              >
                {/* 번호 / 재생 */}
                <button
                  type='button'
                  onClick={() => onRow(i)}
                  aria-label={isPlaying ? `${t.title} 일시정지` : `${t.title} 재생`}
                  className='flex h-8 w-8 items-center justify-center justify-self-center text-white/50'
                >
                  {isPlaying ? (
                    <>
                      <EqBars className='text-cr-accent group-hover:hidden' />
                      <PauseIcon className='hidden h-4 w-4 text-white group-hover:block' />
                    </>
                  ) : (
                    <>
                      <span className={`font-mono text-[12px] tabular-nums group-hover:hidden ${isCurrent ? 'text-cr-accent' : ''}`}>
                        {i + 1}
                      </span>
                      <PlayIcon className='hidden h-4 w-4 text-white group-hover:block' />
                    </>
                  )}
                </button>

                {/* 제목 */}
                <button type='button' onClick={() => onRow(i)} className='flex min-w-0 items-center gap-3 text-left'>
                  <Cover track={t} state={isCurrent ? (isPlaying ? 'playing' : 'paused') : 'idle'} className='w-10 shrink-0 rounded-[4px]' />
                  <span className='min-w-0'>
                    <span className={`block truncate text-[15px] font-semibold ${isCurrent ? 'text-cr-accent' : 'text-white'}`}>
                      {t.title}
                    </span>
                    <span className='block truncate text-[12px] text-white/45'>
                      {t.desc ?? t.tool}
                      <span className='md:hidden'> · {t.tool}</span>
                    </span>
                  </span>
                </button>

                <span className='hidden truncate text-[13px] text-white/55 md:block'>{t.tool}</span>
                <span className='hidden font-mono text-[12px] text-white/45 md:block'>{t.date}</span>

                <span className='flex items-center justify-end gap-2 font-mono text-[12px] tabular-nums text-white/50'>
                  {t.link && (
                    <a
                      href={t.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${t.title} 원본 열기`}
                      className='opacity-0 transition-opacity hover:text-white focus-visible:opacity-100 group-hover:opacity-100'
                    >
                      <ExternalIcon className='h-4 w-4' />
                    </a>
                  )}
                  {fmtTime(durations[t.id])}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default TrackList;
