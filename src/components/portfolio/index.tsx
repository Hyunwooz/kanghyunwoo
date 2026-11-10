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

// 포트폴리오: 조용한 음반 재킷(ECM)처럼. 종이색 바탕, 먹색 글자, 사진 한 장, 가는 선, 번호 매긴 섹션.
// 꾸밈은 두지 않는다. 색은 종이·먹·회색 셋뿐이고, 움직임은 등장할 때의 옅은 페이드 하나.
const PortfolioPage = () => {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);
  useConsoleWelcome();

  return (
    <div
      ref={root}
      className='wd-quiet relative min-h-screen overflow-x-clip bg-quiet-paper text-quiet-ink selection:bg-quiet-ink selection:text-quiet-paper'
    >
      <TopBar />
      <main className='mx-auto max-w-[1280px] px-5 md:px-10 lg:px-14'>
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
