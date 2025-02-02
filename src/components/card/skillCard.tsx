import Image from 'next/image';
import { SkillCardProps } from '@/shared/types/skills';

const SkillCard = ({ src, alt, desc }: SkillCardProps) => {
  return (
    <div className='flex py-2'>
      <div className='mr-3 flex w-[50px] items-start justify-center'>
        <Image
          src={src}
          alt={alt}
          className='rounded-full border-2 border-normal'
          width={50}
          height={50}
        />
      </div>
      <div className='w-full'>
        <p className='rounded text-base font-bold'>{alt}</p>
        <p className='rounded text-sm'>{desc}</p>
      </div>
    </div>
  );
};

export default SkillCard;
