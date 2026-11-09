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
  // 음원 경로. public/ 상대 경로 또는 절대 URL (Suno CloudFront, R2 등)
  src: string;
  // 길이(초). 알고 있으면 적어 두면 목록에서 metadata 를 따로 안 읽는다
  duration?: number;
  // 모델 (예: 'v5')
  model?: string;
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
  // 'album' 은 한 장의 커버를 공유하는 정규 앨범, 'playlist' 는 곡마다 커버가 다른 모음
  type: 'album' | 'playlist';
  title: string;
  description: string;
  // 컬렉션 대표 커버. 없으면 첫 곡 커버
  cover?: string;
  // 원본 링크 (Suno 앨범/플레이리스트)
  link?: string;
  tracks: Track[];
}
