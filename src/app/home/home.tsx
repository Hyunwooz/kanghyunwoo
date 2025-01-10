import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const Home = () => {
  const [visibleChars, setVisibleChars] = useState(0); // 현재 보이는 글자 수
  const [isClicked, setIsClicked] = useState(false);
  const [activeSection, setActiveSection] = useState(''); // 현재 활성화된 섹션 ID

  const textParts = [
    { content: ' ' },
    { content: 'o', color: 'text-[#6de58b]' },
    { content: 'n', color: 'text-[#6de58b]' },
    { content: 'C', color: 'text-[#6de58b]' },
    { content: 'l', color: 'text-[#6de58b]' },
    { content: 'i', color: 'text-[#6de58b]' },
    { content: 'c', color: 'text-[#6de58b]' },
    { content: 'k', color: 'text-[#6de58b]' },
    { content: '=', color: 'text-[#6de58b]' },
    { content: '{', color: 'text-[#6de58b]' },
    { content: 'i', color: 'text-[#6de58b]' },
    { content: 'n', color: 'text-[#6de58b]' },
    { content: 't', color: 'text-[#6de58b]' },
    { content: 'r', color: 'text-[#6de58b]' },
    { content: 'o', color: 'text-[#6de58b]' },
    { content: '}', color: 'text-[#6de58b]' },
    { content: ' ' },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id); // 이동할 섹션의 ID
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // 부드럽게 스크롤
    }
  };

  const setConsoleLog = () => {
    const cssRule = 'font-size:16px; font-family:Nanum Gothic';
    const cssRule2 =
      'font-size:24px; font-family:Nanum Gothic; font-weight: 600; color: #d9730d';
    const cssRule3 =
      'font-size:18px; font-family:Nanum Gothic; font-weight: 600;';
    const cssLogo1 =
      'color:#39549a;' +
      'font-size: 60px;' +
      'font-weight: bold;' +
      'letter-space:-1px;' +
      'font-family:Tahoma,Arial,sans-serif';
    const cssLogo2 =
      'color:#231916;' +
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
          `%c안녕하세요. 주니어 프론트 엔드 개발자 강현우입니다\n\n%cContact\n\n%cPhone : 010-2825-0481\nEmail : gusdn0481@gmail.com\n\n%cChannel\n\n%cGithub : https://github.com/hyunwooz\n`,
          cssRule3,
          cssRule2,
          cssRule,
          cssRule2,
          cssRule,
        ),
        50,
      );
    }
  };

  useEffect(() => {
    setConsoleLog();
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
      { threshold: 0.9 }, // 50% 이상 보이면 트리거
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id='About'
        className='relative min-h-[100vh] w-full pb-[80px] pt-[50px]'
      >
        <div
          onClick={() => scrollToSection('Experience')}
          className='absolute bottom-0 mb-3 flex w-full cursor-pointer flex-col items-center justify-center text-xs font-bold md:mb-4 md:text-xl'
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
        <div
          className={`z-10 mb-[40px] items-center justify-center pl-4 text-start transition-all duration-1000 md:fixed md:bottom-0 md:pl-[60px] lg:pl-[100px] xl:pl-[160px] 2xl:pl-[270px] ${
            isClicked
              ? 'opacity-100 md:translate-y-[-50%] lg:translate-y-[-12%] xl:translate-y-[-23%]'
              : 'translate-y-0 opacity-0'
          }`}
        >
          <p className='mb-1 text-5xl font-bold md:text-[72px] xl:mb-4 xl:text-[100px]'>
            강현우
          </p>
          <p className='mb-4 text-lg font-semibold xl:text-[36px]'>
            FRONT-END DEVELOPER
          </p>
          <p className='mb-10 text-sm font-medium md:mb-12 xl:text-[18px]'>
            안녕하세요. 본질에 집중하는 프론트 엔드 개발자 강현우입니다.
          </p>
          <div
            className={`mb-4 hidden items-center gap-4 md:flex ${
              activeSection === 'About' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className='h-[2px] w-[80px] bg-white'></div>
            <p className='text-sm font-medium xl:text-[18px]'>About</p>
          </div>
          <div
            className={`mb-4 hidden items-center gap-4 md:flex ${
              activeSection === 'Experience' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className='h-[2px] w-[80px] bg-white'></div>
            <p className='text-sm font-medium xl:text-[18px]'>Experience</p>
          </div>
          <div
            className={`mb-4 hidden items-center gap-4 md:flex ${
              activeSection === 'Projects' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className='h-[2px] w-[80px] bg-white'></div>
            <p className='text-sm font-medium xl:text-[18px]'>Projects</p>
          </div>
          <div className='mt-0 flex gap-2 md:mt-60'>
            <Icon icon='akar-icons:github-fill' width={26} height={26} />
            <Icon icon='ri:instagram-fill' width={26} height={26} />
            <Icon icon='pajamas:linkedin' width={26} height={26} />
          </div>
        </div>
        <div
          className={`right-0 top-[16%] items-center justify-center px-4 text-start text-sm font-medium transition-all duration-1000 md:absolute md:bottom-0 md:mt-0 md:w-5/12 md:pr-[60px] lg:pr-[100px] xl:pr-[160px] 2xl:pr-[270px] ${
            isClicked
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[30%] opacity-0'
          }`}
        >
          <h2 className='mb-[30px] text-[24px] font-bold md:mb-10 xl:text-[32px]'>
            About
          </h2>
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
          <p className='mb-6 md:mb-4 xl:text-[18px]'>
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
            searching for Korok seeds Korokseeds.`}
          </p>
        </div>
        <div
          className={`absolute top-[10px] z-20 flex w-full items-center justify-center font-bold transition-all duration-1000 md:top-[38%] ${
            isClicked
              ? 'text-md cursor-normal md:translate-y-[-1020%] md:text-2xl lg:translate-y-[-840%] xl:translate-y-[-920%]'
              : 'translate-y-[830%] cursor-pointer text-xl sm:text-3xl md:translate-y-0 md:text-4xl xl:text-6xl'
          }`}
          onClick={() => setIsClicked(true)}
        >
          <p>{'<'}</p>
          <p className='text-[#66d9ed]'>KangHyunWoo</p>
          {textParts.map((part, index) => (
            <span
              key={index}
              className={`inline-block overflow-hidden ${
                index < visibleChars
                  ? 'max-w-full opacity-100'
                  : 'max-w-0 opacity-0'
              } ${part.color}`}
            >
              {part.content === ' ' ? '\u00A0' : part.content}
            </span>
          ))}
          <p className='text-[#BB77FF]'>{'/'}</p>
          <p>{'>'}</p>
        </div>
      </section>
      <section
        id='Experience'
        className='relative h-[100vh] w-full bg-[#1a191d]'
      >
        <div
          onClick={() => scrollToSection('Projects')}
          className='absolute bottom-0 mb-3 flex w-full cursor-pointer flex-col items-center justify-center text-xs font-bold md:mb-4 md:text-xl'
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
        <div
          className={`right-0 top-[16%] items-center justify-center px-4 text-start text-sm font-medium transition-all duration-1000 md:absolute md:bottom-0 md:mt-0 md:w-5/12 md:pr-[60px] lg:pr-[100px] xl:pr-[160px] 2xl:pr-[270px] ${
            isClicked
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[30%] opacity-0'
          }`}
        >
          <h2 className='mb-[30px] text-[24px] font-bold md:mb-10 xl:text-[32px]'>
            Experience
          </h2>
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
      </section>
      <section id='Projects' className='relative h-[100vh] w-full bg-[#0a3629]'>
        <div
          onClick={() => scrollToSection('About')}
          className='absolute bottom-0 mb-3 flex w-full cursor-pointer flex-col items-center justify-center text-xs font-bold md:mb-4 md:text-xl'
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
              d='M13 30L25 18L37 30'
            />
          </svg>
          <p>Scroll</p>
        </div>
        <div
          className={`right-0 top-[16%] items-center justify-center px-4 text-start text-sm font-medium transition-all duration-1000 md:absolute md:bottom-0 md:mt-0 md:w-5/12 md:pr-[60px] lg:pr-[100px] xl:pr-[160px] 2xl:pr-[270px] ${
            isClicked
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[30%] opacity-0'
          }`}
        >
          <h2 className='mb-[30px] text-[24px] font-bold md:mb-10 xl:text-[32px]'>
            Projects
          </h2>
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
      </section>
    </>
  );
};

export default Home;
