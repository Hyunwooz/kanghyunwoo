import { create } from 'zustand';
import type { Track } from '@/shared/types/creative';

// 플레이어 상태. <audio> 자체는 PlayerBar 가 들고 있고, 여기엔 "무엇을 어디까지" 만 둔다.
interface PlayerState {
  queue: Track[];
  index: number;
  playing: boolean;
  current: number;
  duration: number;
  volume: number;
  // 목록에서 보여줄 곡 길이 (metadata 로드 후 채워진다)
  durations: Record<string, number>;
  // 플레이어를 작은 알약으로 접었는지 (페이지를 옮겨도 유지). 처음엔 접힌 채로 시작
  minimized: boolean;

  play: (queue: Track[], index: number) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setPlaying: (playing: boolean) => void;
  setTime: (current: number, duration: number) => void;
  setVolume: (volume: number) => void;
  setDuration: (id: string, duration: number) => void;
  setMinimized: (minimized: boolean) => void;
  close: () => void;
}

export const usePlayer = create<PlayerState>()((set, get) => ({
  queue: [],
  index: -1,
  playing: false,
  current: 0,
  duration: 0,
  volume: 0.8,
  durations: {},
  minimized: true,

  play: (queue, index) => set({ queue, index, playing: true, current: 0 }),
  toggle: () => {
    const { index, playing } = get();
    if (index < 0) return;
    set({ playing: !playing });
  },
  next: () => {
    const { queue, index } = get();
    if (!queue.length) return;
    set({ index: (index + 1) % queue.length, playing: true, current: 0 });
  },
  prev: () => {
    const { queue, index, current } = get();
    if (!queue.length) return;
    // 3초 넘게 들었으면 처음으로, 아니면 이전 곡으로 (일반적인 플레이어 동작)
    if (current > 3) set({ current: 0, playing: true });
    else set({ index: (index - 1 + queue.length) % queue.length, playing: true, current: 0 });
  },
  setPlaying: (playing) => set({ playing }),
  setTime: (current, duration) => set({ current, duration }),
  setVolume: (volume) => set({ volume }),
  setDuration: (id, duration) => set((s) => ({ durations: { ...s.durations, [id]: duration } })),
  setMinimized: (minimized) => set({ minimized }),
  close: () => set({ queue: [], index: -1, playing: false, current: 0, duration: 0, minimized: true }),
}));

export const useCurrentTrack = () => usePlayer((s) => (s.index >= 0 ? s.queue[s.index] : undefined));
