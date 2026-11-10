export interface ArchivePhoto {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: ArchiveCategory;
  date: string;
  // 촬영 기기. 카메라 이름 (필름은 판형까지)
  camera?: string;
  location?: string;
  tone?: string;
}

export type ArchiveCategory =
  | 'all'
  | 'street'
  | 'nature'
  | 'people'
  | 'mood'
  | 'travel';

export interface CategoryOption {
  key: ArchiveCategory;
  label: string;
}
