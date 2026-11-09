import { useEffect } from 'react';
import type { Track } from '@/shared/types/creative';
import { usePlayer } from './store';

// 목록에 길이를 보여준다. 데이터에 duration 이 있으면 그걸 쓰고,
// 없는 곡만 metadata 를 미리 읽는다 (음원 본문은 받지 않는다).
export const useDurations = (tracks: Track[]) => {
  const loaded = usePlayer((s) => s.durations);
  const setDuration = usePlayer((s) => s.setDuration);

  useEffect(() => {
    const pending = tracks.filter((t) => t.duration === undefined && loaded[t.id] === undefined);
    if (!pending.length) return;
    const audios = pending.map((t) => {
      const a = new Audio();
      a.preload = 'metadata';
      a.onloadedmetadata = () => setDuration(t.id, a.duration);
      a.src = t.src;
      return a;
    });
    return () => {
      audios.forEach((a) => {
        a.onloadedmetadata = null;
        a.removeAttribute('src');
        a.load();
      });
    };
    // loaded 가 바뀔 때마다 다시 돌 필요는 없다 (pending 만 처리)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks, setDuration]);

  const durations: Record<string, number> = { ...loaded };
  for (const t of tracks) if (t.duration !== undefined) durations[t.id] = t.duration;
  return durations;
};
