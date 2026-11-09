// 플레이어 아이콘. 외부 아이콘 세트 대신 작은 SVG 몇 개.
type P = { className?: string };

export const PlayIcon = ({ className }: P) => (
  <svg viewBox='0 0 24 24' className={className} fill='currentColor' aria-hidden>
    <path d='M8 5.5v13l11-6.5z' />
  </svg>
);

export const PauseIcon = ({ className }: P) => (
  <svg viewBox='0 0 24 24' className={className} fill='currentColor' aria-hidden>
    <path d='M7 5h3.5v14H7zM13.5 5H17v14h-3.5z' />
  </svg>
);

export const PrevIcon = ({ className }: P) => (
  <svg viewBox='0 0 24 24' className={className} fill='currentColor' aria-hidden>
    <path d='M6 5h2v14H6zM19 5.5v13L9.5 12z' />
  </svg>
);

export const NextIcon = ({ className }: P) => (
  <svg viewBox='0 0 24 24' className={className} fill='currentColor' aria-hidden>
    <path d='M16 5h2v14h-2zM5 5.5v13L14.5 12z' />
  </svg>
);

export const VolumeIcon = ({ className, muted }: P & { muted?: boolean }) => (
  <svg viewBox='0 0 24 24' className={className} fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <path d='M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z' fill='currentColor' stroke='none' />
    {muted ? <path d='M16 9.5l4 5M20 9.5l-4 5' /> : <path d='M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11' />}
  </svg>
);

export const CloseIcon = ({ className }: P) => (
  <svg viewBox='0 0 24 24' className={className} fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' aria-hidden>
    <path d='M6 6l12 12M18 6L6 18' />
  </svg>
);

export const ExternalIcon = ({ className }: P) => (
  <svg viewBox='0 0 24 24' className={className} fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden>
    <path d='M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4' />
  </svg>
);

// 재생 중인 줄에 붙는 이퀄라이저 막대 (keyframes 는 globals.css 의 wd-eq)
export const EqBars = ({ className, active = true }: P & { active?: boolean }) => (
  <span className={`cr-eq flex h-[12px] items-end gap-[2px] ${className ?? ''}`} aria-hidden>
    {[0.6, 1, 0.75, 0.9].map((h, i) => (
      <span
        key={i}
        className='block w-[2.5px] origin-bottom rounded-[1px] bg-current'
        style={{
          height: `${h * 100}%`,
          animation: active ? `wd-eq 0.8s ease-in-out ${i * 0.12}s infinite alternate` : 'none',
          transform: active ? undefined : 'scaleY(0.35)',
        }}
      />
    ))}
  </span>
);
