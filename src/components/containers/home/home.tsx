import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

// 유틸 함수 분리
import { scrollToSection } from '@/shared/utils/scroll';

// 데이터 분할 관리
import { sectionList } from '@/data/section';
import { textParts } from '@/data/textParts';
import { experienceList } from '@/data/experience';
import { projectList } from '@/data/project';
import { aboutDatas } from '@/data/about';

// 컴포넌트
import SkillSection from '@/components/skill/skillSection';
import AboutCard from '@/components/card/aboutCard';
import ExperienceCard from '@/components/card/experienceCard';
import ProjectCard from '@/components/card/projectCard';

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
    const allSections = document.querySelectorAll('section'); // 모든 섹션 가져오기

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // 현재 뷰포트에 보이는 섹션 ID 설정
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px' }, // 90% 이상 보이면 트리거
    );

    allSections.forEach((section) => {
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
      <nav
        className={`fixed left-0 top-0 z-10 hidden h-screen justify-between px-4 pb-[50px] pt-[200px] lg:flex lg:flex-col xl:px-16 xl:pt-[260px] ${
          isClicked ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='flex flex-col items-start'>
          {sectionList.map((section, index) => (
            <div
              key={index}
              className={`flex origin-left cursor-pointer items-center border-l-4 py-2 pl-6 text-[16px] font-bold transition-all duration-300 hover:opacity-100 xl:text-[20px] ${
                activeSection === section.name ? 'opacity-100' : 'opacity-40'
              }`}
              onClick={() => scrollToSection(section.name)}
            >
              {section.name}
            </div>
          ))}
        </div>
        <div className='mt-0 flex flex-col items-center'>
          <Link
            href={'https://github.com/hyunwooz'}
            className='duration-400 mb-3 w-[30px] origin-center opacity-60 transition-transform hover:scale-125 hover:opacity-100'
          >
            <Icon icon='akar-icons:github-fill' width={30} height={30} />
          </Link>
          <Link
            href={'https://www.instagram.com/wooh.dev/'}
            className='duration-400 mb-3 w-[30px] origin-center opacity-60 transition-transform hover:scale-125 hover:opacity-100'
          >
            <Icon icon='ri:instagram-fill' width={30} height={30} />
          </Link>
          <Link
            href={'https://www.linkedin.com/in/woohyundev/'}
            className='duration-400 w-[30px] origin-center opacity-60 transition-transform hover:scale-125 hover:opacity-100'
          >
            <Icon icon='pajamas:linkedin' width={30} height={30} />
          </Link>
          <p className='mt-5 text-xs font-light'>Last Updated 2025/01/31</p>
        </div>
      </nav>
      <main className='px-4 md:px-12 lg:px-[160px] xl:px-[280px] 2xl:px-[360px] 3xl:px-[460px]'>
        <section
          id='Intro'
          className={`flex min-h-screen w-full flex-col items-start justify-center transition-all duration-1000 ${isClicked ? 'opacity-100' : 'opacity-0'} px-4 pb-10 text-[#fffff56e]`}
        >
          <p className='mb-4 text-[20px] font-semibold md:text-[24px] lg:mb-8 xl:text-[30px]'>
            안녕하세요.
          </p>
          <h1 className='mb-6 text-5xl font-bold text-main md:text-[60px] xl:mb-10 xl:text-[108px]'>
            강현우 입니다.
          </h1>
          <p className='text-[20px] font-semibold md:text-[20px] xl:text-[36px] xl:leading-tight'>
            {/* 저는 웹 애플리케이션에{' '}
            <strong className='font-bold text-main'>가치를 더하는 과정</strong>
            에서 <strong className='font-bold text-main'>큰 보람</strong>을
            느끼고 있습니다.  */}
            저는 사용자 경험을 최적화하고, 인터페이스를 직관적으로만드는
          </p>
          <p className='mb-2 text-[20px] font-semibold md:mb-10 md:text-[20px] xl:text-[36px] xl:leading-tight'>
            <strong className='font-bold text-main'>프론트엔드</strong>를
            담당하고 있습니다.
          </p>
          <p className='text-md mb-2 font-medium leading-6 text-[#fffff56e] xl:text-[22px]'></p>
          <p className='text-md mb-20 font-medium leading-6 xl:text-[22px]'>
            제 포트폴리오를 방문해 주셔서 진심으로 감사드립니다.
          </p>
          <div className='mt-0 flex gap-3 xl:hidden'>
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
          <div
            onClick={() => {
              scrollToSection('About');
              setIsClicked(true);
            }}
            className='absolute bottom-6 left-0 flex w-full cursor-pointer flex-col items-center justify-center text-xs font-bold md:mb-4 md:text-xl'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='48'
              height='48'
              viewBox='0 0 48 32'
              className='animate-bounce-updown'
            >
              <path
                fill='none'
                stroke='#fff'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                d='M36 18L24 30L12 18'
              />
            </svg>
            <p>Scroll</p>
          </div>
        </section>
        <section
          id='About'
          className='relative w-full pb-2 pt-8 md:pb-[40px] md:pt-[50px]'
        >
          <div
            className={`transition-all duration-1000 ${
              isClicked ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className='w-full px-0 md:mt-0'>
              <h2
                className={`sticky top-0 z-20 mb-[30px] w-full border-0 border-main bg-background py-4 text-4xl font-bold lg:static lg:mb-16 lg:border-l-8 lg:px-4 xl:text-5xl`}
              >
                About
              </h2>
              <div className='w-full'>
                {aboutDatas.map((data, index) => (
                  <AboutCard
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
          id='Experience'
          className='relative w-full pb-2 pt-8 md:pb-[40px] md:pt-[50px]'
        >
          <div
            className={`transition-all duration-1000 ${
              isClicked ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className='w-full px-0 md:mt-0'>
              <h2
                className={`sticky top-0 z-20 mb-[30px] w-full border-0 border-main bg-background py-4 text-4xl font-bold lg:static lg:mb-16 lg:border-l-8 lg:px-4 xl:text-5xl`}
              >
                Experience
              </h2>
              <div className='w-full'>
                {experienceList.map((exp, index) => (
                  <ExperienceCard
                    key={index}
                    role={exp.role}
                    name={exp.name}
                    decs={exp.decs}
                    period={exp.period}
                    skillStacks={exp.skillStacks}
                    works={exp.works}
                    styleClasses='mb-20 '
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
            className={`transition-all duration-1000 ${
              isClicked ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className='w-full px-0 md:mt-0'>
              <h2
                className={`sticky top-0 z-20 mb-[30px] w-full border-0 border-main bg-background py-4 text-4xl font-bold lg:static lg:mb-16 lg:border-l-8 lg:px-4 xl:text-5xl`}
              >
                Skills
              </h2>
              <div className='w-full'>
                <SkillSection />
              </div>
            </div>
          </div>
        </section>
        <section
          id='Projects'
          className='relative min-h-[100vh] w-full pb-2 pt-8 md:pb-[40px] md:pt-[50px]'
        >
          <div
            className={`transition-all duration-1000 ${
              isClicked ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className='w-full px-0 md:mt-0'>
              <h2
                className={`sticky top-0 z-20 mb-[30px] w-full border-0 border-main bg-background py-4 text-4xl font-bold lg:static lg:mb-16 lg:border-l-8 lg:px-4 xl:text-5xl`}
              >
                Projects
              </h2>
              <div className='mb-4 w-full'>
                {projectList.map((project, index) => (
                  <ProjectCard
                    key={index}
                    name={project.name}
                    githubUrl={project.githubUrl}
                    siteUrl={project.siteUrl}
                    thumbnail={project.thumbnail}
                    role={project.role}
                    period={project.period}
                    decs={project.decs}
                    skillStacks={project.skillStacks}
                    contribution={project.contribution}
                    done={project.done}
                    align={index % 2 == 0 ? 'left' : 'right'}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
