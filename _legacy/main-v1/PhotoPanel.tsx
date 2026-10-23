import Image from 'next/image';
import Link from 'next/link';
import type { ArchivePhoto } from '@/shared/types/archive';

interface PhotoPanelProps {
  photo: ArchivePhoto;
}

// 전체 화면 사진 (noth.in 의 영상 구간 대용)
const PhotoPanel = ({ photo }: PhotoPanelProps) => {
  return (
    <Link
      href='/archive'
      data-dark
      className='group relative block h-[70svh] overflow-hidden bg-ink md:h-[100svh]'
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes='100vw'
        className='object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]'
      />
      <span className='absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-paper'>
        photo archive
      </span>
      <span className='absolute bottom-5 left-4 text-sm text-paper/80 md:left-6'>
        {photo.description}
      </span>
      <span className='absolute bottom-5 right-4 font-mono text-[11px] uppercase tracking-[0.12em] text-paper/80 md:right-6'>
        {photo.location}
      </span>
    </Link>
  );
};

export default PhotoPanel;
