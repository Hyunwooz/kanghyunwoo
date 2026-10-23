import GlossyObject from './GlossyObject';
import Label from './Label';

// TODO: 실제 문구로 교체
const sides = [
  {
    title: 'By day :',
    items: ['코드로 화면을 짭니다', '덜어낸 인터페이스를 좋아해요', '느리더라도 끝까지'],
  },
  {
    title: 'By light :',
    items: ['골목과 흐린 날의 빛', '아무도 앉지 않은 자리', '오래 보고 싶은 순간'],
  },
];

// ( the person ) — 강현우 소개 (noth.in 의 Studio 구간)
const Person = () => {
  return (
    <section className='px-4 py-24 md:px-6 md:py-40'>
      <div className='grid grid-cols-12 gap-x-4 gap-y-10'>
        <div className='col-span-12 md:col-span-2'>
          <Label>the person</Label>
        </div>
        <p className='col-span-12 max-w-[30ch] break-keep text-[22px] font-medium leading-[1.3] tracking-[-0.02em] md:col-span-6 md:col-start-6 md:text-[28px]'>
          화면을 만드는 일과 장면을 남기는 일. 둘은 다른 일 같지만, 결국 ‘무엇을
          남기고 무엇을 덜어낼까’를 고르는 같은 일이라고 생각해요.
        </p>
      </div>

      <div className='mt-24 grid grid-cols-12 items-end gap-x-4 gap-y-10 md:mt-40'>
        <div className='col-span-6 md:col-span-2'>
          <GlossyObject shape='blob' tone='chrome' className='w-full' />
          <p className='mt-4 text-sm'>or something unexpected.</p>
        </div>
        <h2 className='col-span-12 break-keep text-[40px] font-normal leading-[1.05] tracking-[-0.03em] md:col-span-8 md:col-start-5 md:text-[80px]'>
          Slow, but
          <br />
          steady<span className='text-accent'>.</span>
        </h2>
      </div>

      <div className='mt-20 grid grid-cols-12 gap-x-4 gap-y-10 md:mt-32'>
        {sides.map((side) => (
          <div
            key={side.title}
            className='col-span-12 grid grid-cols-2 gap-4 md:col-span-5 md:odd:col-start-3'
          >
            <span className='text-[15px] md:text-base'>{side.title}</span>
            <ul className='list-disc pl-4 text-[15px] leading-[1.5] md:text-base'>
              {side.items.map((item) => (
                <li key={item} className='break-keep'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Person;
