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
      <section id='About' className='relative h-[100vh] w-full'>
        <div
          onClick={() => scrollToSection('Experience')}
          className='absolute bottom-0 mb-10 flex w-full cursor-pointer flex-col items-center justify-center text-xs font-bold md:mb-20 md:text-xl'
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
          className={`absolute bottom-[20%] z-10 items-center justify-center px-4 text-start transition-all duration-1000 md:fixed md:bottom-0 md:px-[100px] xl:px-[300px] ${
            isClicked
              ? 'translate-y-[-145%] opacity-100 md:translate-y-[-30%]'
              : 'translate-y-0 opacity-0'
          }`}
        >
          <p className='mb-1 text-5xl font-bold xl:mb-4 xl:text-[100px]'>
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
          className={`absolute top-[36%] z-20 flex w-full items-center justify-center font-bold transition-all duration-1000 md:top-[38%] ${
            isClicked
              ? 'text-md cursor-normal translate-y-[-920%] md:text-2xl'
              : 'translate-y-0 cursor-pointer text-xl sm:text-3xl md:text-4xl xl:text-6xl'
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
          className='absolute bottom-0 mb-10 flex w-full cursor-pointer flex-col items-center justify-center text-xs font-bold md:mb-20 md:text-xl'
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
      <section id='Projects' className='relative h-[100vh] w-full bg-[#0a3629]'>
        <div
          onClick={() => scrollToSection('About')}
          className='absolute bottom-0 mb-10 flex w-full cursor-pointer flex-col items-center justify-center text-xs font-bold md:mb-20 md:text-xl'
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
      </section>
    </>
  );
};

export default Home;
