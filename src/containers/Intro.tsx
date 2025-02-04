import { useEffect, useState } from 'react';
import { textParts } from '@/data/textParts';
import { useClickedStore } from '@/store/useClick';

const Intro = () => {
  const [visibleChars, setVisibleChars] = useState(0);
  const { isClicked, setIsClicked } = useClickedStore();

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
    <div
      className={`fixed z-10 flex h-screen w-full items-center justify-center bg-background transition-all duration-1000 ${
        isClicked
          ? 'translate-y-[-100%] opacity-0'
          : 'translate-y-0 text-xl opacity-100'
      }`}
    >
      <div
        className={`flex w-full cursor-pointer items-center justify-center pb-32 font-bold sm:text-3xl md:translate-y-0 md:text-4xl xl:text-6xl`}
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
    </div>
  );
};

export default Intro;
