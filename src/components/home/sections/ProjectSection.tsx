import { projectList } from '@/data/project';
import ProjectCard from '@/components/home/card/projectCard';

const ProjectSection = () => {
  return (
    <>
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
          mainUrl={project.mainUrl}
          align={index % 2 == 0 ? 'left' : 'right'}
        />
      ))}
    </>
  );
};

export default ProjectSection;
