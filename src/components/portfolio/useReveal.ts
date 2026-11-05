import { useEffect, type RefObject } from 'react';

// [data-reveal] 요소가 화면에 들어오면 .is-in 을 붙인다. 스타일은 globals.css 의 .wd-paper 블록.
// data-reveal-delay="0.1" 처럼 초 단위 지연을 줄 수 있다.
export const useReveal = (root: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const delay = target.dataset.revealDelay;
          if (delay) target.style.transitionDelay = `${delay}s`;
          target.classList.add('is-in');
          io.unobserve(target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, [root]);
};
