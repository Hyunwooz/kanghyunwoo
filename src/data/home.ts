import { archivePhotos } from './archive';
import { experienceList } from './experience';
import { projectList } from './project';

// 메인 페이지 문구/미디어. noth.in 의 섹션 구성에 1:1 로 대응한다.
// TODO 표시가 있는 값은 실제 사진·영상·문구로 바꿔 끼우면 된다.

const photo = (id: string) =>
  archivePhotos.find((p) => p.id === id) ?? archivePhotos[0];

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/wooh.dev/' },
  { label: 'Github', href: 'https://github.com/hyunwooz' },
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/woohyundev/' },
];

export const contact = {
  email: 'hyunwoo.kang@saladlab.co',
};

export const navLinks = [
  { label: 'works', href: '#works' },
  { label: 'person', href: '#person' },
  { label: 'archive', href: '/archive' },
  { label: 'portfolio', href: '/portfolio' },
  { label: 'contact', href: '#footer' },
];

export const hero = {
  tagline: ['Bridging business and code.', 'Sharing the world, through light.'],
  cta: { label: 'enter the archive', href: '/archive' },
  caption: 'Developer & photographer in Seoul',
  // 커서로 워드마크를 지우면 드러나는 배경. 영상(mp4)을 쓰려면 video 에 경로를 넣는다.
  media: { image: photo('14').src, video: '' as string },
};

export const showreel = {
  title: ['많이 만드는 것보다,', '오래 남는 걸 만듭니다.'],
  // TODO: 쇼릴 영상이 생기면 video 에 넣기 (없으면 이미지)
  media: { image: photo('15').src, video: '' as string },
  label: '( A step aside )',
  text: '이미지가 넘치는 세상에서 귀한 건 또렷함이라고 생각해요. 그래서 무엇을 만들든 더하기보다 덜어내는 쪽을 고릅니다.',
};

export const works = {
  word: 'works',
  title: ['Good code works.', 'Great code disappears.'],
  // 비스테이션 관련 작업은 메인에서 제외 (/portfolio 에는 남아 있음)
  items: projectList
    .filter((project) => !project.name.startsWith('Bstation'))
    .map((project) => ({
      name: project.name,
      tagline: project.decs,
      image: project.thumbnail,
      href: project.siteUrl ?? project.githubUrl ?? '/portfolio',
    })),
  viewAll: { label: 'View all', href: '/portfolio' },
  years: '© 23 . 26',
};

export const musee = {
  // noth.in 은 하얀 전시장 사진(bg) 위에 액자 영상이 줄어들며 들어간다.
  // 전시장 배경 (AI 생성 이미지, 원하면 교체)
  room: '/images/home/room.png',
  media: { image: photo('05').src, video: '' as string },
};

export const person = {
  label: '( The Person )',
  text: '화면을 만드는 일과 장면을 남기는 일. 둘은 다른 일 같지만, 결국 무엇을 남기고 무엇을 덜어낼지 고르는 같은 일이라고 생각해요.',
  leftImage: photo('17').src,
  leftCaption: ['or something', 'unexpected.'],
  rightImage: photo('03').src,
  title: ['Slow, but', 'steady.'],
  listLabel: 'I build :',
  list: [
    'Web products',
    'Admin dashboards',
    'Design systems',
    'Automation',
    'Photo archives',
  ],
  aside: 'Perspective is where code meets the way people see.',
  // 커서를 피해 흩어지는 오브제 (원본의 3D 오브제 + NOTHIN 글자 자리)
  objects: [
    photo('07').src,
    photo('18').src,
    photo('01').src,
    photo('04').src,
    photo('13').src,
  ],
};

export const people = {
  label: 'Nothing without people :',
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

export const glitch = {
  background: photo('10').src,
  phrase: 'slow but steady',
  noise: 'Pj(è !!” .      U§h s .   j k j . k .     r h',
  finalText: [
    '화면을 만들고,',
    '장면을 남기고,',
    '그 사이에서',
    '오래 머뭅니다.',
  ],
  images: [photo('06').src, photo('16').src],
};

export const faq = {
  letters: ['F', 'A', 'Q', 'S'],
  label: '( Questions I get asked )',
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
