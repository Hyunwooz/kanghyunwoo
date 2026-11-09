import { GRID } from './grid';

interface SectionHeadProps {
  no: string;
  title: string;
  note?: string;
}

// 섹션 머리. 옐로 번호 스티커 + 크림 디스플레이 제목(남색 외곽선) + 오른쪽 짧은 설명.
const SectionHead = ({ no, title, note }: SectionHeadProps) => {
  return (
    <header data-reveal className={`${GRID} items-end border-t-[3px] border-retro-ink pb-10 pt-6 md:pb-14 md:pt-8`}>
      <span className='col-span-12 flex md:col-span-1'>
        <span className='retro-card-sm inline-flex h-10 w-10 -rotate-6 items-center justify-center bg-retro-yellow font-display text-[14px] md:h-12 md:w-12 md:text-[16px]'>
          {no}
        </span>
      </span>
      <h2 className='retro-stroke col-span-12 mt-4 font-display text-[40px] uppercase leading-[0.95] tracking-[0.01em] text-retro-cream md:col-span-6 md:mt-0 md:text-[64px]'>
        {title}
      </h2>
      {note && (
        <p className='col-span-12 mt-4 max-w-[30em] break-keep font-medium text-[14px] leading-[1.6] text-retro-ink/80 md:col-span-5 md:col-start-8 md:mt-0 md:text-right md:text-[15px]'>
          {note}
        </p>
      )}
    </header>
  );
};

export default SectionHead;
