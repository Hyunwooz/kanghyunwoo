import Image from 'next/image';
import { SkillCardProps } from '@/shared/types/skills';

const SkillCard: React.FC<SkillCardProps> = ({ src, alt, desc }) => {
  return (
    <div className='flex pb-2'>
      <div className='mr-3 flex w-[50px] items-center justify-center'>
        <Image
          src={src}
          alt={alt}
          className='rounded-full border-2 border-normal'
          width={50}
          height={50}
        />
      </div>
      <div className='w-full'>
        <p className='rounded text-base font-bold text-main'>{alt}</p>
        <p className='rounded text-sm text-main'>{desc}</p>
      </div>
    </div>
  );
};

export default SkillCard;
