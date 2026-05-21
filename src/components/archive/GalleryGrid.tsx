'use client';

import type { ArchivePhoto } from '@/shared/types/archive';
import PhotoCard from './PhotoCard';

interface GalleryGridProps {
  photos: ArchivePhoto[];
  onOpen: (photo: ArchivePhoto) => void;
}

const GalleryGrid = ({ photos, onOpen }: GalleryGridProps) => {
  if (photos.length === 0) {
    return (
      <div className='flex h-[40vh] w-full items-center justify-center text-sm text-white/40'>
        담긴 사진이 아직 없어요.
      </div>
    );
  }

  return (
    <div className='columns-2 gap-4 md:columns-3 xl:columns-4'>
      {photos.map((photo, i) => (
        <PhotoCard key={photo.id} photo={photo} index={i} onOpen={onOpen} />
      ))}
    </div>
  );
};

export default GalleryGrid;
