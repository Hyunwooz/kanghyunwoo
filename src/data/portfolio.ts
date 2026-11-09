import { experienceList } from './experience';
import { projectList } from './project';
import { backend, database, etc, frontend } from './skills';

// /portfolio 문구. 작업 데이터(경력·프로젝트·기술)는 각 파일에서 가져오고 여기엔 편집용 문장만 둔다.

export const contact = {
  email: 'hyunwoo.kang@saladlab.co',
  socials: [
    { label: 'GitHub', href: 'https://github.com/hyunwooz' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/woohyundev/' },
    { label: 'Instagram', href: 'https://www.instagram.com/wooh.dev/' },
  ],
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'Portfolio',
  // 디스플레이 영문 제목. 대문자로 렌더링된다.
  title: ['Hyunwoo', 'Kang'],
  // 히어로 오른쪽 일러스트. public/ 경로를 넣으면 자리표시 그래픽 대신 그림이 들어간다. (권장 1200×1500, 투명 배경 PNG/WebP)
  illustration: null as string | null,
  ticker: ['Frontend Developer', 'Seoul, KR', 'Since 2023', 'Open to talk', 'City Pop Mode'],
  lead: '프론트엔드 개발자. 어드민 대시보드와 위젯처럼 매일 쓰이는 화면을 만듭니다. 화려한 것보다 오래 쓰여도 괜찮은 쪽을 고릅니다.',
  meta: [
    { label: 'Based in', value: 'Seoul, KR' },
    { label: 'Currently', value: `${experienceList[0].role} · ${experienceList[0].name}` },
    { label: 'Since', value: '2023' },
    { label: 'Updated', value: '2026.11' },
  ],
};

export const about = {
  statement:
    '파이썬으로 반복 업무를 자동화하다가 개발이 재미있어졌고, 백엔드로 시작해 지금은 프론트엔드를 맡고 있습니다. 혼자 맡는 일이 많았던 덕에, 문제를 끝까지 들고 가는 버릇이 생겼어요.',
  principles: [
    {
      title: '느리더라도 꾸준하게',
      text: '한 번에 크게 바꾸기보다 작은 개선을 계속 쌓습니다. 성능과 사용 경험은 그렇게 좋아진다고 믿어요.',
    },
    {
      title: '안 되면 될 때까지',
      text: '프론트엔드를 혼자 맡으며 모든 걸 직접 찾고 풀어야 했습니다. 며칠 걸리는 문제도 있었지만, 못 푸는 문제는 없었어요.',
    },
    {
      title: '덜어내는 쪽으로',
      text: '기능을 더하는 것보다 꼭 필요한 것만 또렷하게 남기는 데 공을 들입니다. 화면도, 코드도요.',
    },
  ],
};

export const skillGroups = [
  { label: 'Front-End', items: frontend.map((s) => s.alt) },
  { label: 'Back-End', items: backend.map((s) => s.alt) },
  { label: 'Database', items: database.map((s) => s.alt) },
  { label: 'Infra & Tools', items: etc.map((s) => s.alt) },
];

export const projects = projectList;
export const experiences = experienceList;

export const footer = {
  title: ['Let’s talk', 'about what lasts.'],
  note: '짧은 프로젝트든 긴 협업이든, 메일 한 통이면 충분해요.',
  colophon: ['Set in Dela Gothic One & Pretendard', 'Built with Next.js', '© 2026 Kang Hyunwoo'],
};
