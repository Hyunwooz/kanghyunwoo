'use client';

import { useClickedStore } from '@/store/useClick';

const SectionContainer = ({
  children,
  sectionTitle,
}: Readonly<{
  children: React.ReactNode;
  sectionTitle: string;
}>) => {
  const { isClicked } = useClickedStore();

  return (
    <section
      id={sectionTitle}
      className='relative w-full pb-2 pt-8 md:pb-[40px] md:pt-[50px]'
    >
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
};

export default SectionContainer;
