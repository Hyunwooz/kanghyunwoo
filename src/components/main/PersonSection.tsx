'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import { people, person } from '@/data/home';
import { WORDMARK_HEIGHT, wordmarkLetters } from '@/data/wordmark';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// 원본 "(The Studio)" 섹션. 4단 그리드 시작점(rem): 0 / 20.16 / 41.78 / 69.64
const GRID = 'lg:grid lg:grid-cols-[20.16rem_21.62rem_27.86rem_1fr]';

// 글자 path 의 가로 범위 (viewBox 자르기용)
const LETTER_X: Record<number, [number, number]> = {
  0: [0, 254],
  1: [261, 457],
  3: [667, 827],
  4: [835, 1010],
  5: [1018, 1175],
  6: [1183, 1345],
  7: [1353, 1408],
};

// 원본 오브제 배치 (formes-w 기준 rem). 사진은 원본 오브제 자리, 글자는 NOTHIN 글자 자리.
const OBJECTS = [
  { left: 29.25, top: 5.5, size: 22, rot: 0 },
  { left: 54.5, top: 11, size: 8.87, rot: 0 },
  { left: 54.14, top: 18.4, size: 11, rot: 112 },
  { left: 33.15, top: -1.6, size: 21, rot: 6 },
  { left: 53.25, top: -3.6, size: 15, rot: -18 },
];
const LETTERS = [
  { index: 0, left: 71.9, top: 25.1, h: 1.48, rot: 34 },
  { index: 6, left: 23.4, top: 10.45, h: 3.34, rot: 0 },
  { index: 3, left: 29.25, top: 3.3, h: 1.7, rot: 0 },
  { index: 4, left: 29.25, top: 26.44, h: 1.06, rot: 0 },
  { index: 7, left: 66.03, top: 11, h: 1.3, rot: 0 },
  { index: 5, left: 46.8, top: 35.2, h: 1.35, rot: 0 },
];

const PersonSection = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const ctx = gsap.context(() => {
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

      // 흩어지는 오브제: 커서(없으면 화면 중앙)에서 멀어지도록 밀려난다
      const wrap = section.querySelector<HTMLElement>('[data-formes]');
      if (!wrap) return;
      const items = Array.from(wrap.querySelectorAll<HTMLElement>('[data-forme]'));
      items.forEach((el) => {
        el.dataset.baseRot = String(gsap.getProperty(el, 'rotation'));
      });
      const point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const cfg = () =>
        window.innerWidth <= 767
          ? { radius: 260, max: 110, rot: 12, scale: 0.1 }
          : { radius: 460, max: 380, rot: 30, scale: 0.2 };
      const reset = (el: HTMLElement) =>
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: parseFloat(el.dataset.baseRot || '0'),
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.35)',
          overwrite: 'auto',
        });
      const apply = () => {
        const c = cfg();
        items.forEach((el) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2 - (gsap.getProperty(el, 'x') as number);
          const cy = r.top + r.height / 2 - (gsap.getProperty(el, 'y') as number);
          const d = Math.hypot(point.x - cx, point.y - cy);
          const base = parseFloat(el.dataset.baseRot || '0');
          if (d < c.radius) {
            const a = Math.atan2(point.y - cy, point.x - cx);
            const f = Math.pow((c.radius - d) / c.radius, 1.6);
            gsap.to(el, {
              x: -Math.cos(a) * f * c.max,
              y: -Math.sin(a) * f * c.max,
              rotation: base - Math.cos(a) * f * c.rot,
              scale: 1 + f * c.scale,
              duration: 0.45,
              ease: 'power4.out',
              overwrite: 'auto',
            });
          } else reset(el);
        });
      };
      const move = (e: MouseEvent) => {
        point.x = e.clientX;
        point.y = e.clientY;
        apply();
      };
      const leave = () => {
        point.x = window.innerWidth / 2;
        point.y = window.innerHeight / 2;
        apply();
      };
      wrap.addEventListener('mousemove', move);
      wrap.addEventListener('mouseleave', leave);
      ScrollTrigger.create({
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: apply,
        onLeave: () => items.forEach(reset),
        onLeaveBack: () => items.forEach(reset),
      });
      return () => {
        wrap.removeEventListener('mousemove', move);
        wrap.removeEventListener('mouseleave', leave);
      };
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id='person' ref={root} className='relative bg-black px-[1.25rem] pb-[7.5rem] pt-[6.44rem] text-white max-lg:px-4 max-lg:pb-20 max-lg:pt-16'>
      <div className='pointer-events-none absolute inset-x-0 -top-[10rem] h-[10rem] bg-gradient-to-b from-transparent to-black' />

      <div className='relative lg:flex lg:items-start'>
        <div data-line className='text-[1.5625rem] leading-[1.2] lg:w-[41.78rem] max-lg:text-xl'>
          {person.label}
        </div>
        <p data-line className='w-[35rem] break-keep text-[1.5625rem] leading-[1.2] max-lg:mt-4 max-lg:w-auto max-lg:text-xl'>
          {person.text}
        </p>
      </div>

      <div className='relative mt-[3rem] h-[33rem] max-lg:mt-10 max-lg:flex max-lg:h-auto max-lg:flex-col max-lg:gap-8'>
        <div data-parallax='-100' data-parallax-scrub='1' data-parallax-img='-8' className='absolute left-[20.16rem] top-[10.05rem] w-[13.5rem] max-lg:static max-lg:w-1/2'>
          <div className='relative aspect-square overflow-hidden'>
            <img src={person.leftImage} alt='' className='absolute left-0 top-0 h-full w-full object-cover' />
          </div>
          <p className='mt-[1.75rem] text-[1.125rem] font-normal leading-[1.2] max-lg:mt-3 max-lg:text-base'>
            {person.leftCaption[0]}
            <br />
            {person.leftCaption[1]}
          </p>
        </div>
        <div data-parallax='-60' data-parallax-scrub='2' data-parallax-img='10' className='absolute left-[41.78rem] top-0 h-[26.25rem] w-[43.13rem] overflow-hidden max-lg:static max-lg:aspect-[43/26] max-lg:h-auto max-lg:w-full'>
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

      <div data-formes className='relative mt-[5.5rem] h-[55rem] max-lg:hidden'>
        {person.objects.map((src, i) => {
          const o = OBJECTS[i];
          return (
            <img
              key={src}
              data-forme
              src={src}
              alt=''
              draggable={false}
              className='absolute rounded-[0.25rem] object-cover shadow-[0_2rem_4rem_-1rem_rgba(0,0,0,0.6)]'
              style={{
                left: `${o.left}rem`,
                top: `${o.top + 4}rem`,
                width: `${o.size}rem`,
                height: `${o.size * 1.2}rem`,
                transform: `rotate(${o.rot}deg)`,
              }}
            />
          );
        })}
        {LETTERS.map((l) => {
          const letter = wordmarkLetters[l.index];
          const [x0, x1] = LETTER_X[l.index];
          return (
            <svg
              key={l.index}
              data-forme
              viewBox={`${x0} 0 ${x1 - x0} ${WORDMARK_HEIGHT}`}
              fill='currentColor'
              className='absolute w-auto text-white'
              style={{
                left: `${l.left}rem`,
                top: `${l.top + 4}rem`,
                height: `${l.h * 1.6}rem`,
                transform: `rotate(${l.rot}deg)`,
              }}
              aria-hidden
            >
              <path d={letter.d} />
            </svg>
          );
        })}
      </div>

      <div className={`mt-[2rem] text-[1.125rem] font-normal leading-[1.2] max-lg:mt-10 max-lg:flex max-lg:flex-col max-lg:gap-6 max-lg:text-base ${GRID}`}>
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
    </section>
  );
};

export default PersonSection;
