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
  title: 'WoohDev | 프론트엔드 개발자 포트폴리오',
  description:
    'WoohDev의 포트폴리오 사이트 입니다. 새로운 프로젝트를 시작할 때마다 단순히 이전에 사용하던 기술을 활용하는 것이 아닌, 이전 프로젝트에서 아쉬웠던 부분을 개선하고 새로운 코드 스타일이나 기술을 적용하는 것에 큰 즐거움을 느낍니다.',
  keywords:
    '웹 개발자, 포트폴리오, 프론트엔드, 백엔드, Next.js, React, TailwindCSS, TypeScript, 강현우, 강현우 포트폴리오',
  authors: { name: 'WoohDev' },
  openGraph: {
    title: 'WoohDev | 웹 개발자 포트폴리오',
    description:
      'WoohDev의 포트폴리오 사이트 입니다. 새로운 프로젝트를 시작할 때마다 단순히 이전에 사용하던 기술을 활용하는 것이 아닌, 이전 프로젝트에서 아쉬웠던 부분을 개선하고 새로운 코드 스타일이나 기술을 적용하는 것에 큰 즐거움을 느낍니다.',
    url: 'https://kanghyunwoo.com/',
    siteName: 'WoohDev',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://kanghyunwoo.com/images/og.png',
        width: 1200,
        height: 630,
        alt: 'WoohDev 프론트엔드 개발자 포트폴리오',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WoohDev | 프론트엔드 개발자 포트폴리오',
    description:
      'WoohDev의 포트폴리오 사이트 입니다. 새로운 프로젝트를 시작할 때마다 단순히 이전에 사용하던 기술을 활용하는 것이 아닌, 이전 프로젝트에서 아쉬웠던 부분을 개선하고 새로운 코드 스타일이나 기술을 적용하는 것에 큰 즐거움을 느낍니다.',
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
