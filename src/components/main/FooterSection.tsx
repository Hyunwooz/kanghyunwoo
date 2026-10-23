'use client';

import { useEffect, useRef } from 'react';
import { contact, footer, socials } from '@/data/home';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { shuffle } from './core/events';
import Btn from './ui/Btn';
import WordmarkSvg from './ui/WordmarkSvg';

// 링크 밑줄: 왼쪽에서 그어졌다가, 마우스를 떼면 오른쪽으로 빠져나간다
const useUnderline = (root: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const links = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-underline]') ?? []);
    const cleanups = links.map((link) => {
      link.style.position = 'relative';
      const line = document.createElement('span');
      Object.assign(line.style, {
        position: 'absolute',
        bottom: '-3px',
        left: '0',
        width: '0%',
        height: '1px',
        background: 'currentColor',
      });
      link.appendChild(line);
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(line, { width: '0%', left: '0%' }, { width: '100%', duration: 0.6, ease: 'power4.inOut' })
        .addLabel('midway')
        .to(line, { width: '0%', left: '100%', duration: 0.6, ease: 'power4.inOut' });
      const enter = () => tl.tweenFromTo(0, 'midway');
      const leave = () => tl.play();
      link.addEventListener('mouseenter', enter);
      link.addEventListener('mouseleave', leave);
      return () => {
        tl.kill();
        line.remove();
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('mouseleave', leave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [root]);
};

const FooterSection = () => {
  const root = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useUnderline(root);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const wrap = svg.parentElement;
    const letters = Array.from(svg.querySelectorAll<SVGPathElement>('[data-letter-path]'));
    const accent = svg.querySelector<SVGPathElement>('[data-accent-path]');
    const all = accent ? [...letters, accent] : letters;
    const busy = new WeakSet<Element>();

    gsap.set(all, { transformOrigin: '50% 50%' });
    gsap.set([wrap, svg], { overflow: 'hidden' });
    gsap.set(letters, { yPercent: 120 });
    gsap.set(accent, { scale: 0 });

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 95%',
      once: true,
      onEnter: () => {
        gsap.to(shuffle(letters), {
          yPercent: 0,
          duration: 1.2,
          ease: 'power4.inOut',
          stagger: 0.03,
          delay: 0.2,
          onComplete: () => {
            gsap.set([wrap, svg], { overflow: 'visible' });
          },
        });
        gsap.to(accent, { scale: 1, duration: 0.6, ease: 'back.out(0.9)', delay: 1 });
      },
    });

    // 글자에 마우스를 올리면 점처럼 작아졌다가 탄성 있게 돌아온다
    const handlers = all.map((path) => {
      const enter = () => {
        if (busy.has(path)) return;
        busy.add(path);
        gsap
          .timeline({ onComplete: () => busy.delete(path) })
          .to(path, { scale: 0.05, duration: 0.6, ease: 'power2.inOut' })
          .to(path, { scale: 1, duration: 1.8, ease: 'elastic.out(1, 0.8)' });
      };
      path.addEventListener('mouseenter', enter);
      return () => path.removeEventListener('mouseenter', enter);
    });

    return () => {
      trigger.kill();
      handlers.forEach((fn) => fn());
      gsap.killTweensOf(all);
    };
  }, []);

  return (
    <footer
      id='footer'
      ref={root}
      className='relative flex min-h-[100svh] flex-col justify-end bg-black px-[1.25rem] pb-[1rem] text-white max-lg:px-4'
    >
      <div className='grid grid-cols-12 items-end gap-[1rem] max-lg:grid-cols-1 max-lg:gap-10'>
        <div className='col-span-8 max-lg:col-span-1'>
          <h2 data-line className='text-[5rem] leading-[1] tracking-[-0.01em] max-lg:text-[44px]'>
            {footer.title[0]}
            <br />
            {footer.title[1]}
          </h2>
          <div data-opacity className='mt-[1.75rem] flex flex-wrap gap-[0.7rem]'>
            <Btn href='/archive'>see the archive</Btn>
            <Btn href={`mailto:${contact.email}`} icon='at'>
              drop me an email
            </Btn>
          </div>
        </div>
        <ul className='col-span-3 col-start-10 flex flex-col text-[1.5625rem] leading-[1.25] max-lg:col-span-1 max-lg:col-start-1 max-lg:text-2xl'>
          {socials.map((social) => (
            <li key={social.href}>
              <a data-underline href={social.href} target='_blank' rel='noopener noreferrer'>
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-[9.5rem] max-lg:mt-16'>
        <WordmarkSvg ref={svgRef} className='text-white' />
      </div>

      <div className='mt-[1.3rem] flex items-center justify-between gap-[2rem] text-[0.875rem] leading-none tracking-[-0.01em] max-lg:flex-col max-lg:items-start max-lg:gap-3 max-lg:text-xs'>
        <div className='flex flex-wrap gap-x-[1rem] gap-y-2'>
          {footer.credits.map((credit) => (
            <span key={credit}>{credit}</span>
          ))}
        </div>
        <div className='flex gap-[1rem] font-mono text-[0.875rem] font-medium max-lg:text-xs'>
          {footer.links.map((link) => (
            <a key={link.href} data-underline href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
