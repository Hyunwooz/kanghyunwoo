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
  title: 'WoohDev',
  description: '강현우(WoohDev)의 개인 사이트.',
  keywords:
    '사진 아카이브, 포트폴리오, 갤러리, 프론트엔드, Next.js, 강현우, WoohDev',
  authors: { name: 'WoohDev' },
  openGraph: {
    title: 'WoohDev',
    description: '강현우(WoohDev)의 개인 사이트.',
    url: 'https://kanghyunwoo.com/',
    siteName: 'WoohDev',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://kanghyunwoo.com/images/og.png',
        width: 1200,
        height: 630,
        alt: 'WoohDev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WoohDev',
    description: '강현우(WoohDev)의 개인 사이트.',
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
