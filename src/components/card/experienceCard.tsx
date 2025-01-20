import { ExperienceSkillBadge } from '../badge/skillBadge';

interface ExperienceCardProps {
  name: string;
  decs: string;
  role?: string;
  period: string;
  works: string[];
  skillStacks: string[];
  styleClasses?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  name,
  decs,
  role = '',
  period,
  works,
  skillStacks,
  styleClasses,
}) => {
  return (
    <div className={styleClasses}>
      <h3 className='mb-1 block border-b border-light pb-2 text-2xl font-semibold md:text-3xl'>
        {name}
      </h3>
      <p className='mb-2 text-base font-normal md:mb-4 md:text-lg'>{decs}</p>
      <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
        <div className='flex w-full items-center gap-4 md:block md:w-3/12 xl:w-1/3'>
          {role ? (
            <h4 className='text-sm font-bold md:mb-2 xl:text-lg'>{role}</h4>
          ) : (
            <></>
          )}
          <p className='text-sm font-semibold xl:text-base'>{period}</p>
        </div>
        <div className='w-full md:w-9/12 md:px-2 xl:w-2/3'>
          <ul className='flex list-inside list-disc flex-col gap-1'>
            {works.map((work, index) => (
              <li key={index}>{work}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-4 flex flex-wrap gap-x-1 gap-y-2'>
        {skillStacks.map((value, index) => (
          <ExperienceSkillBadge key={index} title={value} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
