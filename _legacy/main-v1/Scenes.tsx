import Image from 'next/image';
import Link from 'next/link';
import type { ArchivePhoto } from '@/shared/types/archive';
import { Mono } from './Label';

interface ScenesProps {
  photos: ArchivePhoto[];
  total: number;
}

// 글자를 화면 폭으로 흩뿌린 섹션 제목
const SpreadTitle = ({ word }: { word: string }) => (
  <div
    aria-label={word}
    className='flex justify-between text-2xl font-bold tracking-tight md:text-3xl'
  >
    {word.split('').map((char, index) => (
      <span key={index} aria-hidden>
        {char}
      </span>
    ))}
  </div>
);

// 먹색 배경, 사진 2열 엇갈림 배치
const Scenes = ({ photos, total }: ScenesProps) => {
  return (
    <section
      id='scenes'
      data-dark
      className='bg-ink px-4 py-20 text-paper md:px-6 md:py-28'
    >
      <SpreadTitle word='SCENES' />

      <h2 className='mt-24 max-w-[16ch] break-keep text-[32px] font-normal leading-[1.08] tracking-[-0.02em] md:ml-auto md:mt-40 md:text-[56px]'>
        잘 찍은 사진보다,
        <br />
        오래 보고 싶은 장면.
      </h2>

      <ul className='mt-24 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-40 md:grid-cols-2 md:gap-y-28'>
        {photos.map((photo, index) => (
          <li key={photo.id} className={index % 2 === 1 ? 'md:mt-40' : ''}>
            <Link href='/archive' className='group block'>
              <Mono className='block'>{photo.location}</Mono>
              <p className='mt-2 break-keep text-lg font-medium md:text-[22px]'>
                {photo.description}
              </p>
              <div className='relative mt-4 aspect-[4/3] overflow-hidden rounded-sm bg-paper/5'>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes='(min-width: 768px) 50vw, 100vw'
                  className='object-cover transition-transform duration-700 group-hover:scale-[1.03]'
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className='mt-24 flex items-center justify-between md:mt-40'>
        <Link
          href='/archive'
          className='group inline-flex items-center gap-3 text-2xl font-normal md:text-[32px]'
        >
          View all
          <span className='transition-transform group-hover:translate-x-1'>
            ↳
          </span>
        </Link>
        <span className='font-mono text-sm'>
          ({String(total).padStart(3, '0')})
        </span>
        <span className='text-sm font-medium'>© 24 . 26</span>
      </div>
    </section>
  );
};

export default Scenes;
