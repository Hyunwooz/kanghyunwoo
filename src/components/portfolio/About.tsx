import { about } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

const About = () => {
  return (
    <section id='about' className='scroll-mt-16 pb-24 md:pb-32'>
      <SectionHead no='01' title='About' note='어떻게 개발을 시작했고, 무엇을 중요하게 생각하는지.' />
      <div className={GRID}>
        <p
          data-reveal
          className='col-span-12 break-keep text-[22px] leading-[1.45] tracking-[-0.01em] md:col-span-8 md:col-start-4 md:text-[30px]'
        >
          {about.statement}
        </p>

        <ol className='col-span-12 mt-14 grid gap-10 border-t border-rule pt-8 md:col-span-9 md:col-start-4 md:mt-20 md:grid-cols-3 md:gap-8'>
          {about.principles.map((p, i) => (
            <li key={p.title} data-reveal data-reveal-delay={String(i * 0.08)}>
              <span className='font-mono text-[11px] text-accent'>0{i + 1}</span>
              <h3 className='mt-3 text-[17px] font-semibold tracking-[-0.01em]'>{p.title}</h3>
              <p className='mt-2 break-keep text-[15px] leading-[1.65] text-muted'>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default About;
