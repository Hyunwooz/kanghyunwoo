import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

// 유틸 함수 분리
import { scrollToSection } from '@/shared/utils/scroll';

// 데이터 분할 관리
import { sectionList } from '@/data/section';
import { textParts } from '@/data/textParts';

// 컴포넌트
import SkillSection from '@/components/skill/skillSection';
import { ExperienceSkillBadge } from '@/components/badge/skillBadge';
import IntroCard from '@/components/card/introCard';

const experienceSkillList = {
  sng: [
    'TypeScript',
    'JavaScript',
    'Tailwind',
    'Bootstrap',
    'NextJS',
    'React',
    'Python',
    'AWS EC2',
  ],
  est: ['Python', 'Django', 'AWS EC2', 'AWS S3'],
};

const introData = [
  {
    title: '프론트엔드 개발',
    contents:
      '비전공자로 웹 개발 공부를 시작한 후, 현재는 프론트엔드 개발을 담당하고 있습니다. 처음에는 Python을 활용해 반복적인 업무를 자동화하며 개발에 흥미를 느꼈고, 그 후 프론트엔드 분야로 관심을 확장하게 되었습니다. 사용자 경험을 최우선으로 고려하며, 직관적이고 효율적인 웹 인터페이스를 구현하는 것에 큰 보람을 느끼고 있습니다.',
  },
  {
    title: '성장에 대한 즐거움',
    contents:
      '새로운 프로젝트를 시작할 때마다 단순히 이전에 사용하던 기술을 활용하는 것이 아닌, 이전 프로젝트에서 아쉬웠던 부분을 개선하고 새로운 코드 스타일이나 기술을 적용하는 것에 큰 즐거움을 느낍니다. 이는 개발에 있어서 성장을 위한 동기가 되어주고 있으며, 점점 더 나은 개발자로 나아가는 과정에서 큰 성취감을 얻고 있습니다.',
  },
  {
    title: '안되면 될 때까지',
    contents:
      '프론트엔드 개발을 혼자 진행하고 있습니다. 이 과정에서 모든 것을 스스로 찾아내고 해결해야 했기 때문에, 때론 기능 구현에 며칠이 걸리기도 했습니다. 하지만 이런 과정을 통해 개발에 있어서 "해결할 수 없는 문제는 없다"는 확신을 가지게 되었습니다. 이로써, 자신에게 부여된 책임을 끝까지 완수할 수 있는 끈기를 얻게 되었습니다.',
  },
];

const Home = () => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const cssRule = 'font-size:16px; font-family:Nanum Gothic';
    const cssRule2 =
      'font-size:24px; font-family:Nanum Gothic; font-weight: 600; color: #12372A';
    const cssRule3 =
      'font-size:18px; font-family:Nanum Gothic; font-weight: 600;';
    const cssLogo1 =
      'color:#12372A;' +
      'font-size: 60px;' +
      'font-weight: bold;' +
      'letter-space:-1px;' +
      'font-family:Tahoma,Arial,sans-serif';
    const cssLogo2 =
      'color:#436850;' +
      'font-size: 60px;' +
      'font-weight: bold;' +
      'letter-space:-1px;' +
      'font-family:Tahoma,Arial,sans-serif';
    if (window.console != undefined) {
      setTimeout(
        console.log.bind(console, '%cWooh%cDev', cssLogo1, cssLogo2),
        50,
      );
      setTimeout(
        console.log.bind(
          console,
          `%c안녕하세요. 주니어 프론트 엔드 개발자 강현우입니다
          \n\n%cContact\n\n%cEmail : gusdn0481@gmail.com
          \n\n%cChannel\n\n%cGithub : https://github.com/hyunwooz\n`,
          cssRule3,
          cssRule2,
          cssRule,
          cssRule2,
          cssRule,
        ),
        50,
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev < textParts.length) return prev + 1; // 글자 하나씩 추가
        clearInterval(interval); // 모든 글자가 표시되면 멈춤
        return prev;
      });
    }, 100); // 100ms 간격으로 글자 표시
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section'); // 모든 섹션 가져오기

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // 현재 뷰포트에 보이는 섹션 ID 설정
          }
        });
      },
      { threshold: 0.7 }, // 90% 이상 보이면 트리거
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 z-20 flex h-screen w-full items-center justify-center pb-36 font-bold transition-all duration-1000 ${
          isClicked
            ? 'text-md cursor-normal translate-y-[-100%] opacity-0 md:text-2xl'
            : 'translate-y-0 cursor-pointer text-xl opacity-100 sm:text-3xl md:translate-y-0 md:text-4xl xl:text-6xl'
        }`}
        onClick={() => setIsClicked(true)}
      >
        {textParts.map((part, index) => (
          <span
            key={index}
            className={`inline-block ${
              index < visibleChars
                ? 'max-w-full opacity-100'
                : 'max-w-0 opacity-0'
            } ${part.color}`}
          >
            {part.content === ' ' ? '\u00A0' : part.content}
          </span>
        ))}
        <p className='ml-1 animate-blink'>{'|'}</p>
      </div>
      <main className='lg:px-[60px] xl:px-[160px] 2xl:px-[240px]'>
        <nav
          className={`z-10 mb-[40px] items-center justify-center px-4 pt-12 text-start transition-all duration-1000 md:px-12 md:pt-0 lg:fixed lg:top-0 lg:w-[42%] lg:px-0 xl:w-[32%] ${
            isClicked
              ? 'translate-y-0 opacity-100 md:translate-y-[64px] lg:translate-y-[78px] xl:translate-y-[94px]'
              : 'translate-y-[100%] opacity-0 md:translate-y-[210px]'
          }`}
        >
          <h1 className='mb-2 text-5xl font-bold md:text-[60px] xl:mb-8 xl:text-[88px]'>
            강현우
          </h1>
          <p className='mb-2 text-lg font-medium leading-6 text-main md:mb-4 xl:text-[22px]'>
            웹 애플리케이션에 가치를 더하는 과정에서 큰 보람을 느낍니다.
          </p>
          <p className='text-md mb-12 font-medium leading-6 text-[#fffff56e] lg:mb-28 xl:text-[18px]'>
            사용자 경험을 최적화하고, 인터페이스를 직관적으로 만드는{' '}
            <strong className='font-bold text-main'>프론트엔드</strong>를
            담당하고 있습니다. 제 포트폴리오를 방문해 주셔서 진심으로
            감사드립니다.
          </p>
          {sectionList.map((section, index) => (
            <div
              key={index}
              className={`mb-4 hidden w-[200px] cursor-pointer items-center gap-4 hover:opacity-100 lg:flex ${
                activeSection === section.name ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => scrollToSection(section.name)}
            >
              <div
                className={`h-[3px] transition-all duration-300 ease-in-out ${activeSection === section.name ? 'w-[80px]' : 'w-[40px]'} bg-main`}
              ></div>
              <p className='text-sm font-bold xl:text-[18px]'>{section.name}</p>
            </div>
          ))}
          <div className='mt-0 flex gap-3 lg:mt-60'>
            <Link
              href={'https://github.com/hyunwooz'}
              className='duration-400 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
            >
              <Icon icon='akar-icons:github-fill' width={30} height={30} />
            </Link>
            <Link
              href={'https://www.instagram.com/wooh.dev/'}
              className='duration-400 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
            >
              <Icon icon='ri:instagram-fill' width={30} height={30} />
            </Link>
            <Link
              href={'https://www.linkedin.com/in/woohyundev/'}
              className='duration-400 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
            >
              <Icon icon='pajamas:linkedin' width={30} height={30} />
            </Link>
          </div>
        </nav>
        <section
          id='About'
          className='relative w-full pb-2 pt-8 md:pb-[40px] md:pt-[50px]'
        >
          <div
            className={`flex items-center justify-end text-start transition-all duration-1000 md:justify-end ${
              isClicked
                ? 'opacity-100 md:translate-y-[16px] lg:translate-y-[30px] xl:translate-y-[50px]'
                : 'translate-y-[30%] opacity-0'
            }`}
          >
            <div className='w-full px-0 md:mt-0 lg:w-1/2'>
              <h2
                className={`bg-background sticky top-0 z-10 mb-[30px] w-full border-0 border-main p-4 text-3xl font-bold md:top-[-16px] md:px-12 md:py-4 lg:static lg:mb-16 lg:border-l-8 lg:p-0 lg:px-4 lg:text-4xl xl:text-5xl`}
              >
                About
              </h2>
              <div className='w-full px-4 md:px-12 lg:p-0'>
                {introData.map((data, index) => (
                  <IntroCard
                    title={data.title}
                    key={index}
                    contents={data.contents}
                    index={index + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id='Skills'
          className='relative w-full pb-2 pt-8 md:pb-[40px] md:pt-[50px]'
        >
          <div
            className={`flex items-center justify-end text-start transition-all duration-1000 md:justify-end ${
              isClicked
                ? 'opacity-100 md:translate-y-[16px] lg:translate-y-[30px] xl:translate-y-[50px]'
                : 'translate-y-[30%] opacity-0'
            }`}
          >
            <div className='w-full px-0 md:mt-0 lg:w-1/2'>
              <h2
                className={`bg-background sticky top-0 z-10 mb-[30px] w-full border-0 border-main p-4 text-3xl font-bold md:top-[-16px] md:px-12 md:py-4 lg:static lg:mb-16 lg:border-l-8 lg:p-0 lg:px-4 lg:text-4xl xl:text-5xl`}
              >
                Skills
              </h2>
              <div className='w-full px-4 md:px-12 lg:p-0'>
                <SkillSection />
              </div>
            </div>
          </div>
        </section>
        <section
          id='Experience'
          className='relative w-full pb-2 pt-8 md:pb-[40px] md:pt-[50px]'
        >
          <div
            className={`flex items-center justify-end text-start transition-all duration-1000 md:justify-end ${
              isClicked
                ? 'opacity-100 md:translate-y-[16px] lg:translate-y-[30px] xl:translate-y-[50px]'
                : 'translate-y-[30%] opacity-0'
            }`}
          >
            <div className='w-full px-0 md:mt-0 lg:w-1/2'>
              <h2
                className={`bg-background sticky top-0 z-10 mb-[30px] w-full border-0 border-main p-4 text-3xl font-bold md:top-[-16px] md:px-12 md:py-4 lg:static lg:mb-16 lg:border-l-8 lg:p-0 lg:px-4 lg:text-4xl xl:text-5xl`}
              >
                Experience
              </h2>
              <div className='w-full px-4 md:px-12 lg:p-0'>
                <div className='mb-12'>
                  <h3 className='mb-1 block border-b border-light pb-2 text-2xl font-semibold md:text-3xl'>
                    S&G Company
                  </h3>
                  <p className='mb-2 text-base font-normal md:mb-4 md:text-lg'>
                    테크기반 마케팅 및 프롭테크 서비스 스타트업
                  </p>
                  <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
                    <div className='flex w-full items-center gap-4 md:block md:w-3/12 xl:w-1/3'>
                      <h4 className='text-sm font-bold md:mb-2 xl:text-lg'>
                        프론트엔드 개발자
                      </h4>
                      <p className='text-xs font-semibold xl:text-base'>
                        2023.11 ~ 현재
                      </p>
                    </div>
                    <div className='w-full md:w-9/12 md:px-2 xl:w-2/3'>
                      <ul className='flex list-inside list-disc flex-col gap-1'>
                        <li>개발 업무 프로세스 구축 및 프로젝트 문서화 진행</li>
                        <li>CI/CD 및 Git Flow 적용 등 개발 환경 개선</li>
                        <li>노션을 활용한 업무 프로세스 ( 칸반보드 ) 도입</li>
                        <li>파이썬을 활용한 다양한 업무 자동화</li>
                        <li>계약서 자동 관리 시스템 구축</li>
                        <li>자사 서비스 통합 관리 서비스 구축 및 유지보수</li>
                      </ul>
                    </div>
                  </div>
                  <div className='mt-4 flex flex-wrap gap-x-1 gap-y-2'>
                    {experienceSkillList['sng'].map((value, index) => (
                      <ExperienceSkillBadge key={index} title={value} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className='mb-1 block border-b border-light pb-2 text-2xl font-semibold md:text-3xl'>
                    [ESTsoft] 백엔드 개발 오르미 1기
                  </h3>
                  <p className='mb-2 text-base font-normal md:mb-4 md:text-lg'>
                    ESTsoft 주관 백엔드 개발자 과정 1기 부트캠프
                  </p>
                  <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
                    <div className='flex w-full items-center gap-4 md:block md:w-3/12 xl:w-1/3'>
                      <p className='text-sm font-semibold xl:text-base'>
                        2023.04 ~ 2023.09
                      </p>
                    </div>
                    <div className='w-full md:w-9/12 md:px-2 xl:w-2/3'>
                      <ul className='flex list-inside list-disc flex-col gap-1'>
                        <li>GitHub, Python, Django, Django Restframe Work</li>
                        <li>ERD, PostgreSQL, HTML, CSS, JaveScripts</li>
                        <li>Django 웹 프레임워크 기반 프로젝트 3건 제작</li>
                        <li>Django 개인 프로젝트 최우수상 수상</li>
                        <li>Django 팀 프로젝트 최우수상 수상</li>
                        <li>23년 7월 이달의 오르미 선정</li>
                      </ul>
                    </div>
                  </div>
                  <div className='mt-4 flex flex-wrap gap-x-1 gap-y-2'>
                    {experienceSkillList['est'].map((value, index) => (
                      <ExperienceSkillBadge key={index} title={value} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id='Projects'
          className='relative w-full pb-2 pt-8 md:pb-[40px] md:pt-[50px]'
        >
          <div
            className={`flex items-center justify-end text-start transition-all duration-1000 md:justify-end ${
              isClicked
                ? 'opacity-100 md:translate-y-[16px] lg:translate-y-[30px] xl:translate-y-[50px]'
                : 'translate-y-[30%] opacity-0'
            }`}
          >
            <div className='w-full px-0 md:mt-0 lg:w-1/2'>
              <h2
                className={`bg-background sticky top-0 z-10 mb-[30px] w-full border-0 border-main p-4 text-3xl font-bold md:top-[-16px] md:px-12 md:py-4 lg:static lg:mb-16 lg:border-l-8 lg:p-0 lg:px-4 lg:text-4xl xl:text-5xl`}
              >
                Projects
              </h2>
              <div className='w-full px-4 md:px-12 lg:p-0'>
                <div className='mb-12 min-h-[400px]'>1</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
