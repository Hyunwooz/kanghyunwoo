import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import type { Track } from '@/shared/types/creative';

export type CoverState = 'idle' | 'playing' | 'paused';

interface CoverProps {
  track: Track;
  className?: string;
  // playing/paused 면 LP 처럼 둥글어지고, playing 일 때만 돈다 (paused 는 멈춘 자리 그대로)
  state?: CoverState;
  // 큰 커버(헤더)면 true — 이미지 로딩 우선순위
  priority?: boolean;
}

// 커버. track.cover 이미지가 있으면 그걸, 없으면 hue 로 그라디언트 + 레코드 홈을 코드로 그린다.
const Cover = ({ track, className, state = 'idle', priority }: CoverProps) => {
  const h = track.hue;
  const vinyl = state !== 'idle';
  return (
    <div
      aria-hidden
      className={twMerge(
        'relative aspect-square overflow-hidden rounded-[6px] bg-cr-panel transition-[border-radius] duration-500',
        className,
        // 호출부의 rounded-* 보다 뒤에 두어 LP 상태에서는 항상 원이 되게 한다
        vinyl && 'cr-spin rounded-full',
        state === 'paused' && 'cr-spin-paused',
      )}
      style={
        track.cover
          ? undefined
          : { background: `linear-gradient(140deg, hsl(${h} 72% 58%) 0%, hsl(${h + 35} 70% 38%) 55%, hsl(${h + 70} 55% 16%) 100%)` }
      }
    >
      {track.cover ? (
        <Image src={track.cover} alt='' fill priority={priority} sizes='(min-width: 768px) 240px, 60vw' className='object-cover' />
      ) : (
        <>
          {/* 한쪽으로 치우친 하이라이트. 돌 때 회전이 보이는 건 이것 덕분 */}
          <div
            className='absolute inset-0'
            style={{ background: `radial-gradient(circle at 72% 28%, hsl(${h + 60} 95% 78% / 0.75), transparent 48%)` }}
          />
          <svg viewBox='0 0 100 100' className='absolute inset-0 h-full w-full text-white/[0.14]' fill='none'>
            {[18, 26, 34, 42].map((r) => (
              <circle key={r} cx='50' cy='50' r={r} stroke='currentColor' strokeWidth='0.8' />
            ))}
          </svg>
        </>
      )}
      {/* LP 상태일 때 가운데 라벨 + 구멍. 이미지 위에도 얹힌다 */}
      {vinyl && (
        <svg viewBox='0 0 100 100' className='absolute inset-0 h-full w-full' fill='none'>
          <circle cx='50' cy='50' r='14' fill='rgba(11,11,16,0.55)' />
          <circle cx='50' cy='50' r='13' stroke='rgba(255,255,255,0.25)' strokeWidth='0.6' />
          <circle cx='50' cy='50' r='2.2' fill='#0b0b10' />
        </svg>
      )}
    </div>
  );
};

export default Cover;
