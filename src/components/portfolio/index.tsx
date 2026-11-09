'use client';

import { useRef } from 'react';
import { useConsoleWelcome } from '@/hook/useConsoleWelcome';
import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import Hero from './Hero';
import Projects from './Projects';
import Skills from './Skills';
import TopBar from './TopBar';
import { useReveal } from './useReveal';

// 포트폴리오: 80~90년대 시티팝 레코드 재킷처럼. 틸 바탕, 핑크 스트라이프, 두꺼운 남색 외곽선, 스티커 같은 카드.
const PortfolioPage = () => {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  useConsoleWelcome();

  return (
    <div
      ref={root}
      className='wd-retro relative min-h-screen overflow-x-clip bg-retro-teal text-retro-ink selection:bg-retro-pink selection:text-retro-cream'
    >
      <TopBar />
      <main className='mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14'>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
};

export default PortfolioPage;
