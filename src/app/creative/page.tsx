import type { Metadata } from 'next';
import CreativePage from '@/components/creative';

export const metadata: Metadata = {
  title: 'WoohDev | Creative',
  description: '강현우(WoohDev)가 AI 로 만든 것들. 프롬프트로 쓰고 모델이 부른 음악.',
  openGraph: {
    title: 'WoohDev | Creative',
    description: 'AI 로 만든 음악과 작업물.',
    url: 'https://kanghyunwoo.com/creative',
  },
  twitter: {
    title: 'WoohDev | Creative',
    description: 'AI 로 만든 음악과 작업물.',
  },
};

const Page = () => <CreativePage />;

export default Page;
