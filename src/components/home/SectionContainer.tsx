'use client';

import { useClickedStore } from '@/store/useClick';
import { forwardRef } from 'react';

const SectionContainer = forwardRef<
  HTMLElement,
  Readonly<{
    children: React.ReactNode;
    sectionTitle: string;
  }>
>(({ children, sectionTitle }, ref) => {
  const { isClicked } = useClickedStore();

  return (
    <section ref={ref} className='relative w-full' id={sectionTitle}>
      <div
        className={`transition-all duration-1000 ${
          isClicked ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='w-full px-0 md:mt-0'>
          <h2
            className={`sticky top-0 z-20 mb-[30px] w-full border-0 border-main bg-background py-4 text-4xl font-bold lg:static lg:mb-16 lg:border-l-8 lg:px-4 xl:text-5xl`}
          >
            {sectionTitle}
          </h2>
          <div className='w-full'>{children}</div>
        </div>
      </div>
    </section>
  );
});

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer;
