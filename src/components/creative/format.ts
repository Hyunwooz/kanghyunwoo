// 초 → "m:ss". 아직 모르면 "–:––"
export const fmtTime = (sec?: number) => {
  if (sec === undefined || !Number.isFinite(sec)) return '–:––';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

// 총 길이 → "12분 34초" (목록 헤더용). 하나라도 모르면 undefined
export const fmtTotal = (secs: (number | undefined)[]) => {
  if (secs.some((s) => s === undefined)) return undefined;
  const total = secs.reduce<number>((a, b) => a + (b ?? 0), 0);
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return m ? `${m}분 ${s}초` : `${s}초`;
};
