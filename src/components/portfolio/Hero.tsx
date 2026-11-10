import { hero } from '@/data/portfolio';

/*
 * 히어로. 사진 없이 글자만.
 *  - 라벨 / 이름
 *  - 소개문을 가로로 길게. 넓은 화면에서는 문장마다 한 줄씩 놓는다
 *  - 아래: 가는 선으로 나눈 메타 네 칸
 */
const Hero = () => {
  // 마침표 뒤 공백에서 문장을 나눈다
  const sentences = hero.lead.split(/(?<=\.)\s+/);

  return (
    <section id='top' className='pb-20 pt-16 md:pb-28 md:pt-32'>
      <p data-reveal className='font-mono text-[11px] uppercase tracking-[0.14em] text-quiet-mute'>
        {hero.eyebrow}
      </p>
      <h1 data-reveal data-reveal-delay='0.06' className='mt-6 text-[15px] font-medium tracking-[-0.01em]'>
        {hero.title.join(' ')}
        <span className='ml-2 font-normal text-quiet-mute'>{hero.role}</span>
      </h1>
      <p
        data-reveal
        data-reveal-delay='0.12'
        className='mt-10 break-keep text-[26px] font-medium leading-[1.4] tracking-[-0.02em] md:mt-14 md:text-[34px] xl:text-[40px]'
      >
        {sentences.map((s, i) => (
          <span key={s} className='lg:block'>
            {i > 0 && <span className='lg:hidden'> </span>}
            {s}
          </span>
        ))}
      </p>

      <dl data-reveal data-reveal-delay='0.18' className='mt-16 grid grid-cols-2 border-t border-quiet-line md:mt-28 md:grid-cols-4'>
        {hero.meta.map((row) => (
          <div key={row.label} className='border-b border-quiet-line py-4 pr-4 md:border-b-0'>
            <dt className='font-mono text-[11px] uppercase tracking-[0.14em] text-quiet-mute'>{row.label}</dt>
            <dd className='mt-2 break-keep text-[14px]'>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
