'use client';

/* eslint-disable @next/next/no-img-element */
import { gallery } from '@/data/home';
import Btn from './ui/Btn';

/*
 * 벤토 격자 (데스크톱 12칼럼, 행 높이 12rem, 간격 0.25rem).
 * 카드가 아니라 콘택트 시트처럼 보이게: 모서리 없음, 배경색 없음, 간격 최소.
 *
 *   1  2  3  4  5  6  7  8  9 10 11 12
 *  [      1 (6)       ][ 2  ][  3   ]
 *  [      1           ][ 2  ][  3   ]
 *  [ 4  ][     5 (6)       ][  6   ]
 *  [ 4  ][ 7  ][ 8  ]      [  6   ]
 */
const LAYOUT = [
  { desktop: 'lg:col-[1/7] lg:row-[1/3]', mobile: 'col-span-2 row-span-1' },
  { desktop: 'lg:col-[7/10] lg:row-[1/3]', mobile: 'col-span-1 row-span-1' },
  { desktop: 'lg:col-[10/13] lg:row-[1/3]', mobile: 'col-span-1 row-span-1' },
  { desktop: 'lg:col-[1/4] lg:row-[3/5]', mobile: 'col-span-1 row-span-1' },
  { desktop: 'lg:col-[4/10] lg:row-[3/4]', mobile: 'col-span-1 row-span-1' },
  { desktop: 'lg:col-[10/13] lg:row-[3/5]', mobile: 'col-span-2 row-span-1' },
  { desktop: 'lg:col-[4/7] lg:row-[4/5]', mobile: 'col-span-1 row-span-1' },
  { desktop: 'lg:col-[7/10] lg:row-[4/5]', mobile: 'col-span-1 row-span-1' },
];

const PhotoGrid = () => {
  return (
    <section id='photos' className='relative bg-black px-[1.25rem] pb-[7.5rem] pt-[8rem] text-white max-lg:px-4 max-lg:pb-20 max-lg:pt-16'>
      <div className='relative lg:flex lg:items-start'>
        <div data-line className='text-[1.5625rem] leading-[1.2] lg:w-[41.78rem] max-lg:text-xl'>
          {gallery.label}
        </div>
        <p data-line className='w-[35rem] break-keep text-[1.5625rem] leading-[1.2] max-lg:mt-4 max-lg:w-auto max-lg:text-xl'>
          {gallery.text}
        </p>
      </div>

      <ul
        data-stagger='0.08'
        className='mt-[4rem] grid grid-cols-2 gap-[0.25rem] auto-rows-[42vw] lg:grid-cols-12 lg:auto-rows-[12rem] max-lg:mt-10'
      >
        {gallery.photos.map((p, i) => {
          const cell = LAYOUT[i % LAYOUT.length];
          return (
            <li key={p.id} data-clip className={`relative overflow-hidden bg-white/[0.04] ${cell.desktop} ${cell.mobile}`}>
              <a href={gallery.cta.href} className='group block h-full w-full'>
                <img
                  src={p.src}
                  alt={p.alt}
                  loading='lazy'
                  draggable={false}
                  className='h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]'
                />
                {p.description && (
                  <span className='pointer-events-none absolute bottom-[0.9rem] left-[1rem] max-w-[90%] break-keep text-[0.875rem] leading-[1.2] tracking-[-0.01em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-lg:hidden'>
                    {p.description}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>

      <div data-opacity className='mt-[2.5rem] flex items-center justify-between max-lg:mt-6'>
        <Btn href={gallery.cta.href}>{gallery.cta.label}</Btn>
        <span className='font-mono text-[0.75rem] uppercase leading-none tracking-[0.0225rem] text-[#8e8e8e] max-lg:text-[11px]'>
          {String(gallery.photos.length).padStart(2, '0')} / {String(gallery.total).padStart(2, '0')} photos
        </span>
      </div>
    </section>
  );
};

export default PhotoGrid;
