'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

// 사이트 전체 배경음악. 루트 레이아웃에 두어 페이지를 옮겨도 끊기지 않는다.
// 브라우저는 사용자 입력 없이 소리를 못 틀므로, 첫 클릭/스크롤/키 입력 때 켠다.
// 한 번 끈 사람에게는 다시 자동으로 틀지 않는다 (localStorage).
const SRC = '/audio/bgm.mp3';
const TITLE = '같은 곳을 보고';
const VOLUME = 0.35;
const FADE_MS = 1800;
const STORAGE_KEY = 'wd:bgm';

const BARS = [0.55, 1, 0.7, 0.85];

const Bgm = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  // 볼륨을 서서히 올리거나 내린다. 내릴 땐 끝에서 일시정지.
  const fade = useCallback((to: number, then?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / FADE_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      audio.volume = from + (to - from) * eased;
      if (t < 1) fadeRef.current = requestAnimationFrame(tick);
      else then?.();
    };
    fadeRef.current = requestAnimationFrame(tick);
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.volume = 0;
      await audio.play();
      fade(VOLUME);
      setPlaying(true);
      return true;
    } catch {
      return false;
    }
  }, [fade]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(false);
    fade(0, () => audio.pause());
  }, [fade]);

  // 첫 사용자 입력에 자동 재생 (꺼둔 적이 없을 때만)
  useEffect(() => {
    setReady(true);
    let optedOut = false;
    try {
      optedOut = localStorage.getItem(STORAGE_KEY) === 'off';
    } catch {}
    if (optedOut) return;

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    const off = () => events.forEach((e) => window.removeEventListener(e, start));
    const start = async () => {
      if (await play()) off();
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    return off;
  }, [play]);

  // 탭을 떠나면 멈추고, 돌아오면 이어서
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !playing) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [playing]);

  const toggle = () => {
    if (playing) {
      stop();
      try {
        localStorage.setItem(STORAGE_KEY, 'off');
      } catch {}
    } else {
      play();
      try {
        localStorage.setItem(STORAGE_KEY, 'on');
      } catch {}
    }
  };

  // 포트폴리오(레트로)에서는 크림 바탕에 남색, 그 외(검정 바탕)에서는 흰색
  const onRetro = pathname?.startsWith('/portfolio');

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload='metadata' aria-hidden />
      <button
        type='button'
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? '배경음악 끄기' : '배경음악 켜기'}
        title={`${TITLE} — AI로 만든 곡`}
        className={twMerge(
          'fixed bottom-4 left-4 z-[1002] flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-md transition-opacity duration-700 md:bottom-5 md:left-5',
          onRetro
            ? 'border-2 border-retro-ink bg-retro-cream text-retro-ink shadow-[3px_3px_0_#1A1838] hover:bg-retro-yellow'
            : 'border-white/25 bg-black/30 text-white hover:border-white/60',
          ready ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className='flex h-[10px] items-end gap-[2px]' aria-hidden>
          {BARS.map((h, i) => (
            <span
              key={i}
              className='block w-[2px] origin-bottom rounded-sm bg-current'
              style={{
                height: `${h * 100}%`,
                animation: playing ? `wd-eq 0.9s ease-in-out ${i * 0.13}s infinite alternate` : 'none',
                transform: playing ? undefined : 'scaleY(0.3)',
                transition: 'transform 0.4s ease',
              }}
            />
          ))}
        </span>
        <span>{playing ? 'sound on' : 'sound off'}</span>
      </button>
    </>
  );
};

export default Bgm;
