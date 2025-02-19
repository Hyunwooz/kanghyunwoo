import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { SkillBadge } from '../../common/badge/skillBadge';

interface ContributionType {
  type: string;
  percent: number;
}

interface ProjectCardProps {
  name: string;
  githubUrl?: string;
  siteUrl?: string;
  thumbnail: string;
  mainUrl?: string;
  role: string;
  contribution: ContributionType[];
  period: string;
  decs: string;
  done: string[];
  skillStacks: string[];
  align: string;
}

const ProjectCard = ({
  name,
  siteUrl,
  githubUrl,
  thumbnail,
  role,
  contribution,
  period,
  decs,
  skillStacks,
  align,
  done,
  mainUrl,
}: ProjectCardProps) => {
  const mergeStyle = () => {
    if (align === 'right') {
      return 'lg:flex-row-reverse';
    } else {
      return 'lg:flex-row';
    }
  };

  const alignStyle = twMerge('relative flex flex-col-reverse', mergeStyle());

  return (
    <div className='mb-20'>
      <div className={alignStyle}>
        <div
          className={`flex h-2/5 w-full flex-col items-start ${align === 'right' ? 'lg:items-end' : 'lg:items-start'} justify-start rounded-md lg:h-[370px] lg:w-3/5`}
        >
          <div className='mb-1 flex items-center gap-1'>
            <h3 className='mr-2 block text-2xl font-semibold md:text-3xl'>
              {name}
            </h3>
            {siteUrl && (
              <Link
                href={siteUrl}
                target='_blank'
                className='duration-400 mr-1 h-5 w-5 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
              >
                <Icon icon='akar-icons:link-out' width={20} height={20} />
              </Link>
            )}
            {githubUrl && (
              <Link
                href={githubUrl}
                target='_blank'
                className='duration-400 h-5 w-5 opacity-60 transition-transform hover:scale-125 hover:opacity-100'
              >
                <Icon icon='akar-icons:github-fill' width={20} height={20} />
              </Link>
            )}
          </div>
          <h4 className='text-sm font-medium xl:text-base'>{decs}</h4>
          <h4 className='mb-3 text-sm font-medium xl:text-base'>{period}</h4>
          <h4 className='text-base font-semibold xl:text-lg'>{role}</h4>
          <h4 className='mb-2 flex gap-1 text-sm font-medium xl:text-base'>
            {contribution.map((data, index) => (
              <div key={index}>
                {data.type} {data.percent}%
              </div>
            ))}
          </h4>
          <div
            className={`z-10 mb-4 list-inside rounded border border-light bg-[#092509] bg-opacity-85 p-4 font-medium text-light`}
          >
            {done.map((work, index) => (
              <li key={index}>{work}</li>
            ))}
          </div>
        </div>
        {mainUrl ? (
          <Link href={mainUrl} target='_blank'>
            <Image
              className={`static ${align === 'right' ? 'left-0' : 'right-0'} bottom-0 mb-4 h-[340px] w-full cursor-pointer rounded-md border object-cover transition-all duration-300 hover:scale-105 lg:absolute lg:mb-0 lg:w-3/5`}
              src={thumbnail}
              alt={name}
              width={400}
              height={270}
            ></Image>
          </Link>
        ) : (
          <Image
            className={`static ${align === 'right' ? 'left-0' : 'right-0'} bottom-0 mb-4 h-[340px] w-full rounded-md border object-cover transition-all duration-300 lg:absolute lg:mb-0 lg:w-3/5`}
            src={thumbnail}
            alt={name}
            width={400}
            height={270}
          ></Image>
        )}
      </div>
      <div
        className={`mt-4 flex flex-wrap justify-start gap-2 ${align === 'right' ? 'lg:justify-end' : 'lg:justify-start'}`}
      >
        {skillStacks.map((stack, index) => (
          <SkillBadge key={index} title={stack} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
