import { skillGroups } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

// 기술. 그룹 이름과 쉼표로 이은 이름들뿐.
const Skills = () => {
  return (
    <section id='skills' className='scroll-mt-16 pb-24 md:pb-36'>
      <SectionHead title='Skills' note='아이콘 대신 이름만. 써 본 것만 적었습니다.' />
      <dl>
        {skillGroups.map((g, i) => (
          <div
            key={g.label}
            data-reveal
            data-reveal-delay={String(i * 0.05)}
            className={`${GRID} border-t border-quiet-line py-5 first:border-t-0 first:pt-0`}
          >
            <dt className='col-span-12 font-mono text-[12px] text-quiet-mute md:col-span-2 md:col-start-2 md:pt-1'>{g.label}</dt>
            <dd className='col-span-12 mt-2 break-keep text-[16px] leading-[1.7] md:col-span-9 md:mt-0 md:text-[17px]'>
              {g.items.join(', ')}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Skills;
