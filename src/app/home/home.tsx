import { useState } from 'react';

const Home = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className='h-[100vh] w-full bg-[#052631]'>
        <div className='pt-[40px]'>
          <div
            className={`fixed inset-0 flex items-center justify-center transition-all duration-1000 ${
              isClicked
                ? 'translate-y-[-42%] text-2xl'
                : 'translate-y-0 text-5xl'
            }`}
          >
            <div
              className='flex cursor-pointer justify-center gap-2 text-center font-bold text-white'
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              onClick={() => setIsClicked(true)} // 클릭 시 상태 변경
            >
              <p>{'<'}</p>
              <p className='text-[#66d9ed]'>KangHyunWoo</p>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isOpen ? 'max-w-full' : 'max-w-0'
                }`}
              >
                <p className='whitespace-nowrap text-[#6de58b]'>
                  {'onClick={ intro }'}
                </p>
              </div>
              <p>{'/>'}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
