import GlossyObject from './GlossyObject';

// 선언문 + 오브제 패널 (noth.in 의 "Most brands produce content." 구간)
const Manifesto = () => {
  return (
    <section className='px-4 pt-24 md:px-6 md:pt-40'>
      <h2 className='max-w-[14ch] break-keep text-[40px] font-normal leading-[1.05] tracking-[-0.03em] md:text-[80px]'>
        많이 만드는 것보다,
        <br />
        오래 남는 걸 만듭니다.
      </h2>

      <div className='relative mt-14 aspect-[16/10] overflow-hidden rounded-sm bg-ink md:mt-20 md:aspect-[2.2/1]'>
        <div className='absolute left-[14%] top-[22%] w-[22%] animate-float'>
          <GlossyObject shape='blob' tone='ink' className='w-full' />
        </div>
        <div className='absolute left-[38%] top-[30%] w-[30%] animate-float [animation-delay:-2s]'>
          <GlossyObject shape='sphere' tone='blue' className='w-full' />
        </div>
        <div className='absolute right-[10%] top-[40%] w-[24%] animate-float [animation-delay:-4s]'>
          <GlossyObject shape='ring' tone='chrome' className='w-full' />
        </div>
        <div className='absolute bottom-[12%] right-[36%] w-[10%] animate-float [animation-delay:-1s]'>
          <GlossyObject shape='pill' tone='chrome' className='w-full' />
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
