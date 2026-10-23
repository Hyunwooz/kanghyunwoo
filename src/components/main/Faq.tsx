'use client';

import { useEffect, useRef } from 'react';
import { faq } from '@/data/home';
import { gsap, SplitText } from '@/lib/gsap';

// 원본 FAQ: 흐린(0.5) 질문 → 열면 구분선이 그어지고 답변 줄이 마스크 리빌, + 아이콘 세로획이 사라진다
const Faq = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const items = Array.from(section.querySelectorAll<HTMLElement>('[data-faq-item]'));
    const cleanups: (() => void)[] = [];
    let current: { close: () => void } | null = null;

    items.forEach((item) => {
      const question = item.querySelector<HTMLElement>('[data-faq-q]');
      const label = item.querySelector<HTMLElement>('[data-faq-label]');
      const answer = item.querySelector<HTMLElement>('[data-faq-a]');
      const sepWrap = item.querySelector<HTMLElement>('[data-faq-sep-wrap]');
      const sep = item.querySelector<HTMLElement>('[data-faq-sep]');
      const bar = item.querySelector<SVGRectElement>('[data-faq-bar]');
      const spacing = item.querySelector<HTMLElement>('[data-faq-space]');
      if (!question || !label || !answer) return;

      gsap.set(label, { opacity: 0.5 });
      gsap.set(spacing, { height: 0 });
      gsap.set(answer, { height: 0, overflow: 'hidden' });
      gsap.set(sepWrap, { opacity: 0 });
      gsap.set(bar, { transformOrigin: '50% 50%' });

      let open = false;
      let hovered = false;
      let split: SplitText | null = null;
      let tl: gsap.core.Timeline | null = null;

      const close = () => {
        open = false;
        tl?.kill();
        tl = gsap.timeline({
          onComplete: () => {
            split?.revert();
            split = null;
          },
        });
        tl.to(answer, { height: 0, duration: 1, ease: 'power4.inOut' }, 0)
          .to(bar, { scaleY: 1, duration: 1, ease: 'power4.inOut' }, 0)
          .to(spacing, { height: 0, duration: 1, ease: 'power4.inOut' }, 0)
          .to(sepWrap, { opacity: 0, duration: 0.8, ease: 'power4.inOut' }, 0);
        if (!hovered) gsap.to(label, { opacity: 0.5, duration: 0.6, ease: 'power4.inOut' });
      };
      const openIt = () => {
        if (current && current.close !== close) current.close();
        current = { close };
        open = true;
        tl?.kill();
        split?.revert();
        split = SplitText.create(Array.from(answer.children), { type: 'lines', linesClass: 'line-child', mask: 'lines' });
        gsap.set(split.lines, { yPercent: 100 });
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power4.inOut' });
        tl = gsap.timeline();
        tl.to(sepWrap, { opacity: 1, duration: 0.6, ease: 'power4.inOut' }, 0)
          .fromTo(sep, { width: '0%' }, { width: '100%', duration: 1.4, ease: 'power4.inOut' }, 0)
          .to(answer, { height: 'auto', duration: 1.2, ease: 'power4.inOut' }, 0)
          .to(bar, { scaleY: 0, duration: 1.2, ease: 'power4.inOut' }, 0)
          .to(spacing, { height: '4.375rem', duration: 1.2, ease: 'power4.inOut' }, 0)
          .to(split.lines, { yPercent: 0, duration: 1.4, stagger: 0.07, ease: 'power4.inOut' }, 0.15);
      };
      const click = () => (open ? close() : openIt());
      const enter = () => {
        hovered = true;
        gsap.to(label, { opacity: 1, duration: 0.6, ease: 'power4.inOut' });
      };
      const leave = () => {
        hovered = false;
        if (!open) gsap.to(label, { opacity: 0.5, duration: 0.6, ease: 'power4.inOut' });
      };
      question.addEventListener('click', click);
      question.addEventListener('mouseenter', enter);
      question.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        tl?.kill();
        split?.revert();
        question.removeEventListener('click', click);
        question.removeEventListener('mouseenter', enter);
        question.removeEventListener('mouseleave', leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={root} className='relative bg-black px-[1.25rem] pb-[4rem] pt-[1rem] text-white max-lg:px-4 max-lg:pt-10'>
      <div className='flex justify-between text-[1.4rem] font-bold uppercase leading-none max-lg:text-xl'>
        {faq.letters.map((letter) => (
          <span key={letter} data-line>
            {letter}
          </span>
        ))}
      </div>

      <div className='mt-[5rem] grid grid-cols-[32.5rem_1fr] max-lg:mt-12 max-lg:grid-cols-1 max-lg:gap-8'>
        <div data-line className='text-[1.125rem] leading-[1.2] max-lg:text-base'>
          {faq.label}
        </div>
        <ul>
          {faq.items.map((item) => (
            <li key={item.q} data-faq-item>
              <button
                type='button'
                data-faq-q
                data-opacity
                data-delay='0.4'
                className='flex w-full cursor-pointer items-center justify-between py-[1.1rem] text-left'
              >
                <span data-faq-label className='break-keep text-[1.875rem] leading-[1.2] tracking-[-0.01em] max-lg:text-xl'>
                  {item.q}
                </span>
                <svg viewBox='0 0 12 12' className='h-[0.85rem] w-[0.85rem] shrink-0' fill='currentColor'>
                  <rect x='0' y='5.4' width='12' height='1.2' />
                  <rect data-faq-bar x='5.4' y='0' width='1.2' height='12' />
                </svg>
              </button>
              <div data-faq-sep-wrap className='h-px w-full'>
                <div data-faq-sep className='h-px w-0 bg-white/40' />
              </div>
              <div data-faq-a>
                <p className='max-w-[38rem] break-keep pt-[1.4rem] text-[1rem] font-normal leading-[1.4] max-lg:text-sm'>{item.a}</p>
                <a href={item.link.href} className='mt-[1rem] inline-block border-b border-white text-[1rem] leading-[1.1] max-lg:text-sm'>
                  {item.link.label}
                </a>
              </div>
              <div data-faq-space />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Faq;
