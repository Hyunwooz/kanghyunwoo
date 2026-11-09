'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { projects } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

/*
 * 프로젝트 색인.
 *  - 행에 커서를 올리면 썸네일이 커서를 따라온다 (hover 가 되는 기기만)
 *  - 행을 누르면 아래로 펼쳐져 한 일 / 역할 / 기여 / 스택 / 링크가 나온다
 */
const Projects = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const canHover = useRef(false);

  // 커서를 느리게 따라오는 미리보기 (펼친 행 위에서는 상세를 가리므로 숨긴다)
  useEffect(() => {
    canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover.current) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const tick = () => {
      const el = previewRef.current;
      if (el) {
        current.current.x += (target.current.x - current.current.x) * 0.14;
        current.current.y += (target.current.y - current.current.y) * 0.14;
        el.style.transform = `translate3d(${current.current.x + 28}px, ${current.current.y - 90}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const year = (period: string) => period.slice(0, 4);

  return (
    <section id='projects' className='scroll-mt-16 pb-24 md:pb-32'>
      <SectionHead no='03' title='Projects' note='눌러서 펼치면 한 일과 맡은 몫이 나옵니다.' />

      <ol className='retro-card bg-retro-cream'>
        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <li
              key={p.name}
              data-reveal
              data-reveal-delay={String(i * 0.04)}
              className={`${i > 0 ? 'border-t-[3px] border-retro-ink' : ''} ${isOpen ? 'bg-retro-yellow/40' : ''} transition-colors duration-300`}
            >
              <button
                type='button'
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`${GRID} group w-full items-center px-5 py-5 text-left md:px-7 md:py-6`}
              >
                <span className='col-span-2 font-mono text-[12px] md:col-span-1'>{String(i + 1).padStart(2, '0')}</span>
                <span className='col-span-10 font-display text-[22px] leading-[1.05] tracking-[0.01em] transition-colors group-hover:text-retro-pink md:col-span-5 md:text-[32px]'>
                  {p.name}
                </span>
                <span className='col-span-10 col-start-3 mt-2 break-keep text-[14px] font-medium text-retro-ink/70 md:col-span-4 md:col-start-auto md:mt-0 md:text-[15px]'>
                  {p.decs}
                </span>
                <span className='col-span-10 col-start-3 mt-2 flex items-center justify-between font-mono text-[12px] md:col-span-2 md:col-start-auto md:mt-0 md:justify-end md:gap-5'>
                  <span>{year(p.period)}</span>
                  <span
                    aria-hidden
                    className={`retro-card-sm inline-flex h-8 w-8 items-center justify-center bg-retro-cream text-[18px] leading-none transition-all duration-300 group-hover:bg-retro-yellow ${isOpen ? 'rotate-45 bg-retro-pink text-retro-cream' : ''}`}
                  >
                    +
                  </span>
                </span>
              </button>

              <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className='overflow-hidden'>
                  <div className={`${GRID} px-5 pb-8 pt-2 md:px-7 md:pb-10`}>
                    <ul className='col-span-12 space-y-2 text-[15px] leading-[1.6] md:col-span-6 md:col-start-2'>
                      {p.done.map((d) => (
                        <li key={d} className='flex gap-3 break-keep'>
                          <span className='mt-[0.2em] shrink-0 text-[12px] text-retro-pink'>✦</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    <dl className='retro-card-sm col-span-12 mt-8 bg-retro-cream text-[13px] md:col-span-4 md:col-start-9 md:mt-0'>
                      <Row label='Period' value={p.period} />
                      <Row label='Team' value={p.role} />
                      <Row label='Part' value={p.contribution.map((c) => `${c.type} ${c.percent}%`).join(' · ')} />
                      <Row label='Stack' value={p.skillStacks.join(', ')} />
                      {(p.siteUrl || p.githubUrl) && (
                        <div className='flex flex-wrap gap-2 px-3 py-3 font-mono text-[11px] uppercase tracking-[0.14em]'>
                          {p.siteUrl && <ExtLink href={p.siteUrl}>Site</ExtLink>}
                          {p.githubUrl && <ExtLink href={p.githubUrl}>GitHub</ExtLink>}
                        </div>
                      )}
                    </dl>

                    {/* hover 미리보기가 없는 기기에서는 펼쳤을 때 썸네일을 보여준다 */}
                    <div className='retro-card-sm relative col-span-12 mt-8 aspect-[16/10] overflow-hidden bg-retro-cream md:hidden'>
                      <Image src={p.thumbnail} alt={p.name} fill sizes='100vw' className='object-cover' />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* 커서를 따라오는 썸네일 */}
      <div
        ref={previewRef}
        aria-hidden
        className={`retro-card pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[16/10] w-[300px] rotate-3 overflow-hidden bg-retro-cream transition-opacity duration-300 md:block ${
          hover === null || hover === open ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {projects.map((p, i) => (
          <Image
            key={p.thumbnail}
            src={p.thumbnail}
            alt=''
            fill
            sizes='300px'
            className={`object-cover transition-opacity duration-300 ${hover === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    </section>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className='grid grid-cols-[5.5em_1fr] gap-3 border-b-2 border-retro-ink px-3 py-2.5'>
    <dt className='font-mono text-[11px] uppercase tracking-[0.14em] text-retro-ink/70'>{label}</dt>
    <dd className='break-keep font-medium leading-[1.5]'>{value}</dd>
  </div>
);

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='border-2 border-retro-ink bg-retro-ink px-2.5 py-1 text-retro-cream transition-colors hover:bg-retro-pink'
  >
    {children} ↗
  </a>
);

export default Projects;
