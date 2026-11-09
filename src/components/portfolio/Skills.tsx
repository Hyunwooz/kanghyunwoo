import { skillGroups } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

// 그룹마다 칩 색을 바꾼다
const CHIP = [
  'bg-retro-cream hover:bg-retro-yellow',
  'bg-retro-yellow hover:bg-retro-pink hover:text-retro-cream',
  'bg-retro-pink text-retro-cream hover:bg-retro-violet',
  'bg-retro-violet text-retro-cream hover:bg-retro-cream hover:text-retro-ink',
];

const Skills = () => {
  return (
    <section id='skills' className='scroll-mt-16 pb-24 md:pb-32'>
      <SectionHead no='04' title='Skills' note='아이콘 대신 이름만. 써 본 것만 적었습니다.' />
      <div className={GRID}>
        <dl className='retro-card col-span-12 bg-retro-cream'>
          {skillGroups.map((g, i) => (
            <div
              key={g.label}
              data-reveal
              data-reveal-delay={String(i * 0.05)}
              className={`grid grid-cols-12 gap-x-4 px-5 py-5 md:gap-x-6 md:px-7 md:py-6 ${i > 0 ? 'border-t-[3px] border-retro-ink' : ''}`}
            >
              <dt className='col-span-12 font-display text-[13px] uppercase tracking-[0.1em] md:col-span-3'>{g.label}</dt>
              <dd className='col-span-12 mt-3 flex flex-wrap gap-2 md:col-span-9 md:mt-0'>
                {g.items.map((item) => (
                  <span
                    key={item}
                    className={`retro-card-sm px-3 py-1 text-[14px] font-semibold transition-colors ${CHIP[i % CHIP.length]}`}
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Skills;
