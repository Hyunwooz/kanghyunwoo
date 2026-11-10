import type { Metadata } from 'next';
import CreativePage from '@/components/creative';

export const metadata: Metadata = {
  title: 'WoohDev | Creative',
  description: '강현우(WoohDev)의 노래들. 마음이 이끄는 대로 쓰고, AI 로 불렀습니다.',
  openGraph: {
    title: 'WoohDev | Creative',
    description: '마음이 이끄는 대로 쓰고, AI 로 부른 노래들.',
    url: 'https://kanghyunwoo.com/creative',
  },
  twitter: {
    title: 'WoohDev | Creative',
    description: '마음이 이끄는 대로 쓰고, AI 로 부른 노래들.',
  },
};

const Page = () => <CreativePage />;

export default Page;
