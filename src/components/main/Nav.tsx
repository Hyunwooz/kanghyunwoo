'use client';

import { useEffect, useRef, useState } from 'react';
import { navLinks } from '@/data/home';
import { wordmarkLetters, WORDMARK_HEIGHT, WORDMARK_WIDTH } from '@/data/wordmark';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { isDesktop, shuffle } from './core/events';
import { useLenis } from './core/SmoothScroll';

const LOGO_REST_WIDTH = 317;
const accent = wordmarkLetters[wordmarkLetters.length - 1];
const ACCENT_REST_X = -(1353.41 - 262);
const middle = wordmarkLetters.slice(1, -1);

// 4개의 작은 사각형("::")이 45도 돌며 모이는 메뉴 아이콘
const rects = [
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 0, y: 4 },
  { x: 4, y: 4 },
];

// 원본 nav: 고정 + mix-blend-difference. 로고 N’ 에 호버하면 NOTHIN’ 으로 펼쳐진다.
// 여기서는 W. → WOOHYUN.
const Nav = () => {
  const root = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const logoWrap = el.querySelector<HTMLElement>('[data-logo]');
      const svg = el.querySelector<SVGSVGElement>('[data-logo] svg');
      const letters = Array.from(el.querySelectorAll<SVGPathElement>('[data-logo-letter]'));
      const dot = el.querySelector('[data-logo-dot]');
      gsap.set(letters, { y: 230 });
      gsap.set(dot, { x: ACCENT_REST_X });

      // 히어로에 큰 워드마크가 있으니 10% 스크롤 전에는 로고를 숨긴다
      gsap.set(logoWrap, { autoAlpha: 0 });
      ScrollTrigger.create({
        start: () => window.innerHeight * 0.1,
        end: 'max',
        onToggle: (self) =>
          gsap.to(logoWrap, {
            autoAlpha: self.isActive ? 1 : 0,
            duration: self.isActive ? 0.4 : 0.3,
            ease: self.isActive ? 'power2.out' : 'power2.in',
            overwrite: true,
          }),
      });

      let tl: gsap.core.Timeline | null = null;
      const open = () => {
        if (!isDesktop() || !svg) return;
        tl?.kill();
        tl = gsap.timeline();
        tl.to(svg, { attr: { viewBox: `0 0 ${WORDMARK_WIDTH} ${WORDMARK_HEIGHT}` }, duration: 0.7, ease: 'power4.inOut' }, 0)
          .to(dot, { x: 0, duration: 0.7, ease: 'power4.inOut' }, 0);
        shuffle(letters).forEach((letter, k) =>
          tl?.to(letter, { y: 0, duration: 0.6, ease: 'power4.inOut' }, 0.35 + k * 0.06),
        );
      };
      const close = () => {
        if (!svg) return;
        tl?.kill();
        tl = gsap.timeline();
        shuffle(letters).forEach((letter, k) =>
          tl?.to(letter, { y: 230, duration: 0.6, ease: 'power4.inOut' }, k * 0.08),
        );
        tl.to(svg, { attr: { viewBox: `0 0 ${LOGO_REST_WIDTH} ${WORDMARK_HEIGHT}` }, duration: 0.7, ease: 'power4.inOut' })
          .to(dot, { x: ACCENT_REST_X, duration: 0.7, ease: 'power4.inOut' }, '<');
      };
      logoWrap?.addEventListener('mouseenter', open);
      logoWrap?.addEventListener('mouseleave', close);

      // 데스크톱 메뉴: 버튼 호버로 링크가 아래에서 올라온다
      const btn = el.querySelector<HTMLElement>('[data-menu-btn]');
      const linksWrap = el.querySelector<HTMLElement>('[data-menu-links]');
      const linkInners = Array.from(el.querySelectorAll<HTMLElement>('[data-menu-link] span'));
      const icon = el.querySelector('[data-menu-icon]');
      const iconRects = Array.from(el.querySelectorAll<SVGRectElement>('[data-menu-icon] rect'));
      gsap.set(linkInners, { yPercent: 110 });
      const menuTl = gsap.timeline({ paused: true });
      menuTl
        .to(icon, { rotateZ: 45, duration: 0.5, ease: 'power4.out', transformOrigin: '50% 50%' }, 0)
        .to(linkInners, { yPercent: 0, duration: 0.6, ease: 'power4.out', stagger: 0.08 }, 0);
      iconRects.forEach((r) => {
        const x = parseFloat(r.getAttribute('x') ?? '0');
        const y = parseFloat(r.getAttribute('y') ?? '0');
        menuTl.to(r, { x: x + 1 < 3 ? 0.3 : -0.3, y: y + 1 < 3 ? 0.3 : -0.3, duration: 0.5, ease: 'power4.out' }, 0);
      });
      let timer = 0;
      const show = () => {
        if (!isDesktop()) return;
        window.clearTimeout(timer);
        menuTl.play();
      };
      const hide = () => {
        timer = window.setTimeout(() => menuTl.reverse(), 60);
      };
      btn?.addEventListener('mouseenter', show);
      btn?.addEventListener('mouseleave', hide);
      linksWrap?.addEventListener('mouseenter', show);
      linksWrap?.addEventListener('mouseleave', hide);
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (mobileOpen) lenis.stop();
    else lenis.start();
  }, [mobileOpen, lenis]);

  const go = (href: string) => (event: React.MouseEvent) => {
    setMobileOpen(false);
    if (href.startsWith('#') && lenis) {
      event.preventDefault();
      lenis.scrollTo(href, { duration: 1.6 });
    }
  };

  return (
    <>
      <nav
        ref={root}
        data-opacity
        data-no-scroll
        data-delay='1.5'
        className='fixed inset-x-0 top-0 z-[1001] flex items-center justify-between px-[1.25rem] pt-[1.28rem] text-white mix-blend-difference max-lg:px-4 max-lg:pt-4'
      >
        <a data-logo href='#top' onClick={go('#top')} className='block h-[1.49rem] max-lg:h-5' aria-label='WOOHYUN.'>
          <svg
            viewBox={`0 0 ${LOGO_REST_WIDTH} ${WORDMARK_HEIGHT}`}
            className='h-full w-auto overflow-hidden'
            fill='currentColor'
          >
            <defs>
              <clipPath id='wd-logo-clip'>
                <rect x='0' y='0' width={WORDMARK_WIDTH} height={WORDMARK_HEIGHT} />
              </clipPath>
            </defs>
            <path d={wordmarkLetters[0].d} />
            <g clipPath='url(#wd-logo-clip)'>
              {middle.map((letter, index) => (
                <path key={index} data-logo-letter d={letter.d} />
              ))}
            </g>
            <path data-logo-dot d={accent.d} />
          </svg>
        </a>

        <div className='relative'>
          <button
            type='button'
            data-menu-btn
            onClick={() => !isDesktop() && setMobileOpen((v) => !v)}
            className='flex items-center gap-[0.375rem] text-[0.75rem] font-bold uppercase leading-none tracking-[0.0225rem] max-lg:text-[11px]'
          >
            menu
            <svg data-menu-icon viewBox='0 0 6 6' className='h-[0.45rem] w-[0.45rem] max-lg:h-2 max-lg:w-2' fill='currentColor'>
              {rects.map((r) => (
                <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width='2' height='2' />
              ))}
            </svg>
          </button>
          <ul data-menu-links className='absolute right-0 top-full flex flex-col items-end gap-[0.1rem] pt-[0.5rem] max-lg:hidden'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  data-menu-link
                  href={link.href}
                  onClick={go(link.href)}
                  className='block overflow-hidden text-[0.975rem] font-medium leading-[1.1]'
                >
                  <span className='block'>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileOpen && (
        <div className='fixed inset-0 z-[1000] flex flex-col justify-end bg-black px-4 pb-6 text-white lg:hidden'>
          <ul className='flex flex-col gap-1'>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={go(link.href)} className='text-5xl font-medium leading-tight'>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Nav;
