'use client';

import Link from 'next/link';

interface ArchiveHeaderProps {
  count: number;
}

const ArchiveHeader = ({ count }: ArchiveHeaderProps) => {
  return (
    <header className='relative w-full pt-10 md:pt-16'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <div className='h-[10px] w-[10px] animate-pulse-soft rounded-full bg-white' />
          <span className='text-[11px] uppercase tracking-[0.35em] text-white/60'>
            Photo Archive · 2024 — 2026
          </span>
        </div>
        <Link
          href='/portfolio'
          className='group inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-all hover:border-white/50 hover:text-white md:px-4 md:py-2 md:text-xs'
        >
          <span>Portfolio</span>
          <svg
            width='12'
            height='12'
            viewBox='0 0 24 24'
            fill='none'
            className='transition-transform group-hover:translate-x-0.5'
          >
            <path
              d='M5 12h14M13 6l6 6-6 6'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>
      </div>

      <div className='mt-10 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-12 md:gap-10'>
        <h1 className='col-span-1 text-[44px] font-semibold leading-[0.95] tracking-tight text-white md:col-span-8 md:text-[88px] xl:text-[120px]'>
          quiet
          <br />
          <span className='italic font-light text-white/80'>moments,</span>
          <br />
          collected.
        </h1>
        <div className='col-span-1 flex flex-col justify-end gap-4 md:col-span-4'>
          <p className='text-sm leading-relaxed text-white/60 md:text-[15px]'>
            오래 머무르고 싶은 장면들을 모아둔 곳.
            <br />
            도시의 소음 너머, 조용히 빛이 머무는 자리들을 담았습니다.
          </p>
          <div className='flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] text-white/40'>
            <span>
              <span className='mr-1 text-white/80'>{String(count).padStart(3, '0')}</span>
              photos
            </span>
            <span className='h-[1px] flex-1 bg-white/10' />
            <span>by woohdev</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArchiveHeader;
