import { SkillBadge } from '../badge/skillBadge';

interface ExperienceCardProps {
  name: string;
  decs: string;
  role?: string;
  period: string;
  works: string[];
  skillStacks: string[];
  styleClasses?: string;
}

const ExperienceCard = ({
  name,
  decs,
  role = '',
  period,
  works,
  skillStacks,
  styleClasses,
}: ExperienceCardProps) => {
  return (
    <div className={styleClasses}>
      <h3 className='mb-1 block text-2xl font-semibold md:text-4xl lg:mb-3'>
        {name}
      </h3>
      <p className='mb-2 border-b border-main pb-3 text-[16px] font-normal md:mb-5 md:text-xl'>
        {decs}
      </p>
      <div className='flex flex-col gap-4 md:flex-row md:justify-between md:gap-0'>
        <div className='flex w-full flex-col items-start justify-between gap-4 md:w-5/12 lg:pb-3 xl:w-1/2'>
          <div className='flex gap-2 lg:flex-col lg:gap-0'>
            {role && (
              <h4 className='text-sm font-bold lg:mb-2 xl:text-lg'>{role}</h4>
            )}
            <p className='text-sm font-semibold xl:text-base'>{period}</p>
          </div>
          <div className='mt-6 hidden flex-wrap gap-x-1 gap-y-2 lg:flex'>
            {skillStacks.map((value, index) => (
              <SkillBadge key={index} title={value} />
            ))}
          </div>
        </div>
        <div className='w-full rounded-[5px] py-2 md:w-7/12 md:px-4 lg:px-2 xl:w-8/12 2xl:w-1/2'>
          <ul className='flex list-inside list-disc flex-col gap-1 text-base font-medium lg:text-lg'>
            {works.map((work, index) => (
              <li key={index}>{work}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-6 flex flex-wrap gap-x-1 gap-y-2 lg:hidden'>
        {skillStacks.map((value, index) => (
          <SkillBadge key={index} title={value} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
