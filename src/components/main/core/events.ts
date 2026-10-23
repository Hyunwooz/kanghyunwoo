// 로더 → 히어로 → 나머지 섹션 사이의 타이밍을 맞추는 전역 이벤트
export const HERO_REVEAL_START = 'wd:hero-reveal-start';
export const HERO_REVEALED = 'wd:hero-revealed';

export const LOADER_SESSION_KEY = 'wd:loader-played';

// 이미 발생한 이벤트 (리스너가 늦게 붙어도 알 수 있게)
export const fired = new Set<string>();

export const emit = (name: string) => {
  fired.add(name);
  window.dispatchEvent(new Event(name));
};

export const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;

export const shuffle = <T,>(list: T[]) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
