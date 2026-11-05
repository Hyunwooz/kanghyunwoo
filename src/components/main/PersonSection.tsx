'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import { person } from '@/data/home';
import { gsap } from '@/lib/gsap';
import Btn from './ui/Btn';

// 라벨 열(20.16rem) + 본문. 히어로/FAQ 와 같은 시작점을 쓴다.
const COLS = 'lg:grid lg:grid-cols-[20.16rem_1fr] lg:gap-x-[1.25rem]';

/*
 * 소개: 편집 디자인처럼 짠다.
 *  1. 라벨 + 큰 제목(선언문)
 *  2. 왼쪽에 본인 사진을 크게, 오른쪽에 글 + 가는 선으로 나눈 색인 + 버튼
 *  3. 마지막에 넓은 장면 한 장과 한 줄 캡션
 */
const PersonSection = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    // 모바일은 세로로 쌓이므로 패럴랙스는 데스크톱에서만
    mm.add('(min-width: 992px)', () => {
      section.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const img = el.querySelector('img');
        if (!img) return;
        gsap.set(img, { height: '112%', top: '-6%' });
        gsap.fromTo(
          img,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id='person'
      ref={root}
      className='relative bg-black px-[1.25rem] pb-[8rem] pt-[8rem] text-white max-lg:px-4 max-lg:pb-20 max-lg:pt-16'
    >
      {/* 1. 라벨 + 제목 */}
      <div className={COLS}>
        <div
          data-line
          className='text-[1.125rem] leading-[1.2] max-lg:text-base'
        >
          {person.label}
        </div>
        <h2
          data-line
          className='break-keep text-[5rem] leading-[1.02] tracking-[-0.02em] max-lg:mt-4 max-lg:text-[40px]'
        >
          {person.title[0]}
          <br />
          {person.title[1]}
        </h2>
      </div>

      {/* 2. 사진 + 글 */}
      <div className='mt-[7rem] max-lg:mt-12 lg:grid lg:grid-cols-[31rem_1fr] lg:gap-x-[6.25rem]'>
        <figure>
          <div
            data-parallax
            data-clip
            className='relative aspect-[3/4] overflow-hidden bg-white/[0.04]'
          >
            <img
              src={person.portrait}
              alt='강현우'
              className='absolute left-0 top-0 h-full w-full object-cover'
            />
          </div>
          <figcaption
            data-line
            data-delay='0.3'
            className='mt-[1.25rem] text-[1.125rem] leading-[1.3] max-lg:mt-3 max-lg:text-base'
          >
            {person.portraitCaption.map((line) => (
              <span key={line} className='block'>
                {line}
              </span>
            ))}
          </figcaption>
        </figure>

        {/* 글은 위에, 색인과 버튼은 사진 아래 끝에 맞춘다 */}
        <div className='max-w-[38rem] max-lg:mt-12 max-lg:max-w-none lg:flex lg:flex-col lg:justify-between'>
          <p
            data-line
            className='break-keep text-[1.5625rem] leading-[1.3] max-lg:text-xl'
          >
            {person.text}
          </p>

          <div>
            <dl
              data-stagger='0.12'
              className='mt-[4rem] border-t border-white/15 max-lg:mt-10'
            >
              {person.index.map((row) => (
                <div
                  key={row.label}
                  data-opacity
                  className='grid grid-cols-[8rem_1fr] gap-x-[1.25rem] border-b border-white/15 py-[1.1rem] max-lg:grid-cols-[6rem_1fr] max-lg:py-4'
                >
                  <dt className='pt-[0.2em] font-mono text-[0.75rem] leading-none tracking-[0.0225rem] text-white/50 max-lg:text-[11px]'>
                    {row.label}
                  </dt>
                  <dd className='break-keep text-[1rem] leading-[1.45] max-lg:text-[15px]'>
                    {row.items.join(', ')}
                  </dd>
                </div>
              ))}
            </dl>

            <div data-opacity className='mt-[2.5rem] max-lg:mt-8'>
              <Btn href={person.portfolio.href}>{person.portfolio.label}</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 장면 한 장 + 캡션 */}
      <div
        className={`mt-[10rem] max-lg:mt-16 max-lg:flex max-lg:flex-col lg:items-end ${COLS}`}
      >
        <p
          data-line
          className='w-[16rem] break-keep text-[1.125rem] leading-[1.3] max-lg:order-2 max-lg:mt-3 max-lg:w-auto max-lg:text-base'
        >
          {person.sceneCaption}
        </p>
        <div
          data-parallax
          data-clip
          className='relative aspect-[43/26] overflow-hidden bg-white/[0.04] max-lg:order-1'
        >
          <img
            src={person.scene}
            alt=''
            className='absolute left-0 top-0 h-full w-full object-cover'
          />
        </div>
      </div>
    </section>
  );
};

export default PersonSection;
