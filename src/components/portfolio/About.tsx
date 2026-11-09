import { about } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

// 카드 세 장은 색과 기울기를 번갈아 준다
const CARD = [
  { bg: 'bg-retro-cream', tilt: '-rotate-1' },
  { bg: 'bg-retro-yellow', tilt: 'rotate-1 md:translate-y-4' },
  { bg: 'bg-retro-violet text-retro-cream', tilt: '-rotate-[0.5deg]' },
];

const About = () => {
  return (
    <section id='about' className='scroll-mt-16 pb-24 md:pb-32'>
      <SectionHead no='01' title='About' note='어떻게 개발을 시작했고, 무엇을 중요하게 생각하는지.' />
      <div className={GRID}>
        <p
          data-reveal
          className='col-span-12 break-keep text-[22px] font-bold leading-[1.4] tracking-[-0.01em] text-retro-cream md:col-span-9 md:text-[32px]'
        >
          {about.statement}
        </p>

        <ol className='col-span-12 mt-14 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8'>
          {about.principles.map((p, i) => {
            const c = CARD[i % CARD.length];
            return (
              <li
                key={p.title}
                data-reveal
                data-reveal-delay={String(i * 0.08)}
                className={`retro-card ${c.bg} ${c.tilt} p-6 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1`}
              >
                <span className='inline-block border-2 border-current px-2 py-0.5 font-mono text-[11px]'>0{i + 1}</span>
                <h3 className='mt-5 text-[19px] font-bold leading-[1.2] tracking-[-0.01em]'>{p.title}</h3>
                <p className='mt-3 break-keep text-[15px] leading-[1.65] opacity-85'>{p.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default About;
