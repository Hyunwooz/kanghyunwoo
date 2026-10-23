import Image from 'next/image';
import Link from 'next/link';
import type { ArchivePhoto } from '@/shared/types/archive';
import Label from './Label';

interface StepAsideProps {
  photo: ArchivePhoto;
}

// ( 라벨 ) | 짧은 문단 | 오른쪽 카드 — 3단 그리드
const StepAside = ({ photo }: StepAsideProps) => {
  return (
    <section className='grid grid-cols-12 gap-x-4 gap-y-10 px-4 py-24 md:px-6 md:py-40'>
      <div className='col-span-12 md:col-span-2'>
        <Label>a step aside</Label>
      </div>
      <p className='col-span-12 max-w-[34ch] break-keep text-[15px] leading-[1.45] md:col-span-4 md:text-base'>
        이미 이미지가 넘치는 세상에서 귀한 건 또렷함이라고 생각해요.
        그래서 무엇을 만들든 더하기보다 덜어내는 쪽을 고릅니다.
      </p>
      <Link
        href='/archive'
        className='group relative col-span-12 aspect-[16/10] overflow-hidden rounded-sm bg-ink/5 md:col-span-4 md:col-start-9'
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes='(min-width: 768px) 33vw, 100vw'
          className='object-cover transition-transform duration-700 group-hover:scale-[1.03]'
        />
        <span className='absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.12em] text-paper'>
          archive ↗
        </span>
      </Link>
    </section>
  );
};

export default StepAside;
