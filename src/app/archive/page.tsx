import type { Metadata } from 'next';
import Archive from '@/components/archive';

export const metadata: Metadata = {
  title: 'WoohDev | Photo Archive',
  description:
    '강현우(WoohDev)의 사진 아카이브. 오래 머무르고 싶은 장면들을 모아둔 조용한 갤러리.',
  openGraph: {
    title: 'WoohDev | Photo Archive',
    description:
      '오래 머무르고 싶은 장면들을 모아둔 조용한 갤러리. 도시의 소음 너머, 빛이 머무는 자리들.',
    url: 'https://kanghyunwoo.com/archive',
  },
  twitter: {
    title: 'WoohDev | Photo Archive',
    description: '오래 머무르고 싶은 장면들을 모아둔 조용한 갤러리.',
  },
};

const ArchivePage = () => {
  return <Archive />;
};

export default ArchivePage;
