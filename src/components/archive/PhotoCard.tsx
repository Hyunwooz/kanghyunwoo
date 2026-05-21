'use client';

import Image from 'next/image';
import type { ArchivePhoto } from '@/shared/types/archive';

interface PhotoCardProps {
  photo: ArchivePhoto;
  index: number;
  onOpen: (photo: ArchivePhoto) => void;
}

const PhotoCard = ({ photo, index, onOpen }: PhotoCardProps) => {
  return (
    <button
      onClick={() => onOpen(photo)}
      className='group relative mb-4 block w-full overflow-hidden rounded-md bg-white/5 text-left opacity-0 animate-archive-rise will-change-transform'
      style={{ animationDelay: `${Math.min(index * 60, 800)}ms` }}
    >
      <div
        className='relative w-full'
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes='(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw'
          className='object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04]'
        />
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-60 transition-opacity duration-500 group-hover:opacity-90' />

        <div className='absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-5'>
          <div className='mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/70'>
            <span>{photo.category}</span>
            <span className='h-[1px] w-4 bg-white/40' />
            <span>{photo.date}</span>
          </div>
          <p className='text-sm font-medium leading-snug text-white md:text-base'>
            {photo.description ?? photo.alt}
          </p>
          {photo.location && (
            <p className='mt-1 text-[11px] text-white/60'>{photo.location}</p>
          )}
        </div>

        <div className='absolute left-3 top-3 rounded-full border border-white/25 bg-black/30 px-2 py-0.5 text-[10px] font-medium tracking-wider text-white/80 backdrop-blur-sm'>
          #{photo.id}
        </div>
      </div>
    </button>
  );
};

export default PhotoCard;
