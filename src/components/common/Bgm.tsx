'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { placeholderUrl } from '@/components/creative/placeholder';
import { usePlayer } from '@/components/creative/store';

// 사이트 전체 배경음악. 루트 레이아웃에 두어 페이지를 옮겨도 끊기지 않는다.
// 브라우저는 사용자 입력 없이 소리를 못 틀므로, 첫 클릭/스크롤/키 입력 때 켠다.
// 한 번 끈 사람에게는 다시 자동으로 틀지 않는다 (localStorage).
// "같은 곳을 보고". /creative 의 같은 곡 파일을 그대로 쓴다 (public/audio/README.md 참고)
const SRC = '/audio/creative/3bd696fd-bf6a-4910-aa9b-99f0aa058645.mp3';
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
      // rAF 타임스탬프는 프레임 시작 시각이라 start 보다 앞설 수 있다. 음수가 되면 이징이 1을 넘어 볼륨이 범위를 벗어난다.
      const t = Math.min(Math.max((now - start) / FADE_MS, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      audio.volume = Math.min(Math.max(from + (to - from) * eased, 0), 1);
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
      try {
        await audio.play();
      } catch (e) {
        // 음원 파일이 아직 없으면 임시 음원으로. 자동재생 차단 등 다른 이유면 그대로 실패
        if (!audio.error) throw e;
        audio.src = placeholderUrl();
        audio.load();
        await audio.play();
      }
      // 기다리는 사이 /creative 플레이어가 곡을 틀었으면 배경음악은 비켜준다
      if (usePlayer.getState().index >= 0) {
        audio.pause();
        return true;
      }
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

  // 메인(/)과 /creative 에서는 곡 플레이어가 배경음악 역할까지 맡으므로 여기선 자동재생도 토글도 하지 않는다.
  // (토글 버튼이 숨는 페이지에서 여기서 틀면 끌 방법 없이 소리만 난다)
  const onHome = pathname === '/' || !!pathname?.startsWith('/creative');

  // 첫 사용자 입력에 자동 재생 (꺼둔 적이 없을 때만)
  useEffect(() => {
    setReady(true);
    if (onHome) return;
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
  }, [play, onHome]);

  // /creative 플레이어가 곡을 틀면 배경음악은 비켜준다 (끈 걸로 기억하진 않는다)
  useEffect(() => {
    const onCreativePlay = () => {
      if (audioRef.current && !audioRef.current.paused) stop();
    };
    window.addEventListener('wd:creative-play', onCreativePlay);
    return () => window.removeEventListener('wd:creative-play', onCreativePlay);
  }, [stop]);

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

  // 경로에 따른 모양은 마운트 뒤(ready)에만 정한다. 루트 레이아웃에서는 서버의 pathname 이
  // 클라이언트와 달라 hydration 이 어긋나기 때문. 마운트 전엔 어차피 opacity-0 이라 보이지 않는다.
  // 포트폴리오(레트로)에서는 크림 바탕에 남색, 그 외(검정 바탕)에서는 흰색
  const onRetro = ready && pathname?.startsWith('/portfolio');
  // 메인·/creative 에서는, 그리고 곡 플레이어가 떠 있는 동안에는 토글 버튼을 숨긴다 (플레이어가 그 역할을 한다)
  const playerOpen = usePlayer((s) => s.index >= 0);
  const onCreative = ready && (onHome || playerOpen);

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
          onCreative && 'hidden',
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
