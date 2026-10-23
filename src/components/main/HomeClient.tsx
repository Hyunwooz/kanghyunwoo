'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import { initReveals } from './core/reveal';
import SmoothScroll from './core/SmoothScroll';
import FooterSection from './FooterSection';
import Faq from './Faq';
import Glitch from './Glitch';
import HeroShowreel from './HeroShowreel';
import Loader from './Loader';
import Musee from './Musee';
import Nav from './Nav';
import PersonSection from './PersonSection';
import Works from './Works';

// noth.in 홈 섹션 순서 그대로:
// loader → nav → hero(유체 마스크) + showreel → works → 전시장 영상 → studio → glitch → faq → footer
const HomeClient = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // 폰트가 늦게 오면 줄 나눔이 달라지므로 폰트 로드 후(최대 1초) 리빌을 나눈다
    const fontsReady = Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1000))]);
    fontsReady.then(() => {
      if (cancelled) return;
      cleanup = initReveals(el);
      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    });

    // 이미지/영상이 늦게 로드되면 트리거 위치를 다시 계산
    let timer = 0;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const media = Array.from(el.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img, video'));
    media.forEach((m) => {
      m.addEventListener('load', refresh);
      m.addEventListener('loadedmetadata', refresh);
    });

    return () => {
      cancelled = true;
      cleanup?.();
      window.clearTimeout(timer);
      media.forEach((m) => {
        m.removeEventListener('load', refresh);
        m.removeEventListener('loadedmetadata', refresh);
      });
    };
  }, []);

  return (
    <SmoothScroll>
      <main ref={root} className='wd-home overflow-x-clip'>
        <Loader />
        <Nav />
        <HeroShowreel />
        <Works />
        <Musee />
        <PersonSection />
        <Glitch />
        <Faq />
        <FooterSection />
      </main>
    </SmoothScroll>
  );
};

export default HomeClient;
