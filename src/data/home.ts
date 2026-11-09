import { archivePhotos } from './archive';
import { experienceList } from './experience';

// 메인 페이지 문구/미디어.
// 메인은 "누구인지" 만 말하고, 작업물은 /portfolio, 사진은 /archive 로 보낸다.

const photo = (id: string) =>
  archivePhotos.find((p) => p.id === id) ?? archivePhotos[0];

// 아카이브에 섞지 않는 사진 (R2 web/ 에만 있다)
const R2_WEB = 'https://pub-80e73ef9e7374f46a2b21b346a400cc0.r2.dev/web';

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/wooh.dev/' },
  { label: 'Github', href: 'https://github.com/hyunwooz' },
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/woohyundev/' },
];

export const contact = {
  email: 'hyunwoo.kang@saladlab.co',
};

export const navLinks = [
  { label: 'about', href: '#person' },
  { label: 'archive', href: '/archive' },
  { label: 'portfolio', href: '/portfolio' },
  { label: 'contact', href: '#footer' },
];

export const hero = {
  caption: 'Kang Hyunwoo in Seoul',
  cta: { label: 'view the archive', href: '/archive' },
  // 커서로 워드마크를 지우면 드러나는 배경. 영상(mp4)을 쓰려면 video 에 경로를 넣는다.
  media: { image: photo('14').src, video: '' as string },
};

export const person = {
  label: '소개',
  // 큰 제목. 빠진 쇼릴의 선언문을 여기로 옮겼다.
  title: ['많이 만드는 것보다,', '오래 남는 걸 만듭니다.'],
  text: '낮에는 화면을 만들고, 틈이 나면 장면을 찍습니다. 다른 일 같지만 하는 건 비슷해요. 무엇을 남기고 무엇을 덜어낼지 고르는 일이니까요.',
  // 본인 사진 (3:4). 서울 사장 간판 앞에서 카메라를 든 모습.
  portrait: `${R2_WEB}/portrait-2.webp`,
  portraitCaption: ['이 사이트에서 유일하게', '남이 찍은 사진입니다.'],
  // 가는 선으로 나눈 색인. 라벨은 모노 소문자.
  index: [
    { label: 'work', items: ['웹 프로덕트', '어드민 대시보드', '디자인 시스템', '자동화 도구', '사진 아카이브'] },
    { label: 'experience', items: experienceList.map((e) => e.name) },
    { label: 'stack', items: ['TypeScript', 'React / Next.js', 'Angular / RxJS', 'Python / Django', 'AWS'] },
  ],
  portfolio: { label: 'view portfolio', href: '/portfolio' },
  // 마지막에 넓게 한 장. 옆의 한 줄이 캡션 역할을 한다.
  scene: photo('10').src,
  sceneCaption: '잘 만드는 일은 잘 보는 일에서 시작한다고 믿어요.',
};

// 벤토 격자. 사진 id 순서가 칸 순서다 (배치는 PhotoGrid 의 LAYOUT 참고):
// 1 큰 가로 / 2 세로 / 3 세로 / 4 정사각 / 5 파노라마 / 6 정사각 / 7 작은 가로 / 8 작은 가로
export const gallery = {
  label: '사진',
  text: '지나가다 멈춰 선 장면들. 대단한 건 없고, 그저 빛이 좋았던 자리들이에요.',
  // 히어로(14)·소개(03)와 겹치지 않는 사진만 쓴다
  photos: ['07', '08', '11', '04', '18', '17', '13', '02'].map((id) => photo(id)),
  cta: { label: 'see all photos', href: '/archive' },
  total: archivePhotos.length,
};

export const faq = {
  label: '자주 받는 질문',
  items: [
    {
      q: '어떤 일을 하나요?',
      a: '프론트엔드 개발자예요. 어드민 대시보드나 위젯처럼 매일 쓰이는 화면을 만들고, 퇴근 후엔 사진을 찍어요.',
      link: { label: 'See the portfolio', href: '/portfolio' },
    },
    {
      q: '어떤 기술을 주로 쓰나요?',
      a: 'TypeScript를 중심으로 React, Next.js, Angular를 써요. 필요하면 Python과 Django로 서버까지 직접 만들어요.',
      link: { label: 'See GitHub', href: 'https://github.com/hyunwooz' },
    },
    {
      q: '사진은 어디서 볼 수 있나요?',
      a: '아카이브에 모아 두었어요. 거리와 자연, 여행에서 찍은 사진들이에요.',
      link: { label: 'Open the archive', href: '/archive' },
    },
    {
      q: '같이 일할 수 있을까요?',
      a: '네, 메일 주세요. 짧은 프로젝트든 긴 협업이든 일단 이야기부터 나눠요.',
      link: { label: 'Send an email', href: `mailto:${contact.email}` },
    },
  ],
};

export const footer = {
  title: ['오래 남을 걸,', '같이 만들어요.'],
  credits: [
    '©2026 — Kang Hyunwoo — Seoul, KR',
    'Built with Next.js',
    'Inspired by noth.in',
  ],
  links: [
    { label: 'ARCHIVE', href: '/archive' },
    { label: 'PORTFOLIO', href: '/portfolio' },
  ],
};
