import { experiences } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

const Experience = () => {
  return (
    <section id='experience' className='scroll-mt-16 pb-24 md:pb-32'>
      <SectionHead no='02' title='Experience' note='지나온 곳과 거기서 한 일.' />
      <ol className='border-t border-rule'>
        {experiences.map((exp, i) => (
          <li key={exp.name} data-reveal data-reveal-delay={String(i * 0.05)} className={`${GRID} border-b border-rule py-8 md:py-10`}>
            <div className='col-span-12 font-mono text-[12px] text-muted md:col-span-3'>{exp.period}</div>
            <div className='col-span-12 mt-3 md:col-span-6 md:mt-0'>
              <h3 className='text-[22px] leading-[1.15] tracking-[-0.01em] md:text-[26px]'>{exp.name}</h3>
              <p className='mt-1.5 break-keep text-[14px] text-muted'>
                {exp.decs}
                {exp.role && <span className='before:mx-2 before:content-["·"]'>{exp.role}</span>}
              </p>
              <ul className='mt-5 space-y-1.5 text-[15px] leading-[1.6]'>
                {exp.works.map((work) => (
                  <li key={work} className='flex gap-3 break-keep'>
                    <span className='mt-[0.75em] h-px w-3 shrink-0 bg-ink/40' />
                    <span>{work}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='col-span-12 mt-5 font-mono text-[12px] leading-[1.8] text-muted md:col-span-3 md:mt-0 md:text-right'>
              {exp.skillStacks.join(' / ')}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
