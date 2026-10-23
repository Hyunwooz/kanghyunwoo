'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import { works } from '@/data/home';
import { gsap } from '@/lib/gsap';

// 원본 배치표 (12칼럼 그리드). imgH 는 rem.
const LAYOUT = [
  { col: '1 / 7', rowOffset: 0, alignSelf: 'start', imgH: 43.125 },
  { col: '9 / 13', rowOffset: 0, alignSelf: 'end', imgH: 26.875 },
  { col: '3 / 11', rowOffset: 1, alignSelf: 'start', imgH: 42.25 },
  { col: '1 / 5', rowOffset: 2, alignSelf: 'end', imgH: 26.875 },
  { col: '7 / 13', rowOffset: 2, alignSelf: 'start', imgH: 43.125 },
  { col: '3 / 11', rowOffset: 3, alignSelf: 'start', imgH: 42.25 },
];
const ITEM_PARALLAX = [80, -150, -100, -160, 100, -90];
const CLIP_FROM = [
  'inset(100% 100% 0% 0%)',
  'inset(100% 0% 0% 100%)',
  'inset(100% 0% 0% 0%)',
];

const letters = works.word.split('');

const Works = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add(
      { desktop: '(min-width: 992px)', mobile: '(max-width: 991px)' },
      (context) => {
        const { desktop } = context.conditions as { desktop: boolean };
        const items = Array.from(section.querySelectorAll<HTMLElement>('[data-work-item]'));

        items.forEach((item, i) => {
          const wrap = item.querySelector<HTMLElement>('[data-work-img]');
          const img = wrap?.querySelector('img');
          if (!wrap || !img) return;
          gsap.set(wrap, { clipPath: CLIP_FROM[i % 3] });
          gsap.to(wrap, {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power4.inOut',
            duration: 1,
            scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
          });
          if (!desktop) return;
          gsap.fromTo(
            item,
            { y: 0 },
            {
              y: ITEM_PARALLAX[i % 6],
              ease: 'none',
              scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            },
          );
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: -20,
              ease: 'none',
              scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom center', scrub: 3 },
            },
          );
        });

        if (!desktop) return;

        // 스티키 "WORKS": 섹션을 지나는 동안 글자가 하나씩(뒤에서부터) 오른쪽으로 날아갔다가 돌아온다
        const flyers = Array.from(section.querySelectorAll<HTMLElement>('[data-works-letter]'));
        const targets = Array.from(section.querySelectorAll<HTMLElement>('[data-works-target]'));
        const n = flyers.length;
        const tl = gsap.timeline({ paused: true });
        flyers.forEach((letter, i) => {
          const dx = () => targets[i].getBoundingClientRect().left - letter.getBoundingClientRect().left + (gsap.getProperty(letter, 'x') as number);
          const at = (n - 1 - i) * 0.2;
          tl.fromTo(letter, { x: 0 }, { x: dx, duration: 1.4, ease: 'power4.inOut' }, at);
          const scaleAt = (n - 1 - i) * 0.1;
          tl.to(letter, { scale: 0.2, duration: 0.8, ease: 'power4.inOut' }, scaleAt);
          tl.to(letter, { scale: 1, duration: 0.8, ease: 'power4.inOut' }, scaleAt + 0.8);
        });
        const yoyo = gsap.timeline({ paused: true });
        yoyo.add(tl.tweenFromTo(0, tl.duration()));
        yoyo.add(tl.tweenFromTo(tl.duration(), 0));
        gsap.to(yoyo, {
          progress: 1,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 3, invalidateOnRefresh: true },
        });
      },
    );

    // 작품 위 "explore →" 버블: 포인터를 0.09 로 따라간다
    const cleanups: (() => void)[] = [];
    section.querySelectorAll<HTMLElement>('[data-work-link]').forEach((link) => {
      const bubble = link.querySelector<HTMLElement>('[data-cursor]');
      if (!bubble) return;
      gsap.set(bubble, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
      const pos = { x: 0, y: 0, tx: 0, ty: 0 };
      let shown = false;
      let raf = 0;
      const loop = () => {
        pos.x += (pos.tx - pos.x) * 0.09;
        pos.y += (pos.ty - pos.y) * 0.09;
        gsap.set(bubble, { x: pos.x, y: pos.y });
        raf = requestAnimationFrame(loop);
      };
      const move = (event: MouseEvent) => {
        const rect = link.getBoundingClientRect();
        pos.tx = event.clientX - rect.left;
        pos.ty = event.clientY - rect.top;
        if (!shown) {
          shown = true;
          pos.x = pos.tx;
          pos.y = pos.ty;
          gsap.to(bubble, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.8)', overwrite: 'auto' });
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        }
      };
      const leave = () => {
        shown = false;
        gsap.to(bubble, {
          scale: 0,
          autoAlpha: 0,
          duration: 0.38,
          ease: 'power3.in',
          overwrite: 'auto',
          onComplete: () => cancelAnimationFrame(raf),
        });
      };
      link.addEventListener('mousemove', move);
      link.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        link.removeEventListener('mousemove', move);
        link.removeEventListener('mouseleave', leave);
      });
    });

    // View all: 화살표 꼬리가 늘어난다
    const viewAll = section.querySelector<HTMLElement>('[data-view-all]');
    if (viewAll) {
      const svg = viewAll.querySelector('svg');
      const shaft = viewAll.querySelector('[data-shaft]');
      gsap.set(svg, { transformOrigin: 'left center' });
      const hover = gsap
        .timeline({ paused: true })
        .to(shaft, { attr: { points: '-6,7.5 -6,7.5 15.5,7.5' }, duration: 0.45, ease: 'power2.inOut' })
        .to(svg, { scaleX: 2, duration: 0.45, ease: 'power2.inOut' }, '<');
      const enter = () => hover.play();
      const out = () => hover.reverse();
      viewAll.addEventListener('mouseenter', enter);
      viewAll.addEventListener('mouseleave', out);
      cleanups.push(() => {
        viewAll.removeEventListener('mouseenter', enter);
        viewAll.removeEventListener('mouseleave', out);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      mm.revert();
    };
  }, []);

  return (
    <section id='works' ref={root} className='relative bg-black px-[1.25rem] pb-[11rem] pt-[1rem] text-white max-lg:px-4 max-lg:pb-24'>
      <div className='sticky top-[3rem] z-10 flex h-[3rem] items-center justify-between mix-blend-difference max-lg:static'>
        <div className='flex text-[2.5rem] font-bold uppercase leading-none tracking-[-0.02em] max-lg:text-3xl' aria-label={works.word}>
          {letters.map((char, i) => (
            <span key={i} data-works-letter className='inline-block' aria-hidden>
              {char}
            </span>
          ))}
        </div>
        <div className='flex text-[2.5rem] font-bold uppercase leading-none tracking-[-0.02em] max-lg:hidden' aria-hidden>
          {letters.map((char, i) => (
            <span key={i} data-works-target className='invisible inline-block'>
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className='mt-[5.4rem] flex justify-end max-lg:mt-12 max-lg:justify-start'>
        <h2 data-line className='mr-[2.9rem] w-[29.41rem] text-[2.5rem] leading-[1.1] tracking-[-0.01em] max-lg:mr-0 max-lg:w-auto max-lg:text-[28px]'>
          {works.title[0]}
          <br />
          {works.title[1]}
        </h2>
      </div>

      <ul className='mt-0 grid grid-cols-12 gap-x-[1rem] gap-y-[14.375rem] max-lg:mt-16 max-lg:grid-cols-6 max-lg:gap-y-16'>
        {works.items.map((item, i) => {
          const layout = LAYOUT[i % 6];
          const row = Math.floor(i / 6) * 4 + layout.rowOffset + 1;
          return (
            <li
              key={item.name}
              data-work-item
              className='works-item'
              style={
                {
                  '--col': layout.col,
                  '--row': String(row),
                  '--align': layout.alignSelf,
                  '--img-h': `${layout.imgH}rem`,
                } as React.CSSProperties
              }
            >
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel='noopener noreferrer'
                data-work-link
                className='relative block lg:cursor-none'
              >
                <div className='font-mono text-[0.75rem] uppercase leading-none tracking-[0.0225rem] text-[#8e8e8e] max-lg:text-[11px]'>
                  {item.name}
                </div>
                <p className='mt-[1.1rem] break-keep text-[1.5625rem] leading-[1.1] tracking-[-0.01em] max-lg:mt-2 max-lg:text-lg'>
                  {item.tagline}
                </p>
                <div data-work-img className='works-img relative mt-[1rem] overflow-hidden rounded-[0.25rem] bg-white/5'>
                  <img src={item.image} alt={item.name} className='absolute left-0 top-0 h-[125%] w-full object-cover' loading='lazy' />
                </div>
                <div
                  data-cursor
                  className='pointer-events-none absolute left-0 top-0 z-10 flex items-center gap-[0.6rem] rounded-full bg-black/70 px-[1rem] py-[0.65rem] font-mono text-[0.83rem] uppercase leading-none tracking-[0.025rem] text-white backdrop-blur-md max-lg:hidden'
                >
                  <span>explore</span>
                  <svg width='14' height='10' viewBox='0 0 14 10' fill='none' stroke='white'>
                    <path d='M0 5h13M9 1l4 4-4 4' />
                  </svg>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      <div data-opacity className='mt-[18.75rem] flex items-end justify-between max-lg:mt-20'>
        <a
          href={works.viewAll.href}
          data-view-all
          className='flex items-center gap-[0.9rem] text-[2.5rem] leading-none tracking-[-0.02em] max-lg:text-3xl'
        >
          <span>{works.viewAll.label}</span>
          <svg viewBox='-8 -1 26 14' className='h-[0.9rem] w-auto' fill='none' stroke='currentColor' strokeWidth='1.2'>
            <polyline data-shaft points='0.5,0 0.5,7.5 15.5,7.5' />
            <polyline points='12,4 15.5,7.5 12,11' />
          </svg>
        </a>
        <span className='text-[1.125rem] font-bold leading-none max-lg:text-sm'>
          ({String(works.items.length).padStart(2, '0')})
        </span>
        <span className='text-[1.125rem] font-bold leading-none max-lg:text-sm'>{works.years}</span>
      </div>
    </section>
  );
};

export default Works;
