import { skillGroups } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

const Skills = () => {
  return (
    <section id='skills' className='scroll-mt-16 pb-24 md:pb-32'>
      <SectionHead no='04' title='Skills' note='아이콘 대신 이름만. 써 본 것만 적었습니다.' />
      <div className={GRID}>
        <dl className='col-span-12 border-t border-rule md:col-span-9 md:col-start-4'>
          {skillGroups.map((g, i) => (
            <div key={g.label} data-reveal data-reveal-delay={String(i * 0.05)} className='grid grid-cols-12 gap-x-4 border-b border-rule py-5 md:gap-x-6'>
              <dt className='col-span-12 font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:col-span-3'>{g.label}</dt>
              <dd className='col-span-12 mt-2 text-[17px] leading-[1.6] tracking-[-0.005em] md:col-span-9 md:mt-0'>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Skills;
