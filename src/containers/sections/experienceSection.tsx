import { experienceList } from '@/data/experience';
import ExperienceCard from '@/components/card/experienceCard';

const ExperienceSection = () => {
  return (
    <>
      {experienceList.map((exp, index) => (
        <ExperienceCard
          key={index}
          role={exp.role}
          name={exp.name}
          decs={exp.decs}
          period={exp.period}
          skillStacks={exp.skillStacks}
          works={exp.works}
          styleClasses='mb-20 '
        />
      ))}
    </>
  );
};

export default ExperienceSection;
