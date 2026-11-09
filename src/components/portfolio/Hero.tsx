import Image from 'next/image';
import { hero } from '@/data/portfolio';
import { GRID } from './grid';

/*
 * 히어로.
 *  - 왼쪽: 핑크 라벨 / 옐로 디스플레이 제목(남색 외곽선) / 크림 카드에 소개문 / 메타 표
 *  - 오른쪽: 일러스트 자리. hero.illustration 이 있으면 그림, 없으면 스트라이프 포스터로 채운다
 *  - 아래: 핑크 띠 마퀴
 */
const Hero = () => {
  return (
    <section id='top' className='relative isolate pb-16 pt-12 md:pb-24 md:pt-20'>
      {/* 배경: 오른쪽 위에서 왼쪽 아래로 가로지르는 스트라이프 띠 */}
      <div
        aria-hidden
        className='retro-stripes pointer-events-none absolute -right-[20%] top-[8%] -z-10 h-[120px] w-[140%] -rotate-[14deg] border-y-[3px] border-retro-ink opacity-90 md:top-[16%] md:h-[160px]'
      />
      <div
        aria-hidden
        className='retro-halftone pointer-events-none absolute -right-10 top-0 -z-10 h-[260px] w-[260px] text-retro-ink/30 [mask-image:radial-gradient(circle,black_30%,transparent_70%)]'
      />

      <div className={`${GRID} items-start`}>
        {/* 왼쪽 */}
        <div className='col-span-12 md:col-span-7'>
          <p
            data-reveal
            className='inline-block -rotate-2 border-2 border-retro-ink bg-retro-pink px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-retro-cream shadow-[3px_3px_0_#1A1838]'
          >
            {hero.eyebrow} — Frontend Developer
          </p>

          <h1
            data-reveal
            data-reveal-delay='0.08'
            className='retro-stroke mt-8 font-display text-[clamp(52px,8.4vw,128px)] uppercase leading-[0.9] tracking-[-0.01em] text-retro-yellow'
          >
            {hero.title[0]}
            <br />
            <span className='text-retro-cream'>{hero.title[1]}</span>
          </h1>

          <div
            data-reveal
            data-reveal-delay='0.16'
            className='retro-card mt-10 max-w-[34em] rotate-[0.6deg] bg-retro-cream p-5 md:mt-14 md:p-7'
          >
            <p className='break-keep text-[17px] font-semibold leading-[1.55] md:text-[20px]'>{hero.lead}</p>
          </div>

          <dl data-reveal data-reveal-delay='0.22' className='retro-card mt-10 max-w-[34em] bg-retro-ink text-retro-cream md:mt-12'>
            {hero.meta.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-baseline justify-between gap-6 px-4 py-3 ${i > 0 ? 'border-t-2 border-retro-cream/20' : ''}`}
              >
                <dt className='font-mono text-[11px] uppercase tracking-[0.16em] text-retro-yellow'>{row.label}</dt>
                <dd className='text-right text-[14px] font-medium'>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 오른쪽: 일러스트 자리 */}
        <div className='col-span-12 mt-12 md:col-span-5 md:mt-0 md:pl-6'>
          <div data-reveal data-reveal-delay='0.12' className='retro-card relative -rotate-1 overflow-hidden bg-retro-cream'>
            {hero.illustration ? (
              <div className='relative aspect-[4/5]'>
                <Image src={hero.illustration} alt='' fill priority sizes='(min-width: 768px) 40vw, 100vw' className='object-cover' />
              </div>
            ) : (
              <Poster />
            )}
          </div>
        </div>
      </div>

      {/* 마퀴 띠 */}
      <div
        data-reveal
        data-reveal-delay='0.3'
        className='relative left-1/2 mt-16 w-[102vw] -translate-x-1/2 -rotate-1 border-y-[3px] border-retro-ink bg-retro-pink py-2.5 text-retro-cream md:mt-24'
      >
        <div className='flex w-max animate-marquee font-display text-[13px] uppercase tracking-[0.12em] md:text-[15px]'>
          {[0, 1].map((n) => (
            <ul key={n} aria-hidden={n === 1} className='flex shrink-0'>
              {hero.ticker.map((t) => (
                <li key={t} className='flex items-center'>
                  <span className='px-5'>{t}</span>
                  <span className='text-retro-yellow'>✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

// 그림이 없을 때 채우는 포스터. 스트라이프 바탕에 해와 연도.
const Poster = () => (
  <div className='retro-stripes relative aspect-[4/5]'>
    <div aria-hidden className='absolute inset-0 bg-retro-ink/5' />
    {/* 해 */}
    <div className='absolute left-1/2 top-[38%] aspect-square w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-retro-ink bg-retro-yellow shadow-[6px_6px_0_#1A1838]'>
      <div className='retro-halftone absolute inset-0 rounded-full text-retro-ink/25 [mask-image:linear-gradient(to_bottom,transparent_40%,black_100%)]' />
    </div>
    {/* 아래 라벨 */}
    <div className='absolute inset-x-5 bottom-5 flex items-end justify-between border-t-[3px] border-retro-ink bg-retro-cream/90 px-4 py-3'>
      <span className='font-display text-[40px] leading-none md:text-[52px]'>’26</span>
      <span className='mb-1 text-right font-mono text-[10px] uppercase leading-[1.5] tracking-[0.16em]'>
        Portfolio
        <br />
        Side A
      </span>
    </div>
  </div>
);

export default Hero;
