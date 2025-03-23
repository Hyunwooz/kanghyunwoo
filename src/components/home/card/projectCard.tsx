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

  const alignStyle = twMerge(
    'relative flex flex-col-reverse gap-2 mb-4',
    mergeStyle(),
  );

  return (
    <div className='mb-20'>
      <div className={alignStyle}>
        <div
          className={`flex w-full flex-col items-start ${align === 'right' ? 'lg:items-end' : 'lg:items-start'} justify-start rounded-md`}
        >
          <div
            className={`mb-3 flex flex-col ${align === 'right' ? 'lg:items-end' : 'lg:items-start'}`}
          >
            <div className='flex items-center gap-1'>
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
            <h4 className='text-sm xl:text-lg'>{decs}</h4>
          </div>
          <div
            className={`flex flex-col ${align === 'right' ? 'lg:items-end' : 'lg:items-start'}`}
          >
            <div className='flex text-sm xl:text-lg'>
              <p>개발 기간</p>
              <div className='mx-2'>|</div>
              <p>{period}</p>
            </div>
            <div className={`flex text-sm xl:text-lg`}>
              <p>개발 인원</p>
              <div className='mx-2'>|</div>
              <p>{role}</p>
            </div>
            <div className='mb-2 flex text-sm xl:text-lg'>
              <p>개발 기여</p>
              <div className='mx-2'>|</div>
              <div className='flex gap-1 text-sm xl:text-lg'>
                {contribution.map((data, index) => (
                  <div key={index}>
                    {data.type} {data.percent}%
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`flex flex-wrap justify-start gap-2 ${align === 'right' ? 'lg:justify-end' : 'lg:justify-start'}`}
            >
              {skillStacks.map((stack, index) => (
                <SkillBadge key={index} title={stack} />
              ))}
            </div>
          </div>
        </div>
        <div className='relative h-[240px] w-[900px]'>
          {mainUrl ? (
            <Link href={mainUrl} target='_blank'>
              <Image
                className={`cursor-pointer rounded-md border object-cover transition-all duration-300 hover:scale-105`}
                src={thumbnail}
                alt={name}
                fill
              ></Image>
            </Link>
          ) : (
            <Image
              className={`rounded-md border object-cover transition-all duration-300`}
              src={thumbnail}
              alt={name}
              fill
            ></Image>
          )}
        </div>
      </div>
      <div
        className={`mb-4 list-inside rounded border border-light bg-[#092509] bg-opacity-85 p-4 font-medium text-light`}
      >
        {done.map((work, index) => (
          <li key={index}>{work}</li>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
