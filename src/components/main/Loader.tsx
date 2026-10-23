'use client';

import { useEffect, useRef, useState } from 'react';
import { loaderImages } from '@/data/home';
import { wordmarkLetters, WORDMARK_HEIGHT } from '@/data/wordmark';
import { gsap } from '@/lib/gsap';
import { emit, HERO_REVEAL_START, HERO_REVEALED, isDesktop, LOADER_SESSION_KEY, LOADER_SKIP_CLASS } from './core/events';
import { useLenis } from './core/SmoothScroll';

const first = wordmarkLetters[0];
const accent = wordmarkLetters[wordmarkLetters.length - 1];

// 원본 로더: 검은 화면 가운데 "N ’" 사이로 오브제 이미지가 빠르게 바뀌고, 하단 카운터가 100 → 000.
// 여기서는 "W ." 사이로 사진이 바뀐다. 세션당 한 번만 재생.
const Loader = () => {
  const root = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const played = sessionStorage.getItem(LOADER_SESSION_KEY) === '1';
    if (played) return;
    lenis.stop();
    window.scrollTo(0, 0);
    const resume = () => lenis.start();
    window.addEventListener(HERO_REVEALED, resume, { once: true });
    return () => window.removeEventListener(HERO_REVEALED, resume);
  }, [lenis]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (sessionStorage.getItem(LOADER_SESSION_KEY) === '1') {
      setHidden(true);
      const id = requestAnimationFrame(() => emit(HERO_REVEAL_START));
      return () => cancelAnimationFrame(id);
    }

    const letter = el.querySelector('[data-loader-letter]');
    const dot = el.querySelector('[data-loader-dot]');
    const imgWrap = el.querySelector<HTMLElement>('[data-loader-imgs]');
    const imgs = Array.from(el.querySelectorAll<HTMLElement>('[data-loader-img]'));
    const counter = el.querySelector<HTMLElement>('[data-loader-count]');
    const timers: number[] = [];

    const ctx = gsap.context(() => {
      gsap.set(imgs, { autoAlpha: 0, xPercent: -50, yPercent: -50 });
      gsap.set(letter, { yPercent: 100, opacity: 0 });
      gsap.set(dot, { scale: 0 });

      const finish = (current: HTMLElement) => {
        // StrictMode 에서 이펙트가 두 번 돌아도 로더가 보이도록 끝났을 때 기록
        sessionStorage.setItem(LOADER_SESSION_KEY, '1');
        const tl = gsap.timeline();
        tl.to(current, { scale: 0, duration: 0.6, ease: 'power4.inOut', delay: 0.5 })
          .to(imgWrap, { width: '1rem', duration: 0.8, ease: 'power4.inOut' }, 0.6)
          .to(counter, { autoAlpha: 0, duration: 0.5 })
          .add(() => emit(HERO_REVEAL_START))
          .to(letter, { yPercent: 100, duration: 1, ease: 'power4.inOut' }, '<')
          .to(dot, { scale: 0, duration: 1, ease: 'power4.inOut' }, '<')
          .to(el, { height: 0, duration: 1.8, ease: 'power4.inOut' }, '<')
          .add(() => {
            document.documentElement.classList.add(LOADER_SKIP_CLASS);
            setHidden(true);
          });
      };

      const cycle = () => {
        const startedAt = performance.now();
        let index = 0;
        const next = () => {
          const elapsed = performance.now() - startedAt;
          if (elapsed >= 5000) {
            finish(imgs[index]);
            return;
          }
          // 이전 트윈이 남아 있으면 다시 보이게 되므로 먼저 죽인다
          gsap.killTweensOf(imgs[index]);
          gsap.set(imgs[index], { autoAlpha: 0 });
          index = (index + 1) % imgs.length;
          gsap.killTweensOf(imgs[index]);
          gsap.fromTo(
            imgs[index],
            { autoAlpha: 0, scale: 0.8 },
            { autoAlpha: 1, scale: 1, rotation: gsap.utils.random(-15, 15), duration: 0.32, ease: 'back.out(1.2)' },
          );
          const wait = 100 + 400 * (1 - Math.sin(Math.min(elapsed / 5000, 1) * Math.PI));
          timers.push(window.setTimeout(next, wait));
        };
        next();
      };

      gsap
        .timeline()
        .to(letter, { opacity: 1, yPercent: 0, duration: 1, ease: 'power4.inOut' })
        .to(dot, { scale: 1, duration: 1, ease: 'power4.inOut' }, '<')
        .to(imgWrap, { width: isDesktop() ? '20rem' : '10rem', duration: 1.2, ease: 'power4.inOut' })
        .fromTo(
          imgs[0],
          { autoAlpha: 1, scale: 0 },
          { scale: 1, rotation: 15, duration: 0.8, ease: 'back.out(0.9)' },
          '-=0.7',
        )
        .add(() => {
          const count = { val: 100 };
          gsap.to(count, {
            val: 0,
            duration: 5000 / 750,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(count.val)).padStart(3, '0');
            },
          });
          cycle();
        });
    }, el);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      ctx.revert();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={root}
      data-loader-root
      className='fixed inset-x-0 top-0 z-[1001] flex h-[100svh] items-center justify-center overflow-hidden bg-black text-white'
      aria-hidden
    >
      <div className='flex items-center'>
        <div className='flex overflow-hidden'>
          <svg
            data-loader-letter
            viewBox={`0 0 254 ${WORDMARK_HEIGHT}`}
            className='h-[7.6rem] w-auto opacity-0 max-lg:h-16'
            fill='currentColor'
          >
            <path d={first.d} />
          </svg>
        </div>
        <div data-loader-imgs className='relative flex h-[20rem] w-[1rem] items-center justify-center max-lg:h-40'>
          {loaderImages.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              data-loader-img
              src={src}
              alt=''
              className='invisible absolute left-1/2 top-1/2 h-[14rem] w-[11rem] rounded-[0.25rem] object-cover max-lg:h-28 max-lg:w-24'
            />
          ))}
        </div>
        <svg
          data-loader-dot
          viewBox={`1350 0 60 ${WORDMARK_HEIGHT}`}
          className='h-[7.6rem] w-auto scale-0 max-lg:h-16'
          fill='currentColor'
        >
          <path d={accent.d} />
        </svg>
      </div>
      <div
        data-loader-count
        className='absolute bottom-[1.75rem] left-1/2 -translate-x-1/2 text-[1rem] font-bold max-lg:text-sm'
      >
        100
      </div>
    </div>
  );
};

export default Loader;
