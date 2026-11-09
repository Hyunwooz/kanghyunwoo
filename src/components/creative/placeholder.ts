// 음원 파일이 아직 없을 때 대신 트는 임시 음원.
// 60초짜리 WAV 를 브라우저에서 즉석 합성해 blob URL 로 넘긴다. 파일을 저장소에 둘 필요가 없다.
// Am – F – C – G 코드 패드 위에 8분음표 아르페지오. 플레이어 동작(진행·탐색·LP 회전) 확인용.

const SR = 22050;
const SEC = 60;
const BAR = 2; // 초
const CHORDS = [
  [220.0, 261.63, 329.63], // A C E
  [174.61, 220.0, 261.63], // F A C
  [130.81, 164.81, 196.0], // C E G
  [196.0, 246.94, 293.66], // G B D
];

const tri = (p: number) => 2 * Math.abs(2 * (p - Math.floor(p + 0.5))) - 1;

let cached: string | null = null;

export const placeholderUrl = () => {
  if (cached) return cached;
  const n = SR * SEC;
  const pcm = new Int16Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const bar = Math.floor(t / BAR);
    const chord = CHORDS[bar % CHORDS.length];
    const inBar = t - bar * BAR;

    const padEnv = Math.min(1, inBar / 0.4) * Math.min(1, (BAR - inBar) / 0.6);
    let pad = 0;
    for (const f of chord) pad += Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * f * 2 * t);
    pad *= 0.11 * padEnv;

    const step = Math.floor(inBar / 0.25);
    const noteT = inBar - step * 0.25;
    const f = chord[step % 3] * 2 * (step >= 4 ? 1.5 : 1);
    const arp = 0.16 * Math.exp(-noteT * 9) * tri(f * t);

    const master = Math.min(1, t / 1.5) * Math.min(1, (SEC - t) / 2.5);
    pcm[i] = Math.round(Math.max(-1, Math.min(1, (pad + arp) * master)) * 32767);
  }

  const bytes = pcm.length * 2;
  const buf = new ArrayBuffer(44 + bytes);
  const v = new DataView(buf);
  const str = (o: number, s: string) => [...s].forEach((ch, k) => v.setUint8(o + k, ch.charCodeAt(0)));
  str(0, 'RIFF');
  v.setUint32(4, 36 + bytes, true);
  str(8, 'WAVE');
  str(12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); // PCM
  v.setUint16(22, 1, true); // mono
  v.setUint32(24, SR, true);
  v.setUint32(28, SR * 2, true);
  v.setUint16(32, 2, true);
  v.setUint16(34, 16, true);
  str(36, 'data');
  v.setUint32(40, bytes, true);
  new Int16Array(buf, 44).set(pcm);

  cached = URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
  return cached;
};
