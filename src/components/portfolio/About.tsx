import { about } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

// 소개문 한 단락, 그 아래 번호 매긴 원칙 셋. 큰 숫자 + 제목 + 짧은 글.
const About = () => {
  return (
    <section id='about' className='scroll-mt-16 pb-24 md:pb-36'>
      <SectionHead title='About' note='어떻게 개발을 시작했고, 무엇을 중요하게 생각하는지.' />
      <div className={GRID}>
        <p
          data-reveal
          className='col-span-12 break-keep text-[20px] leading-[1.6] tracking-[-0.01em] md:col-span-8 md:col-start-2 md:text-[26px]'
        >
          {about.statement}
        </p>

        <ol className='col-span-12 mt-16 grid gap-x-6 gap-y-10 md:col-span-11 md:col-start-2 md:mt-24 md:grid-cols-3'>
          {about.principles.map((p, i) => (
            <li key={p.title} data-reveal data-reveal-delay={String(i * 0.08)} className='border-t border-quiet-line pt-5'>
              <span className='block text-[44px] font-light leading-none tracking-[-0.03em] text-quiet-mute md:text-[56px]'>
                {i + 1}
              </span>
              <h3 className='mt-6 text-[17px] font-semibold tracking-[-0.01em]'>{p.title}</h3>
              <p className='mt-2 break-keep text-[15px] leading-[1.7] text-quiet-ink/75'>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default About;
