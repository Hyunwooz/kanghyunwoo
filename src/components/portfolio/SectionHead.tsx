import { GRID } from './grid';

interface SectionHeadProps {
  title: string;
  note?: string;
}

// 섹션 머리. 먹색 가는 선 아래에 제목 / 오른쪽 짧은 설명. 둘 다 선 바로 아래(위쪽)에 맞춘다.
const SectionHead = ({ title, note }: SectionHeadProps) => {
  return (
    <header data-reveal className={`${GRID} items-start border-t border-quiet-ink pb-12 pt-7 md:pb-16 md:pt-8`}>
      <h2 className='col-span-12 text-[28px] font-medium leading-[1.1] tracking-[-0.02em] md:col-span-7 md:text-[40px]'>
        {title}
      </h2>
      {note && (
        <p className='col-span-12 mt-3 break-keep text-[14px] leading-[1.6] text-quiet-mute md:col-span-4 md:col-start-9 md:mt-0 md:pt-0.5 md:text-right'>
          {note}
        </p>
      )}
    </header>
  );
};

export default SectionHead;
