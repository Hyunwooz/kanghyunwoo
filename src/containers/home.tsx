import { useEffect } from 'react';

// 유틸 함수 분리
import { scrollToSection } from '@/shared/utils/scroll';

// 데이터 분할 관리
import { linkIconList } from '@/data/linkIcon';

// 컴포넌트
import AboutSection from './sections/aboutSection';
import ExperienceSection from './sections/experienceSection';
import SkillSection from './sections/skillSection';
import ProjectSection from './sections/projectSection';
import LinkIconMenu from '@/components/linkIconMenu';

import { cssLogo1, cssLogo2 } from '@/constants/cssLogo';
import { cssRule, cssRule2, cssRule3 } from '@/constants/cssRule';

// Store
import { useSectionStore } from '@/store/useSectionStore';

const Home = () => {
  const { setActiveSection } = useSectionStore();

  useEffect(() => {
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
    <main className='flex flex-col gap-4 px-4 md:px-12 lg:px-[160px] xl:px-[280px] 2xl:px-[360px] 3xl:px-[460px]'>
      <section
        id='Intro'
        className={`flex min-h-screen w-full flex-col items-start justify-center px-4 pb-10 text-[#fffff56e]`}
      >
        <p className='mb-4 text-[20px] font-semibold md:text-[24px] lg:mb-8 xl:text-[30px]'>
          안녕하세요.
        </p>
        <h1 className='mb-6 text-5xl font-bold text-main md:text-[60px] xl:mb-10 xl:text-[108px]'>
          강현우 입니다.
        </h1>
        <p className='text-[20px] font-semibold md:text-[20px] xl:text-[36px] xl:leading-tight'>
          저는 사용자 경험을 최적화하고, 인터페이스를 직관적으로만드는
        </p>
        <p className='mb-2 text-[20px] font-semibold md:mb-10 md:text-[20px] xl:text-[36px] xl:leading-tight'>
          <strong className='font-bold text-main'>프론트엔드</strong>를 담당하고
          있습니다.
        </p>
        <p className='text-md mb-2 font-medium leading-6 text-[#fffff56e] xl:text-[22px]'></p>
        <p className='text-md mb-20 font-medium leading-6 xl:text-[22px]'>
          제 포트폴리오를 방문해 주셔서 진심으로 감사드립니다.
        </p>
        <div className='mt-0 flex gap-3 xl:hidden'>
          {linkIconList.map((menu, index) => (
            <LinkIconMenu link={menu.link} icon={menu.icon} key={index} />
          ))}
        </div>
        <div
          onClick={() => {
            scrollToSection('About');
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
      <AboutSection />
      <ExperienceSection />
      <SkillSection />
      <ProjectSection />
    </main>
  );
};

export default Home;
