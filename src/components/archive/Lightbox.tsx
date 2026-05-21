'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import type { ArchivePhoto } from '@/shared/types/archive';

interface LightboxProps {
  photo: ArchivePhoto | null;
  photos: ArchivePhoto[];
  onClose: () => void;
  onNavigate: (next: ArchivePhoto) => void;
}

const Lightbox = ({ photo, photos, onClose, onNavigate }: LightboxProps) => {
  useEffect(() => {
    if (!photo) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };

    const navigate = (dir: 1 | -1) => {
      const idx = photos.findIndex((p) => p.id === photo.id);
      const nextIdx = (idx + dir + photos.length) % photos.length;
      onNavigate(photos[nextIdx]);
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [photo, photos, onClose, onNavigate]);

  if (!photo) return null;

  const navigate = (dir: 1 | -1) => {
    const idx = photos.findIndex((p) => p.id === photo.id);
    const nextIdx = (idx + dir + photos.length) % photos.length;
    onNavigate(photos[nextIdx]);
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-md animate-archive-fade md:px-12 md:py-10'
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className='absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all hover:rotate-90 hover:border-white/60 hover:text-white md:right-8 md:top-8'
        aria-label='Close'
      >
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
          <path
            d='M6 6L18 18M18 6L6 18'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(-1);
        }}
        className='absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-white/50 hover:text-white md:left-6'
        aria-label='Previous'
      >
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
          <path
            d='M15 6L9 12L15 18'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(1);
        }}
        className='absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-white/50 hover:text-white md:right-6'
        aria-label='Next'
      >
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
          <path
            d='M9 6L15 12L9 18'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      <div
        className='flex h-full w-full max-w-6xl flex-col items-center justify-center gap-6 md:flex-row'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='relative flex h-[60vh] w-full items-center justify-center md:h-[80vh] md:w-2/3'>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes='(min-width: 768px) 66vw, 100vw'
            className='object-contain animate-archive-fade'
            priority
          />
        </div>

        <div className='w-full max-w-md text-white md:w-1/3'>
          <div className='mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50'>
            <span>{photo.category}</span>
            <span className='h-[1px] w-6 bg-white/30' />
            <span>#{photo.id}</span>
          </div>
          <h3 className='mb-3 text-2xl font-semibold leading-tight md:text-3xl'>
            {photo.alt}
          </h3>
          {photo.description && (
            <p className='mb-5 text-sm leading-relaxed text-white/70 md:text-[15px]'>
              {photo.description}
            </p>
          )}
          <dl className='space-y-2 border-t border-white/10 pt-4 text-[13px]'>
            <div className='flex justify-between'>
              <dt className='text-white/40'>Date</dt>
              <dd className='text-white/90'>{photo.date}</dd>
            </div>
            {photo.location && (
              <div className='flex justify-between'>
                <dt className='text-white/40'>Location</dt>
                <dd className='text-white/90'>{photo.location}</dd>
              </div>
            )}
            {photo.tone && (
              <div className='flex justify-between'>
                <dt className='text-white/40'>Tone</dt>
                <dd className='text-white/90'>{photo.tone}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
