import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ProjectCardProps {
  name: string;
  githubUrl?: string;
  siteUrl?: string;
  thumbnail: string;
  role: string;
  period: string;
  decs: string;
  skillStacks: string[];
  align: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  siteUrl,
  githubUrl,
  thumbnail,
  role,
  period,
  decs,
  skillStacks,
  align,
}) => {
  const mergeStyle = () => {
    if (align === 'right') {
      return 'lg:flex-row-reverse';
    } else {
      return 'lg:flex-row';
    }
  };

  const alignStyle = twMerge('relative flex flex-col-reverse', mergeStyle());

  return (
    <div className='mb-10'>
      <div className={alignStyle}>
        <div
          className={`z-10 flex h-2/5 w-full flex-col ${align === 'right' ? 'items-end' : 'items-start'} justify-start rounded-md lg:h-[270px] lg:w-7/12`}
        >
          <div className='mb-1 flex items-center gap-1'>
            <h3 className='mr-2 block text-2xl font-semibold md:text-3xl'>
              {name}
            </h3>
            {siteUrl ? (
              <Link
                href={siteUrl}
                target='_blank'
                className='duration-400 mr-1 h-5 w-5 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
              >
                <Icon icon='akar-icons:link-out' width={20} height={20} />
              </Link>
            ) : (
              <></>
            )}
            {githubUrl ? (
              <Link
                href={githubUrl}
                target='_blank'
                className='duration-400 h-5 w-5 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
              >
                <Icon icon='akar-icons:github-fill' width={20} height={20} />
              </Link>
            ) : (
              <></>
            )}
          </div>
          <h4 className='text-base font-semibold xl:text-lg'>{role}</h4>
          <h4 className='mb-4 text-sm font-medium xl:text-base'>{period}</h4>
          <div
            className={`z-10 mb-4 rounded border border-light bg-[#092509] bg-opacity-85 p-4 font-medium text-light`}
          >
            <p>{decs}</p>
          </div>
        </div>
        <Image
          className={`static ${align === 'right' ? 'left-0' : 'right-0'} bottom-0 mb-4 h-3/5 w-full cursor-pointer rounded-md border object-cover transition-all duration-300 hover:scale-105 lg:absolute lg:mb-0 lg:h-[270px] lg:w-7/12`}
          src={thumbnail}
          alt={name}
          width={400}
          height={270}
        ></Image>
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        {skillStacks.map((stack, index) => (
          <div
            key={index}
            className='rounded-md bg-main px-1 font-semibold text-background'
          >
            {stack}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
