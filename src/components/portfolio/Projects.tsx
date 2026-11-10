'use client';

import Image from 'next/image';
import { useState } from 'react';
import { projects } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

// 프로젝트 색인. 줄을 누르면 아래로 펼쳐져 한 일 / 썸네일 / 역할 / 기여 / 스택 / 링크가 나온다.
const Projects = () => {
  const [open, setOpen] = useState<number | null>(null);
  const year = (period: string) => period.slice(0, 4);

  return (
    <section id='projects' className='scroll-mt-16 pb-24 md:pb-36'>
      <SectionHead title='Projects' note='눌러서 펼치면 한 일과 맡은 몫이 나옵니다.' />

      <ol className='border-b border-quiet-line'>
        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <li key={p.name} data-reveal data-reveal-delay={String(i * 0.04)} className='border-t border-quiet-line first:border-t-0'>
              <button
                type='button'
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`${GRID} group w-full items-baseline py-6 text-left md:py-7`}
              >
                <span className='col-span-2 font-mono text-[12px] text-quiet-mute md:col-span-1'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className='col-span-10 text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] md:col-span-4 md:text-[22px]'>
                  <span className='underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-quiet-ink'>
                    {p.name}
                  </span>
                </span>
                <span className='col-span-10 col-start-3 mt-1.5 break-keep text-[14px] text-quiet-mute md:col-span-5 md:col-start-auto md:mt-0 md:text-[15px]'>
                  {p.decs}
                </span>
                <span className='col-span-10 col-start-3 mt-2 flex items-baseline justify-between font-mono text-[12px] text-quiet-mute md:col-span-2 md:col-start-auto md:mt-0 md:justify-end md:gap-6'>
                  <span>{year(p.period)}</span>
                  <span
                    aria-hidden
                    className={`text-[16px] leading-none text-quiet-ink transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className='overflow-hidden'>
                  <div className={`${GRID} pb-10 pt-2 md:pb-12`}>
                    <div className='col-span-12 md:col-span-6 md:col-start-2'>
                      <ul className='space-y-1.5 text-[15px] leading-[1.65] text-quiet-ink/85'>
                        {p.done.map((d) => (
                          <li key={d} className='break-keep'>
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div className='relative mt-8 aspect-[16/10] overflow-hidden bg-quiet-line'>
                        <Image src={p.thumbnail} alt={p.name} fill sizes='(min-width: 768px) 50vw, 100vw' className='object-cover' />
                      </div>
                    </div>

                    <dl className='col-span-12 mt-8 text-[14px] md:col-span-4 md:col-start-9 md:mt-0'>
                      <Row label='Period' value={p.period} />
                      <Row label='Team' value={p.role} />
                      <Row label='Part' value={p.contribution.map((c) => `${c.type} ${c.percent}%`).join(' · ')} />
                      <Row label='Stack' value={p.skillStacks.join(', ')} />
                      {(p.siteUrl || p.githubUrl) && (
                        <div className='flex flex-wrap gap-5 border-t border-quiet-line py-3'>
                          {p.siteUrl && <ExtLink href={p.siteUrl}>Site</ExtLink>}
                          {p.githubUrl && <ExtLink href={p.githubUrl}>GitHub</ExtLink>}
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className='grid grid-cols-[5.5em_1fr] gap-3 border-t border-quiet-line py-3'>
    <dt className='pt-[0.15em] font-mono text-[11px] uppercase tracking-[0.14em] text-quiet-mute'>{label}</dt>
    <dd className='break-keep leading-[1.55]'>{value}</dd>
  </div>
);

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='underline decoration-quiet-line underline-offset-4 transition-colors hover:decoration-quiet-ink'
  >
    {children} ↗
  </a>
);

export default Projects;
