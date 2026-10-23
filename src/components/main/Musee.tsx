'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { musee } from '@/data/home';
import { gsap } from '@/lib/gsap';
import Media from './ui/Media';

// 원본 상수
const VIDEO_FROM = 1.4;
const VIDEO_TO = 0.35;
const BG_FROM = 1.8;
const AUDIO_FADE = 1.6;
const AUDIO_DELAY = 1.4;

/*
 * 화면을 꽉 채운 영상(1.4배)이 고정된 채 0.35배로 줄어들며
 * 전시장 사진(1.8배 → 1배) 한가운데 액자 속 스크린이 된다.
 * 아래에는 바닥에 비친 반사가 붙는다.
 */
const Musee = () => {
  const root = useRef<HTMLDivElement>(null);
  const hasVideo = Boolean(musee.media.video);
  const [soundOn, setSoundOn] = useState(false);
  const soundRef = useRef(false);

  useEffect(() => {
    const pin = root.current;
    if (!pin) return;
    const frame = pin.querySelector<HTMLElement>('[data-musee-frame]');
    const bg = pin.querySelector<HTMLElement>('[data-musee-bg]');
    const soundBtn = pin.querySelector<HTMLElement>('[data-sound]');
    const video = pin.querySelector<HTMLVideoElement>('video[data-main]');
    const reflection = pin.querySelector<HTMLVideoElement>('video[data-reflection]');
    let syncRaf = 0;

    const play = () => {
      video?.play().catch(() => undefined);
      reflection?.play().catch(() => undefined);
      if (soundBtn) gsap.to(soundBtn, { opacity: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' });
      if (video && soundRef.current) gsap.to(video, { volume: 1, duration: AUDIO_FADE, ease: 'power1.out' });
      const sync = () => {
        if (video && reflection && Math.abs(reflection.currentTime - video.currentTime) > 0.08) {
          reflection.currentTime = video.currentTime;
        }
        syncRaf = requestAnimationFrame(sync);
      };
      cancelAnimationFrame(syncRaf);
      syncRaf = requestAnimationFrame(sync);
    };
    const leave = () => {
      if (video && soundRef.current) {
        gsap.to(video, { volume: 0, duration: AUDIO_FADE, delay: AUDIO_DELAY, ease: 'power1.out' });
      }
    };

    const mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      gsap.fromTo(
        frame,
        { scale: VIDEO_FROM },
        {
          scale: VIDEO_TO,
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: play,
            onEnterBack: play,
            onLeave: leave,
            onLeaveBack: leave,
          },
        },
      );
      gsap.fromTo(
        bg,
        { scale: BG_FROM },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: 'bottom top', scrub: 1 } },
      );
    });
    mm.add('(max-width: 991px)', () => {
      gsap.set(frame, { scale: 0.8 });
    });

    return () => {
      cancelAnimationFrame(syncRaf);
      mm.revert();
    };
  }, []);

  const toggleSound = () => {
    const video = root.current?.querySelector<HTMLVideoElement>('video[data-main]');
    const tick = root.current?.querySelector<HTMLElement>('[data-tick]');
    const track = root.current?.querySelector<HTMLElement>('[data-track]');
    const next = !soundOn;
    setSoundOn(next);
    soundRef.current = next;
    if (tick && track) {
      const t = track.getBoundingClientRect();
      const k = tick.getBoundingClientRect();
      const distance = Math.max(0, t.right - k.right - (k.left - t.left));
      gsap.to(tick, { x: next ? distance : 0, duration: 0.3, ease: 'power2.out' });
    }
    if (!video) return;
    if (next) {
      video.muted = false;
      video.volume = 0;
      video.play().catch(() => undefined);
      gsap.to(video, { volume: 1, duration: 0.35, ease: 'power1.out' });
    } else {
      gsap.to(video, {
        volume: 0,
        duration: 0.35,
        ease: 'power1.out',
        onComplete: () => {
          video.muted = true;
          video.volume = 1;
        },
      });
    }
  };

  return (
    <section id='person-video' className='relative bg-black'>
      <div ref={root} className='relative flex h-[100svh] items-center justify-center overflow-hidden max-lg:h-[70svh]'>
        <img
          data-musee-bg
          src={musee.room}
          alt=''
          className='absolute inset-0 h-full w-full object-cover object-[50%_44%]'
          draggable={false}
        />
        <div data-musee-frame className='relative z-[1] aspect-video w-full'>
          <div className='absolute inset-0 overflow-hidden bg-black shadow-[0_0_0_0.6rem_#1b1b1b,0_0_0_0.75rem_#2a2a2a]'>
            <Media
              image={musee.media.image}
              video={musee.media.video}
              className='h-full w-full object-cover'
              data-main=''
            />
          </div>
          {/* 바닥 반사 */}
          <div className='pointer-events-none absolute inset-x-0 top-[calc(100%+0.75rem)] h-full overflow-hidden opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]'>
            <div className='h-full w-full -scale-y-100 blur-[2px]'>
              <Media
                image={musee.media.image}
                video={musee.media.video}
                className='h-full w-full object-cover'
                data-reflection=''
              />
            </div>
          </div>
        </div>
        {hasVideo && (
          <button
            type='button'
            data-sound
            onClick={toggleSound}
            className='pointer-events-none absolute left-1/2 top-[1rem] z-10 flex -translate-x-1/2 items-center gap-[0.625rem] rounded-full bg-black py-[0.25rem] pl-[0.875rem] pr-[0.5rem] text-[0.75rem] font-bold uppercase text-white opacity-0'
          >
            Sound
            <span data-track className='relative flex h-[0.7rem] w-[1.4rem] items-center rounded-full border border-white px-[0.1rem]'>
              <span data-tick className='block h-[0.45rem] w-[0.45rem] rounded-full bg-white' />
            </span>
          </button>
        )}
      </div>
    </section>
  );
};

export default Musee;
