// React 및 Next.js 관련 패키지
import type { Metadata } from 'next';
import localFont from 'next/font/local';

// 스타일링
import '../styles/globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'WoohDev | 웹 개발자 포트폴리오',
  description:
    'WoohDev의 포트폴리오 사이트 입니다. 웹 개발에 대한 진정성과 프론트엔드, 백엔드, 최신 기술 트렌드와 함께하는 개발 여정을 확인하세요.',
  keywords:
    '웹 개발자, 포트폴리오, 프론트엔드, 백엔드, Next.js, React, TailwindCSS, TypeScript, 강현우, 강현우 포트폴리오',
  authors: { name: 'WoohDev' },
  openGraph: {
    title: 'WoohDev | 웹 개발자 포트폴리오',
    description:
      'WoohDev의 포트폴리오 사이트 입니다. 웹 개발에 대한 진정성과 프론트엔드, 백엔드, 최신 기술 트렌드와 함께하는 개발 여정을 확인하세요.',
    url: 'https://kanghyunwoo.com/',
    siteName: 'WoohDev',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://kanghyunwoo.com/images/og.png',
        width: 1200,
        height: 630,
        alt: 'WoohDev 포트폴리오',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WoohDev | 웹 개발자 포트폴리오',
    description:
      'WoohDev의 포트폴리오 사이트 입니다. 웹 개발에 대한 진정성과 프론트엔드, 백엔드, 최신 기술 트렌드와 함께하는 개발 여정을 확인하세요.',
    images: ['https://kanghyunwoo.com/images/og.png'],
  },
  other: {
    'naver-site-verification': '71ba3d219d56f829ae5ac23a0864405712c8b9ad',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='ko'>
      <body className={`${pretendard.className} bg-background text-main`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
