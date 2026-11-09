import type { Collection } from '@/shared/types/creative';

// /creative 데이터.
// 곡을 추가하려면: 음원을 public/audio/creative/<id>.mp3 (또는 R2) 에 올리고,
// 커버를 public/images/creative/<id>.jpeg 에 넣고 아래 tracks 에 한 줄 넣는다.
// Suno 공유 링크 페이지의 og:image (cdn2.suno.ai/image_large_<id>.jpeg) 가 그 곡의 커버다.
// hue 는 커버의 대표색. 헤더 그라디언트에 쓰이니 커버와 어울리게 고른다.

export const music: Collection = {
  id: 'music',
  kind: 'music',
  title: 'AI Music',
  description: '프롬프트로 쓰고 Suno 로 부른 곡들. 사이트 배경음악으로 쓰거나, 그냥 듣고 싶어서 만든 것들.',
  tracks: [
    {
      id: 'same-place',
      title: '같은 곳을 보고',
      desc: '이 사이트의 배경음악. 같은 곳을 바라보는 두 사람에 대해.',
      tool: 'Suno',
      date: '2026.11',
      // TODO: 실제 음원(/audio/bgm.mp3)이 들어오면 되돌린다. 지금은 60초 테스트 톤.
      src: '/audio/test-60s.wav',
      cover: '/images/creative/same-place.jpeg',
      hue: 215,
      link: 'https://suno.com/s/pk3tayHJbF5LWWOz',
      tags: ['ballad', 'site bgm'],
    },
    {
      id: 'nothing-day',
      title: '아무 일도 없는 날',
      tool: 'Suno',
      date: '2026.11',
      // TODO: Suno 에서 받은 mp3 를 /audio/creative/nothing-day.mp3 로 넣고 되돌린다. 지금은 60초 테스트 톤.
      src: '/audio/test-60s.wav',
      cover: '/images/creative/nothing-day.jpeg',
      hue: 290,
      link: 'https://suno.com/s/bvX9FYyn6kXBRjZw',
    },
  ],
};

export const collections: Collection[] = [music];

// 왼쪽 사이드바의 컬렉션 목록. 아직 없는 건 soon 으로 표시만.
export const collectionNav = [
  { kind: 'music', label: 'Music', ready: true },
  { kind: 'video', label: 'Video', ready: false },
] as const;

export const siteNav = [
  { label: 'Home', href: '/' },
  { label: 'Archive', href: '/archive' },
  { label: 'Portfolio', href: '/portfolio' },
];
