import SkillCard from './skillCard';
import { SkillCardProps } from '@/shared/types/skills';

interface SkillBoxProps {
  title: string;
  skills: SkillCardProps[];
}

const SkillBox: React.FC<SkillBoxProps> = ({ title, skills }) => {
  return (
    <div className='mb-8'>
      <h3 className='mb-6 text-xl font-semibold md:mb-4 xl:text-3xl'>
        {title}
      </h3>
      <div className='flex gap-3'>
        {skills.map((skill, index) => (
          <SkillCard key={index} src={skill.src} alt={skill.alt}></SkillCard>
        ))}
      </div>
    </div>
  );
};

export default SkillBox;
