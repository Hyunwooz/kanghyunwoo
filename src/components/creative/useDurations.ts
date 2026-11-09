import { useEffect } from 'react';
import type { Track } from '@/shared/types/creative';
import { usePlayer } from './store';

// 목록에 길이를 보여주려고 각 곡의 metadata 만 미리 읽는다. 음원 본문은 받지 않는다.
export const useDurations = (tracks: Track[]) => {
  const durations = usePlayer((s) => s.durations);
  const setDuration = usePlayer((s) => s.setDuration);

  useEffect(() => {
    const pending = tracks.filter((t) => durations[t.id] === undefined);
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
    // durations 가 바뀔 때마다 다시 돌 필요는 없다 (pending 만 처리)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks, setDuration]);

  return durations;
};
