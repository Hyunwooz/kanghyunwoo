// React 및 Next.js 관련 패키지
import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// 스타일링
import '../styles/globals.css';
import Bgm from '@/components/common/Bgm';
import PlayerBar from '@/components/creative/PlayerBar';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

export const metadata: Metadata = {
  title: 'WoohDev',
  description: '강현우(WoohDev)의 개인 사이트. 화면을 만들고, 사진을 찍고, 노래를 만듭니다.',
  keywords:
    '사진 아카이브, 포트폴리오, 갤러리, 음악, AI 음악, 프론트엔드, Next.js, 강현우, WoohDev',
  authors: { name: 'WoohDev' },
  openGraph: {
    title: 'WoohDev',
    description: '강현우(WoohDev)의 개인 사이트. 화면을 만들고, 사진을 찍고, 노래를 만듭니다.',
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
    description: '강현우(WoohDev)의 개인 사이트. 화면을 만들고, 사진을 찍고, 노래를 만듭니다.',
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
    <html lang='ko' suppressHydrationWarning>
      {/* 브라우저 확장이 body 에 속성을 붙이면(예: ColorZilla 의 cz-shortcut-listen) hydration 경고가 나므로 body 도 무시한다 */}
      <body
        suppressHydrationWarning
        className={`${pretendard.className} ${pretendard.variable} ${plexMono.variable} bg-background text-main`}
      >
        {children}
        <Bgm />
        {/* /creative 의 곡 플레이어. 페이지를 옮겨도 이어서 나고, 모양은 페이지 디자인을 따른다 */}
        <PlayerBar />
      </body>
    </html>
  );
};

export default RootLayout;
