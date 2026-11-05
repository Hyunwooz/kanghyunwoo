'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import { people, person } from '@/data/home';
import { gsap } from '@/lib/gsap';
import Btn from './ui/Btn';

// 4단 그리드 시작점(rem): 0 / 20.16 / 41.78 / 69.64
const GRID = 'lg:grid lg:grid-cols-[20.16rem_21.62rem_27.86rem_1fr]';

const PersonSection = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    // 모바일은 세로로 쌓이므로 패럴랙스를 걸면 사진이 본문 위로 올라탄다. 데스크톱에서만.
    mm.add('(min-width: 992px)', () => {
      // [data-parallax] : 요소는 y 로, 안쪽 이미지는 yPercent 로 따로 움직인다
      section.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const st = { trigger: el, start: 'top bottom', end: 'bottom top' };
        gsap.fromTo(
          el,
          { y: 0 },
          { y: parseFloat(el.dataset.parallax || '-60'), ease: 'none', scrollTrigger: { ...st, scrub: parseFloat(el.dataset.parallaxScrub || '1.5') } },
        );
        const img = el.querySelector('img');
        if (img) {
          gsap.set(img, { height: '110%', width: '100%', objectFit: 'cover', top: 0 });
          gsap.fromTo(
            img,
            { yPercent: 0 },
            { yPercent: parseFloat(el.dataset.parallaxImg || '-5'), ease: 'none', scrollTrigger: { ...st, scrub: 3 } },
          );
        }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id='person' ref={root} className='relative bg-black px-[1.25rem] pb-[7.5rem] pt-[8rem] text-white max-lg:px-4 max-lg:pb-20 max-lg:pt-16'>
      <div className='relative lg:flex lg:items-start'>
        <div data-line className='text-[1.5625rem] leading-[1.2] lg:w-[41.78rem] max-lg:text-xl'>
          {person.label}
        </div>
        <p data-line className='w-[35rem] break-keep text-[1.5625rem] leading-[1.2] max-lg:mt-4 max-lg:w-auto max-lg:text-xl'>
          {person.text}
        </p>
      </div>

      {/* 모바일에서 상자를 static 으로 두면 안의 absolute 이미지가 바깥 래퍼 기준으로 늘어나므로 relative 를 유지한다 */}
      <div className='relative mt-[3rem] h-[33rem] max-lg:mt-10 max-lg:flex max-lg:h-auto max-lg:flex-col max-lg:gap-8'>
        <div data-parallax='-100' data-parallax-scrub='1' data-parallax-img='-8' className='relative w-1/2 lg:absolute lg:left-[20.16rem] lg:top-[10.05rem] lg:w-[13.5rem]'>
          <div className='relative aspect-[4/5] overflow-hidden'>
            <img src={person.leftImage} alt='강현우' className='absolute left-0 top-0 h-full w-full object-cover' />
          </div>
          <p className='mt-[1.75rem] text-[1.125rem] font-normal leading-[1.2] max-lg:mt-3 max-lg:text-base'>
            {person.leftCaption[0]}
            <br />
            {person.leftCaption[1]}
          </p>
        </div>
        <div data-parallax='-60' data-parallax-scrub='2' data-parallax-img='10' className='relative aspect-[43/26] w-full overflow-hidden lg:absolute lg:left-[41.78rem] lg:top-0 lg:aspect-auto lg:h-[26.25rem] lg:w-[43.13rem]'>
          <img src={person.rightImage} alt='' className='absolute left-0 top-0 h-full w-full object-cover' />
        </div>
      </div>

      <h2 data-line className='mt-[3.5rem] text-[5rem] leading-[1] tracking-[-0.01em] max-lg:mt-12 max-lg:text-[40px]'>
        {person.title[0]}
        <br />
        {person.title[1]}
      </h2>

      <div className={`mt-[4.7rem] text-[1.125rem] font-normal leading-[1.2] max-lg:mt-10 max-lg:flex max-lg:flex-col max-lg:gap-6 max-lg:text-base ${GRID}`}>
        <div data-line className='lg:col-start-2'>
          {person.listLabel}
        </div>
        <ul>
          {person.list.map((item) => (
            <li key={item} className='flex items-center gap-[0.75rem]'>
              <span data-scale data-delay='0.5' className='block h-[0.3rem] w-[0.3rem] shrink-0 rounded-full bg-white' />
              <span data-line>{item}</span>
            </li>
          ))}
        </ul>
        <p data-line className='w-[27.86rem] break-keep max-lg:w-auto'>
          {person.aside}
        </p>
      </div>

      <div className={`mt-[6rem] text-[1.125rem] font-normal leading-[1.2] max-lg:mt-12 max-lg:flex max-lg:flex-col max-lg:gap-6 max-lg:text-base ${GRID}`}>
        <div data-line className='lg:col-start-2'>
          {people.label}
        </div>
        {people.columns.map((col) => (
          <div key={col.title}>
            <h3 data-line className='mb-[0.9rem] font-mono text-[0.75rem] uppercase leading-none tracking-[0.0225rem] text-[#8e8e8e] max-lg:text-[11px]'>
              {col.title}
            </h3>
            <ul className='text-[0.875rem] leading-[1.2] max-lg:text-sm'>
              {col.items.map((item) => (
                <li key={item} data-line>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 작업물은 메인에 늘어놓지 않고 포트폴리오로 보낸다 */}
      <div data-opacity className={`mt-[4rem] max-lg:mt-10 ${GRID}`}>
        <div className='lg:col-start-2'>
          <Btn href={person.portfolio.href}>{person.portfolio.label}</Btn>
        </div>
      </div>
    </section>
  );
};

export default PersonSection;
