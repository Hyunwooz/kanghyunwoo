import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';
import { fired, HERO_REVEAL_START } from './events';

/*
 * noth.in 의 속성 기반 리빌 시스템을 그대로 옮겼다.
 *   data-line      줄 단위 마스크 리빌
 *   data-letter    글자 단위 마스크 리빌
 *   data-opacity   페이드
 *   data-scale     0 → 1 스케일
 *   data-clip      clip-path 와이프 (left | right | 기본=아래에서 위)
 *   data-delay     지연(초)
 *   data-no-scroll 스크롤이 아니라 히어로 등장 이벤트에 맞춰 재생
 * 부모에 data-stagger(간격), data-stagger-delay(시작 지연)를 주면 자식들이 순서대로 지연된다.
 */

const TRIGGER_START = 'top 95%';

const clipFrom = (value: string | null) => {
  if (value === 'left') return 'inset(100% 100% 0% 0%)';
  if (value === 'right') return 'inset(100% 0% 0% 100%)';
  return 'inset(100% 0% 0% 0%)';
};

const delayOf = (el: HTMLElement, attr: string) => {
  const own = el.dataset.delay;
  if (own !== undefined) return parseFloat(own) || 0;
  const parent = el.parentElement?.closest<HTMLElement>('[data-stagger]');
  if (!parent) return 0;
  const step = parseFloat(parent.dataset.stagger ?? '0') || 0;
  const base = parseFloat(parent.dataset.staggerDelay ?? '0') || 0;
  const siblings = Array.from(parent.querySelectorAll(`[${attr}]`));
  return base + Math.max(0, siblings.indexOf(el)) * step;
};

type Play = () => void;

export const initReveals = (root: HTMLElement) => {
  const splits: SplitText[] = [];
  const triggers: ScrollTrigger[] = [];
  const queued: Play[] = [];
  let heroStarted = fired.has(HERO_REVEAL_START);

  const schedule = (el: HTMLElement, play: Play) => {
    if (el.hasAttribute('data-no-scroll')) {
      if (heroStarted) play();
      else queued.push(play);
      return;
    }
    triggers.push(
      ScrollTrigger.create({ trigger: el, start: TRIGGER_START, once: true, onEnter: play }),
    );
  };

  root.querySelectorAll<HTMLElement>('[data-line]').forEach((el) => {
    const split = SplitText.create(el, {
      type: 'lines',
      linesClass: 'line-child',
      mask: 'lines',
      aria: 'auto',
    });
    splits.push(split);
    gsap.set(split.lines, { yPercent: 100 });
    gsap.set(el, { opacity: 1 });
    const delay = delayOf(el, 'data-line');
    schedule(el, () =>
      gsap.to(split.lines, { yPercent: 0, duration: 1, ease: 'power4.inOut', stagger: 0.05, delay }),
    );
  });

  root.querySelectorAll<HTMLElement>('[data-letter]').forEach((el) => {
    const split = SplitText.create(el, { type: 'chars', charsClass: 'letter-child', mask: 'chars' });
    splits.push(split);
    gsap.set(split.chars, { yPercent: 100 });
    gsap.set(el, { opacity: 1 });
    const delay = delayOf(el, 'data-letter');
    schedule(el, () =>
      gsap.to(split.chars, { yPercent: 0, duration: 1.2, ease: 'power4.inOut', stagger: 0.03, delay }),
    );
  });

  root.querySelectorAll<HTMLElement>('[data-opacity]').forEach((el) => {
    gsap.set(el, { opacity: 0 });
    const delay = delayOf(el, 'data-opacity');
    schedule(el, () => gsap.to(el, { opacity: 1, duration: 1, ease: 'power3.out', delay, overwrite: true }));
  });

  root.querySelectorAll<HTMLElement>('[data-scale]').forEach((el) => {
    gsap.set(el, { scale: 0, transformOrigin: '50% 50%' });
    const delay = delayOf(el, 'data-scale');
    schedule(el, () => gsap.to(el, { scale: 1, duration: 1, ease: 'power3.out', delay }));
  });

  root.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => {
    gsap.set(el, { clipPath: clipFrom(el.dataset.clip ?? null) });
    const delay = delayOf(el, 'data-clip');
    schedule(el, () =>
      gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut', delay }),
    );
  });

  const onHeroStart = () => {
    heroStarted = true;
    queued.splice(0).forEach((play) => play());
  };
  window.addEventListener(HERO_REVEAL_START, onHeroStart);

  return () => {
    window.removeEventListener(HERO_REVEAL_START, onHeroStart);
    triggers.forEach((t) => t.kill());
    splits.forEach((s) => s.revert());
  };
};
