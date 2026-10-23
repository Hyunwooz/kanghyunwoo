'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';
import { glitch } from '@/data/home';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#§±¤%&@$¿¡ÆØ0123456789';
const WINDOW = 9;
const FRAME_INTERVAL = 2;
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// 원본에서 여섯 덩어리가 놓인 자리 (rem, 섹션 기준)
const BLOCKS = [
  { left: 27.3, top: 25.5 },
  { left: 74.3, top: 30.4 },
  { left: 10.35, top: 36.7 },
  { left: 20, top: 49.9 },
  { left: 78.6, top: 50.8 },
  { left: 56, top: 9.5 },
];

interface CharRef {
  span: HTMLSpanElement;
  original: string;
}

const splitChars = (el: HTMLElement): CharRef[] => {
  const chars: CharRef[] = [];
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent ?? '') {
        const span = document.createElement('span');
        span.textContent = ch;
        span.style.display = 'inline-block';
        span.style.whiteSpace = 'pre';
        frag.appendChild(span);
        chars.push({ span, original: ch });
      }
      node.parentNode?.replaceChild(frag, node);
    } else {
      Array.from(node.childNodes).forEach(walk);
    }
  };
  Array.from(el.childNodes).forEach(walk);
  return chars;
};

/*
 * 원본 glitch 섹션
 *  - 배경 사진은 스크롤하면 30% 까지 어두워진다
 *  - 화면에 고정된 여섯 덩어리 문구가 스크롤 속도만큼 글자가 깨지고(glitch), 아래로 흩어지며 떨어진다
 *  - 떨어지는 진행도에 맞춰 가운데 문장이 타자 치듯 나타난다
 *  - 아래 사진 두 장은 서로 다른 속도로 올라온다
 */
const Glitch = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const blocks = Array.from(section.querySelectorAll<HTMLElement>('[data-glitch-block]'));
    const finalEl = section.querySelector<HTMLElement>('[data-final]');
    const originals = blocks.map((b) => b.innerHTML);
    const finalOriginal = finalEl?.innerHTML ?? '';
    const blockChars = blocks.map(splitChars);
    const finalChars = finalEl ? splitChars(finalEl) : [];
    let raf = 0;

    const ctx = gsap.context(() => {
      gsap.set(finalChars.map((c) => c.span), { opacity: 0 });

      // 스크롤 속도 → 글리치 세기
      let target = 0;
      let intensity = 0;
      let frame = 0;
      const heads = blockChars.map(() => 0);
      const restore = (chars: CharRef[]) => chars.forEach((c) => (c.span.textContent = c.original));
      const tick = () => {
        intensity += (target - intensity) * 0.14;
        target *= 0.9;
        frame += 1;
        if (frame % FRAME_INTERVAL === 0) {
          blockChars.forEach((chars, b) => {
            if (intensity <= 0.01) {
              restore(chars);
              return;
            }
            heads[b] = (heads[b] + 1 + intensity * 10) % chars.length;
            const head = Math.floor(heads[b]);
            chars.forEach((c, i) => {
              const behind = (head - i + chars.length) % chars.length;
              if (c.original.trim() && behind < WINDOW && Math.random() < intensity * Math.pow(1 - behind / WINDOW, 0.6)) {
                c.span.textContent = randomGlyph();
              } else {
                c.span.textContent = c.original;
              }
            });
          });
        }
        raf = requestAnimationFrame(tick);
      };
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          cancelAnimationFrame(raf);
          if (self.isActive) raf = requestAnimationFrame(tick);
          else blockChars.forEach(restore);
        },
        onUpdate: (self) => {
          target = Math.min(Math.abs(self.getVelocity()) / 3400, 0.45);
        },
      });

      // 글자가 흩어지며 떨어지는 타임라인 + 가운데 문장 타이핑
      let lastProgress = 0;
      const typeFinal = (progress: number) => {
        const t = progress * finalChars.length;
        const fast = Math.abs(progress - lastProgress) >= 0.0002;
        lastProgress = progress;
        finalChars.forEach((c, i) => {
          if (i < t - 4 || (!fast && i < t)) {
            c.span.textContent = c.original;
            c.span.style.opacity = '1';
          } else if (i < t) {
            c.span.textContent = c.original.trim() ? randomGlyph() : c.original;
            c.span.style.opacity = '1';
          } else {
            c.span.style.opacity = '0';
          }
        });
      };
      const fall = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: 'center 30%', scrub: 2 },
        onUpdate: () => typeFinal(fall.progress()),
      });
      blockChars.forEach((chars, b) => {
        const offset = b * 0.06;
        chars.forEach((c) => {
          fall.to(
            c.span,
            {
              y: gsap.utils.random(40, 160),
              x: gsap.utils.random(-10, 10),
              rotation: gsap.utils.random(-20, 20),
              opacity: 0,
              ease: 'power2.in',
              duration: gsap.utils.random(0.25, 0.7),
            },
            offset + gsap.utils.random(0, 0.6),
          );
        });
      });

      gsap.to('[data-glitch-bg]', {
        opacity: 0.3,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top top', end: 'center center', scrub: 2 },
      });

      const pics = Array.from(section.querySelectorAll<HTMLElement>('[data-glitch-pic]'));
      const distances = [-300, -800];
      const scrubs = [1.5, 3];
      pics.forEach((pic, i) => {
        gsap.fromTo(
          pic,
          { y: 100 },
          { y: distances[i] ?? -300, ease: 'none', scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: scrubs[i] ?? 2 } },
        );
        const img = pic.querySelector('img');
        gsap.fromTo(
          img,
          { yPercent: 0 },
          { yPercent: i === 0 ? -8 : 10, ease: 'none', scrollTrigger: { trigger: section, start: '20% top', end: 'bottom top', scrub: 3 } },
        );
      });
    }, section);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
      blocks.forEach((b, i) => (b.innerHTML = originals[i]));
      if (finalEl) finalEl.innerHTML = finalOriginal;
    };
  }, []);

  return (
    <section ref={root} className='relative h-[100rem] overflow-clip bg-black text-white max-lg:h-[160svh]'>
      <div className='absolute inset-0'>
        <img data-glitch-bg src={glitch.background} alt='' className='h-full w-full object-cover' />
      </div>

      <div className='absolute inset-0'>
        <div className='sticky top-0 h-[100svh] w-full'>
          {BLOCKS.map((pos, i) => (
            <div
              key={i}
              data-glitch-block
              className='absolute text-[1.125rem] leading-[1] tracking-[-0.01em] max-lg:text-sm'
              style={{ left: `${pos.left}%`, top: `${(pos.top / 62.5) * 100}%` }}
            >
              {glitch.phrase}
              <br />
              {glitch.phrase}
              <br />
              {glitch.phrase}
              <br />
              <span className='whitespace-pre'>{glitch.noise}</span>
            </div>
          ))}
          <p
            data-final
            className='absolute left-[45.84%] top-[30.5%] w-[12rem] break-keep text-[1.125rem] leading-[1] tracking-[-0.01em] max-lg:left-[30%] max-lg:w-40 max-lg:text-sm'
          >
            {glitch.finalText.map((line, i) => (
              <span key={i}>
                {line}
                {i < glitch.finalText.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className='absolute inset-x-0 bottom-0 z-10 flex items-end justify-center gap-[9rem] max-lg:gap-6'>
        <div data-glitch-pic className='h-[23.13rem] w-[28.25rem] overflow-hidden max-lg:h-40 max-lg:w-44'>
          <img src={glitch.images[0]} alt='' className='h-[110%] w-full object-cover' />
        </div>
        <div data-glitch-pic className='mb-[2.6rem] h-[18.94rem] w-[13.44rem] overflow-hidden max-lg:h-32 max-lg:w-24'>
          <img src={glitch.images[1]} alt='' className='h-[110%] w-full object-cover' />
        </div>
      </div>
    </section>
  );
};

export default Glitch;
