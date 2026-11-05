import { GRID } from './grid';

interface SectionHeadProps {
  no: string;
  title: string;
  note?: string;
}

// 섹션 머리. 굵은 선 + 번호 + 세리프 제목 + 오른쪽 짧은 설명.
const SectionHead = ({ no, title, note }: SectionHeadProps) => {
  return (
    <header data-reveal className={`${GRID} items-start border-t border-ink pb-10 pt-4 md:pb-14`}>
      <span className='col-span-2 pt-2 font-mono text-[12px] text-accent md:col-span-1 md:pt-4'>{no}</span>
      <h2 className='col-span-10 font-serif text-[40px] leading-[0.95] tracking-[-0.015em] md:col-span-5 md:text-[64px]'>
        {title}
      </h2>
      {note && (
        <p className='col-span-12 mt-4 max-w-[30em] self-end break-keep text-[14px] leading-[1.6] text-muted md:col-span-5 md:col-start-8 md:mt-0 md:text-[15px]'>
          {note}
        </p>
      )}
    </header>
  );
};

export default SectionHead;
