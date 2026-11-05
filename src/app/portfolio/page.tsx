import type { Metadata } from 'next';
import PortfolioPage from '@/components/portfolio';

export const metadata: Metadata = {
  title: 'WoohDev | Portfolio',
  description: '강현우(WoohDev) 프론트엔드 개발자 포트폴리오. 경력, 프로젝트, 기술.',
  openGraph: {
    title: 'WoohDev | Portfolio',
    description: '강현우(WoohDev) 프론트엔드 개발자 포트폴리오.',
    url: 'https://kanghyunwoo.com/portfolio',
  },
};

const Page = () => <PortfolioPage />;

export default Page;
