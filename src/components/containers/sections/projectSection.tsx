import SectionContainer from '../sectionContainer';
import { projectList } from '@/data/project';
import ProjectCard from '@/components/card/projectCard';

const ProjectSection = () => {
  return (
    <SectionContainer sectionTitle='Projects'>
      {projectList.map((project, index) => (
        <ProjectCard
          key={index}
          name={project.name}
          githubUrl={project.githubUrl}
          siteUrl={project.siteUrl}
          thumbnail={project.thumbnail}
          role={project.role}
          period={project.period}
          decs={project.decs}
          skillStacks={project.skillStacks}
          contribution={project.contribution}
          done={project.done}
          align={index % 2 == 0 ? 'left' : 'right'}
        />
      ))}
    </SectionContainer>
  );
};

export default ProjectSection;
