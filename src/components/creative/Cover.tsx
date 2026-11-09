import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import type { Track } from '@/shared/types/creative';

export type CoverState = 'idle' | 'playing' | 'paused';

interface CoverProps {
  track: Track;
  className?: string;
  // playing/paused 면 LP 가 재킷에서 반쯤 빠져나온 모양이 되고, playing 일 때만 돈다 (paused 는 멈춘 자리 그대로)
  state?: CoverState;
  // 큰 커버(헤더)면 true — 이미지 로딩 우선순위
  priority?: boolean;
}

// 커버 아트 한 장. track.cover 이미지가 있으면 그걸, 없으면 hue 로 그라디언트 + 레코드 홈을 코드로 그린다.
const Art = ({ track, priority, vinyl }: { track: Track; priority?: boolean; vinyl: boolean }) => {
  const h = track.hue;
  if (track.cover) {
    return <Image src={track.cover} alt='' fill priority={priority} sizes='(min-width: 768px) 240px, 60vw' className='object-cover' />;
  }
  return (
    <div
      className='absolute inset-0'
      style={{ background: `linear-gradient(140deg, hsl(${h} 72% 58%) 0%, hsl(${h + 35} 70% 38%) 55%, hsl(${h + 70} 55% 16%) 100%)` }}
    >
      {/* 한쪽으로 치우친 하이라이트. 돌 때 회전이 보이는 건 이것 덕분 */}
      <div
        className='absolute inset-0'
        style={{ background: `radial-gradient(circle at 72% 28%, hsl(${h + 60} 95% 78% / 0.75), transparent 48%)` }}
      />
      {vinyl && (
        <svg viewBox='0 0 100 100' className='absolute inset-0 h-full w-full text-white/[0.14]' fill='none'>
          {[18, 26, 34, 42].map((r) => (
            <circle key={r} cx='50' cy='50' r={r} stroke='currentColor' strokeWidth='0.8' />
          ))}
        </svg>
      )}
    </div>
  );
};

/*
 * 커버.
 *  - idle   : 정사각 커버 아트
 *  - vinyl  : 같은 자리에서 디스크가 둥글게 돌고, 오른쪽 절반은 커버 아트 그대로인 재킷(슬리브)이 덮는다.
 *             디스크가 재킷에서 반쯤 빠져나온 모양. 재킷 왼쪽 가장자리에 그림자를 둬 앞뒤가 읽히게.
 */
const Cover = ({ track, className, state = 'idle', priority }: CoverProps) => {
  const vinyl = state !== 'idle';
  return (
    <div aria-hidden className={twMerge('relative aspect-square overflow-hidden rounded-[6px] bg-cr-panel', className)}>
      {/* 디스크 */}
      <div
        className={twMerge(
          'absolute inset-0 overflow-hidden transition-[border-radius] duration-500',
          vinyl && 'cr-spin rounded-full',
          state === 'paused' && 'cr-spin-paused',
        )}
      >
        <Art track={track} priority={priority} vinyl={vinyl} />
        {vinyl && (
          <svg viewBox='0 0 100 100' className='absolute inset-0 h-full w-full' fill='none'>
            {/* 가장자리 홈 + 라벨 + 구멍 */}
            <circle cx='50' cy='50' r='47' stroke='rgba(0,0,0,0.35)' strokeWidth='1.2' />
            <circle cx='50' cy='50' r='14' fill='rgba(11,11,16,0.55)' />
            <circle cx='50' cy='50' r='13' stroke='rgba(255,255,255,0.25)' strokeWidth='0.6' />
            <circle cx='50' cy='50' r='2.2' fill='#0b0b10' />
          </svg>
        )}
      </div>

      {/* 재킷: 오른쪽 절반. 커버 아트의 오른쪽 반이 보이도록 정사각 아트를 오른쪽에 맞춰 둔다 */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 overflow-hidden shadow-[-6px_0_14px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          vinyl ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='absolute inset-y-0 right-0 aspect-square h-full'>
          <Art track={track} vinyl={false} />
        </div>
        {/* 재킷 접힌 가장자리 */}
        <div className='absolute inset-y-0 left-0 w-[2px] bg-white/20' />
      </div>
    </div>
  );
};

export default Cover;
