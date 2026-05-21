'use client';

import { useMemo, useState } from 'react';
import type { ArchiveCategory, ArchivePhoto } from '@/shared/types/archive';
import { archiveCategories, archivePhotos, getPhotosByCategory } from '@/data/archive';
import ArchiveHeader from './ArchiveHeader';
import CategoryFilter from './CategoryFilter';
import GalleryGrid from './GalleryGrid';
import Lightbox from './Lightbox';

const Archive = () => {
  const [category, setCategory] = useState<ArchiveCategory>('all');
  const [selected, setSelected] = useState<ArchivePhoto | null>(null);

  const photos = useMemo(() => getPhotosByCategory(category), [category]);

  return (
    <main className='relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a] text-white selection:bg-white selection:text-black'>
      <div className='pointer-events-none fixed inset-0 z-0 opacity-[0.18]'>
        <div className='absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#66d9ed] blur-[160px]' />
        <div className='absolute right-[-120px] top-[40%] h-[480px] w-[480px] rounded-full bg-[#BB77FF] blur-[180px]' />
        <div className='absolute bottom-[-160px] left-[30%] h-[520px] w-[520px] rounded-full bg-[#436850] blur-[200px]' />
      </div>

      <div className='relative z-10 px-5 pb-32 md:px-10 lg:px-16 xl:px-24'>
        <ArchiveHeader count={archivePhotos.length} />

        <div className='sticky top-0 z-20 mt-12 -mx-5 bg-[#0a0a0a]/70 px-5 py-4 backdrop-blur-md md:-mx-10 md:px-10 md:py-5 lg:-mx-16 lg:px-16 xl:-mx-24 xl:px-24'>
          <CategoryFilter
            options={archiveCategories}
            active={category}
            onChange={setCategory}
          />
        </div>

        <section className='mt-8 md:mt-10'>
          <GalleryGrid photos={photos} onOpen={setSelected} />
        </section>

        <footer className='mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 text-[11px] uppercase tracking-[0.3em] text-white/40 md:flex-row'>
          <span>© {new Date().getFullYear()} WoohDev — kept quietly.</span>
          <span>Stored locally · S3 ready</span>
        </footer>
      </div>

      <Lightbox
        photo={selected}
        photos={photos}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </main>
  );
};

export default Archive;
