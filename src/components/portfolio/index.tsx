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

// 포트폴리오: 종이색 바탕 위에 번호 매긴 다섯 섹션. 격자와 가는 선, 세리프 제목으로 잡지처럼.
const PortfolioPage = () => {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  useConsoleWelcome();

  return (
    <div ref={root} className='wd-paper min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper'>
      <TopBar />
      <main className='mx-auto max-w-[1680px] px-5 md:px-10 lg:px-14'>
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
