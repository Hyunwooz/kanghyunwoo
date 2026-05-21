export interface ArchivePhoto {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: ArchiveCategory;
  date: string;
  location?: string;
  description?: string;
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
