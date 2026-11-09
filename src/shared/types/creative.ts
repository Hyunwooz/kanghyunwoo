// /creative — AI 로 만든 작업물. 지금은 음악만, 나중에 이미지·영상 컬렉션이 붙는다.

export interface Track {
  id: string;
  title: string;
  // 어떤 곡인지 한 줄
  desc?: string;
  // 만든 도구 (예: 'Suno v4.5')
  tool: string;
  // 만든 시기 'YYYY.MM'
  date: string;
  // 음원 경로. public/ 상대 경로 또는 절대 URL (R2 등)
  src: string;
  // 커버 이미지 (정사각형). public/ 상대 경로 또는 절대 URL. 없으면 hue 로 그린 커버를 쓴다
  cover?: string;
  // 커버 색상 (hue 0–360). 헤더 그라디언트와 이미지 없을 때의 생성 커버에 쓴다
  hue: number;
  // 원본 링크 (Suno 공유 링크 등)
  link?: string;
  tags?: string[];
}

export type CollectionKind = 'music' | 'image' | 'video';

export interface Collection {
  id: string;
  kind: CollectionKind;
  title: string;
  description: string;
  tracks: Track[];
}
