'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

// noth.in 과 같은 Lenis 설정 (duration 1.2, expo-out) + ScrollTrigger 동기화
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
};

export default SmoothScroll;
