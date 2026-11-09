import { experiences } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

const Experience = () => {
  return (
    <section id='experience' className='scroll-mt-16 pb-24 md:pb-32'>
      <SectionHead no='02' title='Experience' note='지나온 곳과 거기서 한 일.' />
      <ol className='space-y-6 md:space-y-8'>
        {experiences.map((exp, i) => (
          <li
            key={exp.name}
            data-reveal
            data-reveal-delay={String(i * 0.05)}
            className={`${GRID} retro-card bg-retro-cream p-6 md:p-8`}
          >
            <div className='col-span-12 md:col-span-3'>
              <span className='inline-block border-2 border-retro-ink bg-retro-pink px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-retro-cream shadow-[2px_2px_0_#1A1838]'>
                {exp.period}
              </span>
            </div>
            <div className='col-span-12 mt-5 md:col-span-6 md:mt-0'>
              <h3 className='text-[24px] font-bold leading-[1.15] tracking-[-0.01em] md:text-[28px]'>{exp.name}</h3>
              <p className='mt-2 break-keep text-[14px] text-retro-ink/70'>
                {exp.decs}
                {exp.role && <span className='before:mx-2 before:content-["·"]'>{exp.role}</span>}
              </p>
              <ul className='mt-5 space-y-2 text-[15px] leading-[1.6]'>
                {exp.works.map((work) => (
                  <li key={work} className='flex gap-3 break-keep'>
                    <span className='mt-[0.2em] shrink-0 text-[12px] text-retro-pink'>✦</span>
                    <span>{work}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className='col-span-12 mt-6 flex flex-wrap gap-1.5 md:col-span-3 md:mt-0 md:justify-end md:self-start'>
              {exp.skillStacks.map((s) => (
                <li
                  key={s}
                  className='border-2 border-retro-ink bg-retro-cream px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]'
                >
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
