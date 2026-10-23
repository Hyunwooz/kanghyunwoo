// React 및 Next.js 관련 패키지
import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// 스타일링
import '../styles/globals.css';
import { LOADER_SESSION_KEY, LOADER_SKIP_CLASS } from '@/components/main/core/events';

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
    <html lang='ko' suppressHydrationWarning>
      <body
        className={`${pretendard.className} ${pretendard.variable} ${plexMono.variable} bg-background text-main`}
      >
        {/*
          메인 로더를 이미 본 세션이면 하이드레이션 전에 숨겨 검은 화면이 번쩍이지 않게 한다.
          <script> 를 JSX 로 직접 쓰면 React 19 가 경고하므로, HTML 문자열로 넣어 파서가 바로 실행하게 한다.
        */}
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: `<script>try{if(sessionStorage.getItem('${LOADER_SESSION_KEY}')==='1')document.documentElement.classList.add('${LOADER_SKIP_CLASS}')}catch(e){}</script>`,
          }}
        />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
