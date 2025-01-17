import Image from 'next/image';
import { SkillCardProps } from '@/shared/types/skills';

const SkillCard: React.FC<SkillCardProps> = ({ src, alt }) => {
  return (
    <div className='group relative cursor-pointer'>
      <Image
        src={src}
        alt={alt}
        className='rounded-full border-2 border-normal'
        width={50}
        height={50}
      />
      <p className='absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-full rounded bg-light p-2 text-sm text-deep shadow-lg group-hover:flex'>
        {alt}
      </p>
    </div>
  );
};

export default SkillCard;
