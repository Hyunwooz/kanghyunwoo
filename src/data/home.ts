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
  { label: 'person', href: '#person' },
  { label: 'archive', href: '/archive' },
  { label: 'portfolio', href: '/portfolio' },
  { label: 'contact', href: '#footer' },
];

export const hero = {
  caption: 'Developer & photographer in Seoul',
  cta: { label: 'enter the archive', href: '/archive' },
  // 커서로 워드마크를 지우면 드러나는 배경. 영상(mp4)을 쓰려면 video 에 경로를 넣는다.
  media: { image: photo('14').src, video: '' as string },
};

export const person = {
  label: '소개',
  text: '화면을 만드는 일과 장면을 남기는 일. 둘은 다른 일 같지만, 결국 무엇을 남기고 무엇을 덜어낼지 고르는 같은 일이라고 생각해요.',
  // 본인 사진 (4:5). 서울 사장 간판 앞에서 카메라를 든 모습.
  leftImage: `${R2_WEB}/portrait.webp`,
  leftCaption: ['강현우,', '서울에서 만들고 찍습니다.'],
  rightImage: photo('03').src,
  title: ['Slow, but', 'steady.'],
  listLabel: '만드는 것',
  list: ['웹 프로덕트', '어드민 대시보드', '디자인 시스템', '자동화 도구', '사진 아카이브'],
  aside: '코드든 사진이든, 결국 어떻게 보느냐의 문제라고 생각해요.',
  portfolio: { label: 'view portfolio', href: '/portfolio' },
};

export const people = {
  label: '지나온 곳, 쓰는 도구',
  columns: [
    {
      title: 'experience',
      items: experienceList.map((e) => e.name),
    },
    {
      title: 'stack',
      items: [
        'TypeScript',
        'React / Next.js',
        'Angular / RxJS',
        'Python / Django',
        'AWS',
      ],
    },
  ],
};

// 벤토 격자. 사진 id 순서가 칸 순서다 (배치는 PhotoGrid 의 LAYOUT 참고):
// 1 큰 가로 / 2 세로 / 3 세로 / 4 정사각 / 5 파노라마 / 6 정사각 / 7 작은 가로 / 8 작은 가로
export const gallery = {
  label: '사진',
  text: '오래 머무르고 싶은 장면들. 도시의 소음 너머, 빛이 머무는 자리들을 모아 둡니다.',
  // 히어로(14)·소개(03)와 겹치지 않는 사진만 쓴다
  photos: ['07', '08', '11', '04', '18', '17', '13', '02'].map((id) => photo(id)),
  cta: { label: 'see the archive', href: '/archive' },
  total: archivePhotos.length,
};

export const faq = {
  label: '자주 받는 질문',
  items: [
    {
      q: '어떤 일을 하나요?',
      a: '프론트엔드 개발자로 일하고 있어요. 어드민 대시보드와 위젯처럼 매일 쓰이는 화면을 만들고, 남는 시간엔 사진을 찍습니다.',
      link: { label: 'Read more', href: '/portfolio' },
    },
    {
      q: '어떤 기술을 주로 쓰나요?',
      a: 'TypeScript 를 중심으로 React, Next.js, Angular 를 씁니다. 필요하면 Python 과 Django 로 서버도 직접 만들어요.',
      link: { label: 'Read more', href: '/portfolio' },
    },
    {
      q: '사진은 어디서 볼 수 있나요?',
      a: '아카이브 페이지에 거리, 자연, 사람, 여행 사진을 모아 두었어요.',
      link: { label: 'Open archive', href: '/archive' },
    },
    {
      q: '같이 일할 수 있을까요?',
      a: '언제든 메일 주세요. 짧은 프로젝트든 긴 협업이든 이야기 나누는 걸 좋아합니다.',
      link: { label: 'Drop me an email', href: `mailto:${contact.email}` },
    },
  ],
};

export const footer = {
  title: ['Let’s start', 'from here.'],
  credits: [
    '©2026 — Kang Hyunwoo — Seoul, KR',
    'Site by Kang Hyunwoo',
    'Inspired by noth.in',
  ],
  links: [
    { label: 'ARCHIVE', href: '/archive' },
    { label: 'PORTFOLIO', href: '/portfolio' },
  ],
};

export const loaderImages = [
  photo('01').src,
  photo('02').src,
  photo('03').src,
  photo('04').src,
  photo('06').src,
  photo('08').src,
  photo('11').src,
];
