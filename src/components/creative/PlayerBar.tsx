'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Cover from './Cover';
import { fmtTime } from './format';
import { CloseIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, VolumeIcon } from './Icons';
import { useCurrentTrack, usePlayer } from './store';

// 페이지 전체 배경음악(Bgm)에게 "내가 튼다" 고 알리는 이벤트. Bgm 은 이걸 받으면 멈춘다.
export const CREATIVE_PLAY_EVENT = 'wd:creative-play';

/*
 * 화면 아래 고정 플레이어. 루트 레이아웃에 있어서 페이지를 옮겨도 이어서 난다.
 * 실제 <audio> 는 여기 하나뿐. 모양은 지금 있는 페이지의 디자인을 따른다:
 *  - /creative  : 다크 패널 + 보라
 *  - /portfolio : 크림 카드 + 남색 외곽선 + 핑크 (레트로)
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

const THEMES: Record<'creative' | 'retro' | 'dark', Theme> = {
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
  retro: {
    shell: 'border-[3px] border-retro-ink bg-retro-cream text-retro-ink shadow-[6px_6px_0_#1A1838]',
    title: 'text-retro-ink',
    sub: 'text-retro-ink/60',
    icon: 'text-retro-ink/60 hover:text-retro-ink',
    play: 'bg-retro-ink text-retro-cream',
    time: 'text-retro-ink/60',
    accent: '#F2588C',
    track: 'rgba(26,24,56,0.18)',
    mobileBar: 'bg-retro-ink/15',
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
  if (pathname?.startsWith('/portfolio')) return THEMES.retro;
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
  const { toggle, next, prev, setPlaying, setTime, setVolume, close } = usePlayer.getState();
  const [muted, setMuted] = useState(false);
  // 경로별 모양은 마운트 뒤에 정한다 (루트 레이아웃에서 서버 pathname 이 달라 hydration 이 어긋나므로)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const t = mounted ? themeFor(pathname) : THEMES.dark;

  // 곡이 바뀌면 소스를 갈아 끼우고 처음부터
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio.src = track.src;
    audio.currentTime = 0;
    audio.load();
  }, [track?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // 재생/정지 반영
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (playing) {
      window.dispatchEvent(new Event(CREATIVE_PLAY_EVENT));
      audio.play().catch(() => setPlaying(false));
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
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A') return;
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
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div
        aria-hidden={!track}
        className={`fixed inset-x-0 bottom-0 z-[1000] px-[8px] pb-[8px] text-[14px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-[12px] md:pb-[12px] ${track ? 'translate-y-0' : 'translate-y-[120%]'}`}
      >
        <div
          className={twMerge(
            'mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-[12px] px-[12px] py-[10px] md:grid-cols-[minmax(0,1fr)_minmax(320px,2fr)_minmax(0,1fr)] md:px-[16px] md:py-[12px]',
            t.shell,
          )}
        >
          {/* 곡 정보 */}
          <div className='flex min-w-0 items-center gap-[12px]'>
            {track && <Cover track={track} state={playing ? 'playing' : 'paused'} className='w-[48px] shrink-0 rounded-[4px]' />}
            <div className='min-w-0'>
              <p className={`truncate text-[14px] font-semibold leading-[1.3] ${t.title}`}>{track?.title ?? ''}</p>
              <p className={`truncate text-[12px] leading-[1.3] ${t.sub}`}>{track ? `WoohDev · ${track.tool}` : ''}</p>
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
                onClick={toggle}
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

          {/* 볼륨 + 닫기 */}
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
            <button type='button' onClick={close} aria-label='플레이어 닫기' className={`ml-[8px] transition-colors ${t.icon}`}>
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
