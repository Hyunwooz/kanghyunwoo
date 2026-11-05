import { hero } from '@/data/portfolio';
import { GRID } from './grid';

const Hero = () => {
  return (
    <section id='top' className='pb-20 pt-16 md:pb-28 md:pt-24'>
      <div className={GRID}>
        <p data-reveal className='col-span-12 font-mono text-[11px] uppercase tracking-[0.18em] text-muted'>
          {hero.eyebrow} — Frontend Developer
        </p>
        <h1
          data-reveal
          data-reveal-delay='0.08'
          className='col-span-12 mt-8 font-serif text-[clamp(64px,12vw,184px)] leading-[0.88] tracking-[-0.025em]'
        >
          {hero.title[0]}
          <br />
          <em className='font-normal italic'>{hero.title[1]}</em>
        </h1>

        <p
          data-reveal
          data-reveal-delay='0.16'
          className='col-span-12 mt-12 max-w-[30em] break-keep text-[18px] leading-[1.55] md:col-span-7 md:mt-16 md:text-[22px]'
        >
          {hero.lead}
        </p>

        <dl
          data-reveal
          data-reveal-delay='0.24'
          className='col-span-12 mt-10 self-end border-t border-rule md:col-span-4 md:col-start-9 md:mt-16'
        >
          {hero.meta.map((row) => (
            <div key={row.label} className='flex items-baseline justify-between gap-6 border-b border-rule py-3'>
              <dt className='font-mono text-[11px] uppercase tracking-[0.16em] text-muted'>{row.label}</dt>
              <dd className='text-right text-[14px]'>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
