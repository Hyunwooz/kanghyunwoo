import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

// 유틸 함수 분리
import { scrollToSection } from '@/shared/utils/scroll';

// 데이터 분할 관리
import { sectionList } from '@/data/section';
import { textParts } from '@/data/textParts';

// 컴포넌트
import SkillSection from '@/components/main/skillSection';

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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!isClicked) {
  //       setIsClicked(true);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [isClicked]);

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
      { threshold: 0.9 }, // 90% 이상 보이면 트리거
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
      <div
        className={`z-10 mb-[40px] items-center justify-center px-4 pt-12 text-start transition-all duration-1000 md:fixed md:top-0 md:w-[44%] md:pl-[60px] md:pt-0 lg:pl-[100px] xl:pl-[160px] 2xl:pl-[270px] ${
          isClicked
            ? 'translate-y-0 opacity-100 md:translate-y-[64px] lg:translate-y-[78px] xl:translate-y-[94px]'
            : 'translate-y-[100%] opacity-0 md:translate-y-[210px]'
        }`}
      >
        <p className='mb-3 text-5xl font-bold md:text-[60px] xl:mb-6 xl:text-[88px]'>
          강현우
        </p>
        {/* <p className='mb-4 text-lg font-semibold xl:text-[36px]'>
            FRONT-END DEVELOPER
          </p> */}
        <p className='text-md mb-1 font-medium leading-6 md:mb-2 xl:text-[18px]'>
          사용자 경험을 중심으로 직관적이고 창의적인 웹 서비스를 만드는
          프론트엔드의 매력에 빠져있습니다.
        </p>
        <p className='text-md mb-8 font-medium leading-6 md:mb-6 xl:text-[18px]'>
          사용자의 피드백을 즉각적으로 반영하여여 웹 애플리케이션에 가치를
          더하는 과정에서 큰 보람을 느낍니다.
        </p>
        <p className='text-md mb-10 font-medium md:mb-12 xl:text-[18px]'>
          이 사이트를 방문해 주셔서 진심으로 감사드립니다.
        </p>
        {sectionList.map((section, index) => (
          <div
            key={index}
            className={`mb-4 hidden w-[200px] cursor-pointer items-center gap-4 hover:opacity-100 md:flex ${
              activeSection === section.name ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => scrollToSection(section.name)}
          >
            <div
              className={`h-[2px] transition-all duration-300 ease-in-out ${activeSection === section.name ? 'w-[80px]' : 'w-[40px]'} bg-light`}
            ></div>
            <p className='text-sm font-medium xl:text-[18px]'>{section.name}</p>
          </div>
        ))}
        <div className='mt-0 flex gap-3 md:mt-60'>
          <Link
            href={'https://github.com/hyunwooz'}
            className='duration-400 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
          >
            <Icon icon='akar-icons:github-fill' width={26} height={26} />
          </Link>
          <Link
            href={'https://www.instagram.com/wooh.dev/'}
            className='duration-400 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
          >
            <Icon icon='ri:instagram-fill' width={26} height={26} />
          </Link>
          <Link
            href={'https://www.linkedin.com/in/woohyundev/'}
            className='duration-400 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
          >
            <Icon icon='pajamas:linkedin' width={26} height={26} />
          </Link>
        </div>
      </div>
      <section
        id='About'
        className='relative min-h-[80vh] w-full pb-10 pt-8 md:min-h-screen md:pb-[80px] md:pt-[50px]'
      >
        <div
          className={`flex flex-col items-start justify-center text-start text-sm transition-all duration-1000 md:items-end ${
            isClicked
              ? 'mb-[30px] opacity-100 md:translate-y-[16px] lg:translate-y-[30px] xl:translate-y-[50px]'
              : 'translate-y-[30%] opacity-0'
          }`}
        >
          <div className='px-0 md:mt-0 md:w-5/12 md:pr-[60px] lg:pr-[100px] xl:pr-[160px] 2xl:pr-[270px]'>
            <h2
              className={`sticky top-0 mb-[30px] w-full bg-deep p-4 text-[32px] font-bold sm:static sm:p-0 md:mb-16 xl:text-[48px]`}
            >
              About
            </h2>
            <div className='px-4 sm:p-0'>
              <h3 className='mb-4 bg-light px-2 py-2 text-[18px] font-semibold text-deep md:text-[20px] xl:text-[24px]'>
                [ 프론트엔드 개발 ]
              </h3>
              <p className='mb-6 font-light leading-6 md:mb-12 xl:text-[18px]'>
                비전공자로 웹 개발 공부를 시작한 후, 현재는 프론트엔드 개발을
                담당하고 있습니다. 처음에는 Python을 활용해 반복적인 업무를
                자동화하며 개발에 흥미를 느꼈고, 그 후 프론트엔드 분야로 관심을
                확장하게 되었습니다. 사용자 경험을 최우선으로 고려하며,
                직관적이고 효율적인 웹 인터페이스를 구현하는 것에 큰 보람을
                느끼고 있습니다.
              </p>
              <h3 className='mb-4 rounded bg-light px-2 py-2 text-[18px] font-semibold text-deep md:text-[20px] xl:text-[24px]'>
                [ 성장에 대한 즐거움 ]
              </h3>
              <p className='mb-6 font-light leading-6 md:mb-12 xl:text-[18px]'>
                새로운 프로젝트를 시작할 때마다 단순히 이전에 사용하던 기술을
                활용하는 것이 아닌, 이전 프로젝트에서 아쉬웠던 부분을 개선하고
                새로운 코드 스타일이나 기술을 적용하는 것에 큰 즐거움을
                느낍니다. 이는 개발에 있어서 성장을 위한 동기가 되어주고 있으며,
                점점 더 나은 개발자로 나아가는 과정에서 큰 성취감을 얻고
                있습니다.
              </p>
              <h3 className='mb-4 rounded bg-light px-2 py-2 text-[18px] font-semibold text-deep md:text-[20px] xl:text-[24px]'>
                [ 안되면 될 때까지 ]
              </h3>
              <p className='font-light leading-6 xl:text-[18px]'>
                프론트엔드 개발을 혼자 진행하고 있습니다. 이 과정에서 모든 것을
                스스로 찾아내고 해결해야 했기 때문에, 때론 기능 구현에 며칠이
                걸리기도 했습니다. 하지만 이런 과정을 통해 개발에 있어서{' '}
                {`"해결할 수 없는 문제는 없다"`}는 확신을 가지게 되었습니다.
                이로써, 자신에게 부여된 책임을 끝까지 완수할 수 있는 끈기를 얻게
                되었습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id='Skills'
        className='relative min-h-[80vh] w-full md:h-[100vh]'
      >
        <div
          className={`flex flex-col items-start justify-center text-start text-sm font-medium transition-all duration-1000 md:items-end ${
            isClicked
              ? 'mb-[60px] opacity-100 sm:translate-y-[96px]'
              : 'translate-y-[30%] opacity-0'
          }`}
        >
          <div className='pt-10 sm:pt-0 md:mt-0 md:w-5/12 md:pr-[60px] lg:pr-[100px] xl:pr-[160px] 2xl:pr-[270px]'>
            <h2
              className={`sticky top-0 mb-[30px] w-full bg-deep p-4 text-[32px] font-bold sm:static sm:p-0 md:mb-16 xl:text-[48px]`}
            >
              Skills
            </h2>
            <div className='px-4 sm:p-0'>
              <SkillSection />
            </div>
          </div>
        </div>
      </section>
      <section
        id='Experience'
        className='relative h-[100vh] min-h-[80vh] w-full md:h-[100vh]'
      >
        <div
          className={`flex flex-col items-start justify-center text-start text-sm font-medium transition-all duration-1000 md:items-end ${
            isClicked
              ? 'mb-[60px] opacity-100 sm:translate-y-[96px]'
              : 'translate-y-[30%] opacity-0'
          }`}
        >
          <div className='pt-10 sm:pt-0 md:mt-0 md:w-5/12 md:pr-[60px] lg:pr-[100px] xl:pr-[160px] 2xl:pr-[270px]'>
            <h2
              className={`sticky top-0 mb-[30px] w-full bg-deep p-4 text-[32px] font-bold sm:static sm:p-0 md:mb-16 xl:text-[48px]`}
            >
              Experience
            </h2>
            <div className='px-4 sm:p-0'>
              <p className='mb-6 md:mb-4 xl:text-[18px]'>
                {`I’m a developer passionate about crafting accessible, pixel-perfect
            user interfaces that blend thoughtful design with robust
            engineering. My favorite work lies at the intersection of design and
            development, creating experiences that not only look great but are
            meticulously built for performance and usability.`}
              </p>
              <p className='mb-6 md:mb-4 xl:text-[18px]'>
                {`Currently, I'm a
            Senior Front-End Engineer at Klaviyo, specializing in accessibility.
            I contribute to the creation and maintenance of UI components that
            power Klaviyo’s frontend, ensuring our platform meets web
            accessibility standards and best practices to deliver an inclusive
            user experience. `}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id='Projects'
        className='relative h-[100vh] min-h-[80vh] w-full md:h-[100vh]'
      >
        <div
          className={`flex flex-col items-start justify-center text-start text-sm font-medium transition-all duration-1000 md:items-end ${
            isClicked
              ? 'mb-[60px] opacity-100 sm:translate-y-[96px]'
              : 'translate-y-[30%] opacity-0'
          }`}
        >
          <div className='pt-10 md:mt-0 md:w-5/12 md:pr-[60px] lg:pr-[100px] xl:pr-[160px] 2xl:pr-[270px]'>
            <h2
              className={`sticky top-0 mb-[30px] w-full bg-deep p-4 text-[32px] font-bold sm:static sm:p-0 md:mb-16 xl:text-[48px]`}
            >
              Projects
            </h2>
            <div className='px-4 sm:p-0'>
              <p className='mb-10 md:mb-4 xl:text-[18px]'>
                {`In the past, I've had the opportunity to develop
                software across a variety of settings — from advertising agencies
                and large corporations to start-ups and small digital product
                studios. Additionally, I also released a comprehensive video course
                a few years ago, guiding learners through building a web app with
                the Spotify API.`}
              </p>
              <p className='xl:text-[18px]'>
                {`In my spare time, I’m usually climbing, reading,
                hanging out with my wife and two cats, or running around Hyrule
                searching for Korok seeds K o r o k s e e d s .`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
