import { experiences } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

// 경력. 가는 선으로 나눈 줄: 기간 / 이름·한 일 / 스택.
const Experience = () => {
  return (
    <section id='experience' className='scroll-mt-16 pb-24 md:pb-36'>
      <SectionHead title='Experience' note='지나온 곳과 거기서 한 일.' />
      <ol>
        {experiences.map((exp, i) => (
          <li
            key={exp.name}
            data-reveal
            data-reveal-delay={String(i * 0.05)}
            className={`${GRID} border-t border-quiet-line py-8 first:border-t-0 first:pt-0 md:py-10`}
          >
            <p className='col-span-12 font-mono text-[12px] text-quiet-mute md:col-span-2 md:col-start-2 md:pt-1.5'>
              {exp.period}
            </p>
            <div className='col-span-12 mt-3 md:col-span-6 md:mt-0'>
              <h3 className='text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] md:text-[22px]'>{exp.name}</h3>
              <p className='mt-1.5 break-keep text-[14px] text-quiet-mute'>
                {exp.decs}
                {exp.role && <span> · {exp.role}</span>}
              </p>
              <ul className='mt-5 space-y-1.5 text-[15px] leading-[1.65] text-quiet-ink/85'>
                {exp.works.map((work) => (
                  <li key={work} className='break-keep'>
                    {work}
                  </li>
                ))}
              </ul>
            </div>
            <p className='col-span-12 mt-5 font-mono text-[12px] leading-[1.8] text-quiet-mute md:col-span-3 md:mt-0 md:pt-1.5 md:text-right'>
              {exp.skillStacks.join(', ')}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Experience;
