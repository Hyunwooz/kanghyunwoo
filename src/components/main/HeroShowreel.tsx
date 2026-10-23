'use client';

import { useEffect, useRef } from 'react';
import { hero, showreel, socials } from '@/data/home';
import { gsap } from '@/lib/gsap';
import { emit, HERO_REVEAL_START, HERO_REVEALED, shuffle } from './core/events';
import { FluidReveal } from './hero/FluidReveal';
import Btn from './ui/Btn';
import Media from './ui/Media';
import WordmarkSvg from './ui/WordmarkSvg';

/*
 * 원본 구조
 *  .section-w (높이 300vh, 위아래로 -100vh 겹침, 검은 바탕)
 *    ├ video-hero-bg     커서로 지우면 드러나는 배경
 *    ├ mask-reveal-canvas 흰 바탕 + 워드마크 (three.js 유체 마스크)
 *    ├ section-fake-hero  mix-blend-difference 텍스트 레이어
 *    └ hero-home          워드마크 SVG (캔버스에 구워진 뒤 숨김)
 *  .section.showreel      캔버스의 흰 영역 위에 얹힌 선언문 + 줄어드는 영상
 */
const HeroShowreel = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const showreelRef = useRef<HTMLElement>(null);
  const fullRef = useRef<HTMLDivElement>(null);

  // 워드마크 등장 → 유체 마스크 시작
  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;
    let fluid: FluidReveal | null = null;
    let cancelled = false;

    const letters = Array.from(svg.querySelectorAll<SVGPathElement>('[data-letter-path]'));
    const accent = svg.querySelector('[data-accent-path]');
    gsap.set(letters, { autoAlpha: 0 });
    gsap.set(accent, { scale: 0, transformOrigin: '50% 50%' });

    const startFluid = async () => {
      try {
        fluid = new FluidReveal({
          container: wrap,
          svg,
          isActive: () => {
            const w = fullRef.current?.style.width;
            return !w || parseFloat(w) >= 99;
          },
        });
        await fluid.bake();
        if (cancelled) return;
        fluid.start();
        wrap.style.backgroundColor = '#000';
        wrap.querySelector<HTMLElement>('[data-hero-section]')!.style.backgroundColor = 'transparent';
      } catch {
        // WebGL 을 못 쓰는 환경이면 SVG 를 그대로 보여준다
        fluid?.destroy();
        fluid = null;
      }
    };

    const onStart = () => {
      gsap.fromTo(
        shuffle(letters),
        { autoAlpha: 1, yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.8,
          ease: 'power4.inOut',
          stagger: 0.07,
          delay: 0.2,
          onComplete: () => {
            emit(HERO_REVEALED);
            startFluid();
          },
        },
      );
      gsap.to(accent, { scale: 1, duration: 0.6, ease: 'back.out(0.9)', delay: 1.5 });
    };
    window.addEventListener(HERO_REVEAL_START, onStart, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener(HERO_REVEAL_START, onStart);
      fluid?.destroy();
      gsap.killTweensOf([letters, accent]);
    };
  }, []);

  // 쇼릴: 섹션을 지나가는 동안 영상이 전체 폭 → 오른쪽 아래 카드로 줄어든다 (데스크톱만)
  useEffect(() => {
    const section = showreelRef.current;
    const full = fullRef.current;
    if (!section || !full) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      gsap.fromTo(
        full,
        { width: '100%', height: '100%' },
        {
          width: '33.3%',
          height: '35%',
          ease: 'power4.inOut',
          immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 3, invalidateOnRefresh: true },
        },
      );
      return () => gsap.set(full, { clearProps: 'width,height' });
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <div
        id='top'
        ref={wrapRef}
        className='relative z-0 -mb-[100svh] -mt-[100svh] flex h-[300svh] items-center justify-center overflow-hidden bg-white'
      >
        <Media
          image={hero.media.image}
          video={hero.media.video}
          className='absolute left-0 top-1/2 h-[100svh] w-full -translate-y-1/2 object-cover'
        />

        <section data-hero-section className='relative z-0 flex h-[100svh] w-full items-center bg-white px-[1.25rem] text-black max-lg:px-4'>
          <div className='w-full overflow-hidden'>
            <WordmarkSvg ref={svgRef} />
          </div>
        </section>

        <div className='pointer-events-none absolute inset-x-0 top-[100svh] z-[2] flex h-[100svh] flex-col justify-between px-[1.25rem] py-[1rem] text-white mix-blend-difference max-lg:px-4'>
          <div className='pointer-events-auto flex flex-col items-start gap-[1.25rem]'>
            <p data-line data-no-scroll data-delay='1.5' className='text-[1.5625rem] leading-[1] tracking-[-0.01em] max-lg:text-xl'>
              {hero.tagline[0]}
              <br />
              {hero.tagline[1]}
            </p>
            <Btn href={hero.cta.href} variant='blend' data-opacity data-no-scroll data-delay='2'>
              {hero.cta.label}
            </Btn>
          </div>
          <div className='pointer-events-auto flex items-center justify-between'>
            <h1 data-line data-no-scroll data-delay='1.5' className='text-[0.875rem] leading-none tracking-[-0.01em] max-lg:text-xs'>
              {hero.caption}
            </h1>
            <div
              data-opacity
              data-no-scroll
              data-delay='1.5'
              className='flex items-center gap-[1.25rem] text-[0.75rem] font-bold uppercase leading-none max-lg:gap-2 max-lg:text-[10px]'
            >
              {socials.map((social, index) => (
                <span key={social.href} className='flex items-center gap-[1.25rem] max-lg:gap-2'>
                  {index > 0 && <span>/</span>}
                  <a href={social.href} target='_blank' rel='noopener noreferrer'>
                    {social.label}
                  </a>
                </span>
              ))}
              <span className='rounded-[0.25rem] bg-white px-[0.35rem] py-[0.2rem] text-black'>KR</span>
            </div>
          </div>
        </div>
      </div>

      <section ref={showreelRef} className='relative z-[1] text-black'>
        <div className='relative px-[1.25rem] pb-[5.3rem] pt-[10.4rem] max-lg:px-4 max-lg:pb-16 max-lg:pt-28'>
          <h2 data-line className='break-keep text-[5rem] leading-[1] tracking-[-0.01em] max-lg:text-[40px]'>
            {showreel.title[0]}
            <br />
            {showreel.title[1]}
          </h2>
          <div className='relative mt-[3.6rem] flex h-[58rem] items-end justify-end max-lg:mt-10 max-lg:h-auto max-lg:flex-col'>
            <div ref={fullRef} className='relative h-full w-full overflow-hidden rounded-[0.25rem] bg-black max-lg:aspect-[4/3] max-lg:h-auto'>
              <Media image={showreel.media.image} video={showreel.media.video} className='h-full w-full object-cover' />
            </div>
            <div className='absolute bottom-0 left-0 flex gap-[6.25rem] pb-[1.6rem] text-[1.125rem] leading-[1.2] max-lg:static max-lg:mt-6 max-lg:flex-col max-lg:gap-3 max-lg:pb-0 max-lg:text-base'>
              <div data-line data-delay='0.2' className='whitespace-nowrap'>
                {showreel.label}
              </div>
              <div data-line data-delay='0.2' className='w-[20.97rem] break-keep max-lg:w-auto'>
                {showreel.text}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroShowreel;
