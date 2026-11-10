'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { collections } from '@/data/creative';
import Cover from './Cover';
import { fmtTime } from './format';
import { ChevronDownIcon, ChevronUpIcon, CloseIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, VolumeIcon } from './Icons';
import { placeholderUrl } from './placeholder';
import { useCurrentTrack, usePlayer } from './store';

// 음악을 끈 사람에게는 다시 자동으로 틀지 않는다 (예전 배경음악 토글과 같은 키)
const BGM_STORAGE_KEY = 'wd:bgm';

// 아직 아무 곡도 안 틀었을 때 플레이어가 보여주는 기본 곡(사이트 배경음악). 큐는 전체 곡.
const ALL_TRACKS = collections.flatMap((c) => c.tracks);
const DEFAULT_INDEX = Math.max(
  0,
  ALL_TRACKS.findIndex((t) => t.id.startsWith('3bd696fd')),
);

/*
 * 화면 아래 고정 플레이어. 루트 레이아웃에 있어서 모든 페이지에 떠 있고, 페이지를 옮겨도 이어서 난다.
 * 실제 <audio> 는 여기 하나뿐. 모양은 지금 있는 페이지의 디자인을 따른다:
 *  - /creative  : 다크 패널 + 보라
 *  - /portfolio : 종이색 카드 + 먹색 (조용한 테마)
 *  - 그 외(메인·아카이브) : 검정 글래스 + 흰색
 * 메인 페이지는 1rem = 1vw 라서 치수는 전부 px 로 둔다.
 */
type Theme = {
  shell: string;
  title: string;
  sub: string;
  icon: string;
  play: string;
  time: string;
  accent: string; // 슬라이더·진행선 색 (CSS 값)
  track: string; // 슬라이더 남은 구간 색 (CSS 값)
  mobileBar: string;
};

const THEMES: Record<'creative' | 'quiet' | 'dark', Theme> = {
  creative: {
    shell: 'rounded-[10px] border border-white/10 bg-cr-panel/95 text-white shadow-[0_-10px_40px_rgba(0,0,0,0.45)] backdrop-blur-md',
    title: 'text-white',
    sub: 'text-white/50',
    icon: 'text-white/60 hover:text-white',
    play: 'bg-white text-cr-bg',
    time: 'text-white/50',
    accent: '#8B7CFF',
    track: 'rgba(255,255,255,0.15)',
    mobileBar: 'bg-white/10',
  },
  quiet: {
    shell: 'rounded-[10px] border border-quiet-line bg-quiet-paper/95 text-quiet-ink shadow-[0_-8px_30px_rgba(23,23,26,0.08)] backdrop-blur-md',
    title: 'text-quiet-ink',
    sub: 'text-quiet-mute',
    icon: 'text-quiet-mute hover:text-quiet-ink',
    play: 'bg-quiet-ink text-quiet-paper',
    time: 'text-quiet-mute',
    accent: '#17171A',
    track: 'rgba(23,23,26,0.15)',
    mobileBar: 'bg-quiet-ink/15',
  },
  dark: {
    shell: 'rounded-[10px] border border-white/15 bg-black/80 text-white shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md',
    title: 'text-white',
    sub: 'text-white/50',
    icon: 'text-white/60 hover:text-white',
    play: 'bg-white text-black',
    time: 'text-white/50',
    accent: '#FFFFFF',
    track: 'rgba(255,255,255,0.2)',
    mobileBar: 'bg-white/15',
  },
};

const themeFor = (pathname: string | null) => {
  if (pathname?.startsWith('/creative')) return THEMES.creative;
  if (pathname?.startsWith('/portfolio')) return THEMES.quiet;
  return THEMES.dark;
};

const PlayerBar = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();
  const track = useCurrentTrack();
  const playing = usePlayer((s) => s.playing);
  const current = usePlayer((s) => s.current);
  const duration = usePlayer((s) => s.duration);
  const volume = usePlayer((s) => s.volume);
  const minimized = usePlayer((s) => s.minimized);
  const { play, toggle, next, prev, setPlaying, setTime, setVolume, setMinimized, close } = usePlayer.getState();
  const [muted, setMuted] = useState(false);
  // 실제 음원이 없어 임시 음원으로 틀고 있는지 (플레이어에 demo 표시)
  const [demo, setDemo] = useState(false);
  // 경로별 모양은 마운트 뒤에 정한다 (루트 레이아웃에서 서버 pathname 이 달라 hydration 이 어긋나므로)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const t = mounted ? themeFor(pathname) : THEMES.dark;

  // 플레이어는 모든 페이지에 떠 있다. 곡을 안 틀었으면 기본 곡을 보여주는 대기 상태.
  // 사이트 배경음악 역할도 이 플레이어가 맡는다: 첫 입력에 기본 곡을 튼다 (끈 사람은 제외).
  const home = mounted && pathname === '/';
  const onCreative = mounted && !!pathname?.startsWith('/creative');
  const shown = track ?? ALL_TRACKS[DEFAULT_INDEX];
  const visible = mounted;
  const startDefault = () => play(ALL_TRACKS, DEFAULT_INDEX);
  const onToggle = () => {
    if (!track) {
      startDefault();
      return;
    }
    toggle();
    try {
      localStorage.setItem(BGM_STORAGE_KEY, playing ? 'off' : 'on');
    } catch {}
  };
  // 닫으면 끈 것으로 기억한다. 안 그러면 다음 클릭에 기본 곡이 다시 자동으로 나온다
  const onClose = () => {
    close();
    try {
      localStorage.setItem(BGM_STORAGE_KEY, 'off');
    } catch {}
  };

  useEffect(() => {
    if (!mounted || track) return;
    let optedOut = false;
    try {
      optedOut = localStorage.getItem(BGM_STORAGE_KEY) === 'off';
    } catch {}
    if (optedOut) return;
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    const start = (e: Event) => {
      // 플레이어나 /creative 의 곡(버튼)을 직접 누르는 중이면 그 클릭에 맡긴다. 여기서 먼저 틀면 그 클릭이 토글이 돼 바로 멈춘다
      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest('[data-player]') || (onCreative && el?.closest('button'))) return;
      events.forEach((ev) => window.removeEventListener(ev, start));
      play(ALL_TRACKS, DEFAULT_INDEX);
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, [mounted, onCreative, track, play]);

  // 곡이 바뀌면 소스를 갈아 끼우고 처음부터
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    setDemo(false);
    audio.src = track.src;
    audio.currentTime = 0;
    audio.load();
  }, [track?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // 음원을 못 열면(아직 파일이 없음) 임시 음원으로 바꿔 끼운다. 임시 음원마저 실패하면 멈춘다.
  const onError = () => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.src.startsWith('blob:')) {
      setPlaying(false);
      return;
    }
    setDemo(true);
    audio.src = placeholderUrl();
    audio.load();
    if (usePlayer.getState().playing) audio.play().catch(() => setPlaying(false));
  };

  // 재생/정지 반영
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (playing) {
      // 소스를 못 열면(NotSupported) error 핸들러가 임시 음원으로 바꿔 끼운 뒤 다시 튼다.
      // 그 과정에서 load() 가 끼어들어 생기는 AbortError 도 실패가 아니다.
      audio.play().catch((e: unknown) => {
        const name = e instanceof DOMException ? e.name : '';
        if (name === 'NotSupportedError' || name === 'AbortError' || audio.error) return;
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [playing, track?.id, setPlaying]);

  // 플레이어를 닫으면 소리도 끈다
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || track) return;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  // 잠금화면/미디어 키
  useEffect(() => {
    if (!track || !('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: 'WoohDev',
      album: `AI Music · ${track.tool}`,
      artwork: track.cover ? [{ src: track.cover, sizes: '1024x1024', type: 'image/jpeg' }] : [],
    });
    navigator.mediaSession.setActionHandler('play', () => setPlaying(true));
    navigator.mediaSession.setActionHandler('pause', () => setPlaying(false));
    navigator.mediaSession.setActionHandler('previoustrack', prev);
    navigator.mediaSession.setActionHandler('nexttrack', next);
  }, [track, setPlaying, prev, next]);

  // 스페이스로 재생/정지 (입력 중이 아닐 때, 곡이 있을 때만)
  useEffect(() => {
    if (!track) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      // 글자를 입력 중일 때만 양보한다. 버튼에 포커스가 있어도 스페이스는 재생/정지 (버튼 기본 동작은 막는다)
      if (tag === 'INPUT' || tag === 'TEXTAREA' || el?.isContentEditable) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle, track]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const sec = Number(e.target.value);
    audio.currentTime = sec;
    setTime(sec, audio.duration || duration);
  };

  // 마지막 곡이 끝나면 멈추고, 아니면 다음 곡으로
  const onEnded = () => {
    const { queue, index } = usePlayer.getState();
    if (index >= queue.length - 1) setPlaying(false);
    else next();
  };

  const progress = duration ? (current / duration) * 100 : 0;
  const rangeVars = { ['--range-accent' as string]: t.accent, ['--range-track' as string]: t.track };

  return (
    <>
      <audio
        ref={audioRef}
        preload='metadata'
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime, e.currentTarget.duration || 0)}
        onLoadedMetadata={(e) => setTime(e.currentTarget.currentTime, e.currentTarget.duration || 0)}
        onEnded={onEnded}
        onError={onError}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* 접힌 상태: 작은 알약. 커버(LP) + 제목 + 재생/정지 + 펼치기. 메인은 좌우 하단에 링크가 있어 가운데에 둔다 */}
      <div
        data-player
        aria-hidden={!visible || !minimized}
        className={`fixed bottom-[8px] z-[1000] text-[14px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:bottom-[12px] ${
          home ? 'left-1/2 -translate-x-1/2' : 'right-[8px] md:right-[12px]'
        } ${visible && minimized ? 'translate-y-0' : 'translate-y-[160%]'}`}
      >
        <div className={twMerge('flex items-center gap-[10px] py-[6px] pl-[6px] pr-[8px]', t.shell, 'rounded-full')}>
          <Cover track={shown} state={track ? (playing ? 'playing' : 'paused') : 'idle'} className='w-[36px] shrink-0 rounded-full' />
          <button
            type='button'
            onClick={() => setMinimized(false)}
            aria-label='플레이어 펼치기'
            className={`hidden max-w-[160px] truncate text-left text-[13px] font-semibold leading-[1.3] sm:block ${t.title}`}
          >
            {shown.title}
          </button>
          <button
            type='button'
            onClick={onToggle}
            aria-label={playing ? '일시정지' : '재생'}
            className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 ${t.play}`}
          >
            {playing ? <PauseIcon className='h-[16px] w-[16px]' /> : <PlayIcon className='h-[16px] w-[16px] translate-x-[1px]' />}
          </button>
          <button type='button' onClick={() => setMinimized(false)} aria-label='플레이어 펼치기' className={`shrink-0 transition-colors ${t.icon}`}>
            <ChevronUpIcon className='h-[18px] w-[18px]' />
          </button>
        </div>
      </div>

      {/* 펼친 상태: 전체 바 */}
      <div
        data-player
        aria-hidden={!visible || minimized}
        className={`fixed inset-x-0 bottom-0 z-[1000] px-[8px] pb-[8px] text-[14px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-[12px] md:pb-[12px] ${
          visible && !minimized ? 'translate-y-0' : 'translate-y-[120%]'
        }`}
      >
        <div
          className={twMerge(
            'mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-[12px] px-[12px] py-[10px] md:grid-cols-[minmax(0,1fr)_minmax(320px,2fr)_minmax(0,1fr)] md:px-[16px] md:py-[12px]',
            t.shell,
          )}
        >
          {/* 곡 정보 */}
          <div className='flex min-w-0 items-center gap-[12px]'>
            <Cover track={shown} state={track ? (playing ? 'playing' : 'paused') : 'idle'} className='w-[48px] shrink-0 rounded-[4px]' />
            <div className='min-w-0'>
              <p className={`flex items-center gap-[6px] text-[14px] font-semibold leading-[1.3] ${t.title}`}>
                <span className='truncate'>{shown.title}</span>
                {demo && (
                  <span
                    className='shrink-0 rounded-[3px] border border-current px-[4px] py-[1px] font-mono text-[9px] uppercase tracking-[0.14em] opacity-60'
                    title='실제 음원이 아직 없어 임시 음원으로 재생 중'
                  >
                    demo
                  </span>
                )}
              </p>
              <p className={`truncate text-[12px] leading-[1.3] ${t.sub}`}>WoohDev · {shown.tool}</p>
            </div>
          </div>

          {/* 컨트롤 + 진행 */}
          <div className='flex items-center gap-[12px] md:flex-col md:gap-[6px]'>
            <div className='flex items-center gap-[8px] md:gap-[16px]'>
              <button type='button' onClick={prev} aria-label='이전 곡' className={`hidden transition-colors md:block ${t.icon}`}>
                <PrevIcon className='h-[20px] w-[20px]' />
              </button>
              <button
                type='button'
                onClick={onToggle}
                aria-label={playing ? '일시정지' : '재생'}
                className={`flex h-[36px] w-[36px] items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95 ${t.play}`}
              >
                {playing ? <PauseIcon className='h-[20px] w-[20px]' /> : <PlayIcon className='h-[20px] w-[20px] translate-x-[1px]' />}
              </button>
              <button type='button' onClick={next} aria-label='다음 곡' className={`hidden transition-colors md:block ${t.icon}`}>
                <NextIcon className='h-[20px] w-[20px]' />
              </button>
            </div>
            <div className={`hidden w-full items-center gap-[8px] font-mono text-[11px] tabular-nums md:flex ${t.time}`}>
              <span className='w-[40px] text-right'>{fmtTime(current)}</span>
              <input
                type='range'
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(current, duration || 0)}
                onChange={seek}
                aria-label='재생 위치'
                className='cr-range h-[4px] flex-1'
                style={{ ...rangeVars, ['--p' as string]: `${progress}%` }}
              />
              <span className='w-[40px]'>{fmtTime(duration)}</span>
            </div>
          </div>

          {/* 모바일: 접기 */}
          <button type='button' onClick={() => setMinimized(true)} aria-label='플레이어 접기' className={`transition-colors md:hidden ${t.icon}`}>
            <ChevronDownIcon className='h-[20px] w-[20px]' />
          </button>

          {/* 볼륨 + 접기 + 닫기 */}
          <div className='hidden items-center justify-end gap-[12px] md:flex'>
            <button type='button' onClick={() => setMuted((m) => !m)} aria-label={muted ? '소리 켜기' : '소리 끄기'} className={`transition-colors ${t.icon}`}>
              <VolumeIcon className='h-[20px] w-[20px]' muted={muted || volume === 0} />
            </button>
            <input
              type='range'
              min={0}
              max={1}
              step={0.02}
              value={muted ? 0 : volume}
              onChange={(e) => {
                setMuted(false);
                setVolume(Number(e.target.value));
              }}
              aria-label='볼륨'
              className='cr-range h-[4px] w-[96px]'
              style={{ ...rangeVars, ['--p' as string]: `${(muted ? 0 : volume) * 100}%` }}
            />
            <button type='button' onClick={() => setMinimized(true)} aria-label='플레이어 접기' className={`ml-[8px] transition-colors ${t.icon}`}>
              <ChevronDownIcon className='h-[20px] w-[20px]' />
            </button>
            <button type='button' onClick={onClose} aria-label='플레이어 닫기' className={`transition-colors ${t.icon}`}>
              <CloseIcon className='h-[20px] w-[20px]' />
            </button>
          </div>
        </div>

        {/* 모바일: 카드 아래 얇은 진행선 */}
        <div className={`mx-[12px] h-[2px] md:hidden ${t.mobileBar}`}>
          <div className='h-full' style={{ width: `${progress}%`, background: t.accent }} />
        </div>
      </div>
    </>
  );
};

export default PlayerBar;
