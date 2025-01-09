import { useState, useEffect } from 'react';

const Home = () => {
  const [visibleChars, setVisibleChars] = useState(0); // 현재 보이는 글자 수
  const [isClicked, setIsClicked] = useState(false);

  const textParts = [
    { content: ' ', color: 'text-white' },
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
    { content: ' ', color: 'text-white' },
  ];

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

  return (
    <>
      <section className='relative h-[100vh] w-full bg-[#052631]'>
        <div className='pt-[40px]'>
          <div
            className={`absolute inset-0 flex cursor-pointer items-center justify-center font-bold transition-all duration-1000 ${
              isClicked
                ? 'translate-y-[-42%] text-2xl' // 위로 이동하면서 크기 감소
                : 'translate-y-0 text-6xl' // 원래 위치와 크기
            }`}
            onClick={() => setIsClicked(true)}
          >
            <p className='text-white'>{'<'}</p>
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
            <p className='text-white'>{'>'}</p>
          </div>
        </div>
      </section>
      {/* <section className='h-[100vh] w-full bg-[#052631]'>
        <div className='pt-[40px]'>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
              isClicked
                ? 'translate-y-[-42%] text-2xl'
                : 'translate-y-0 text-5xl'
            }`}
          >
            <div
              className='flex cursor-pointer justify-center gap-2 text-center font-bold text-white'
              onClick={() => setIsClicked(true)} // 클릭 시 상태 변경
            >
              <p>{'<'}</p>
              <p className='text-[#66d9ed]'>KangHyunWoo</p>
              <div className={`'max-w-full overflow-hidden`}>
                <p className='whitespace-nowrap text-[#6de58b]'>
                  {'onClick={ intro }'}
                </p>
              </div>
              <p className='text-[#BB77FF]'>{'/'}</p>
              <p>{'>'}</p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
