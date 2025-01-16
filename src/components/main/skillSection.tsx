'use client';

import Image from 'next/image';

interface Skill {
  src: string;
  alt: string;
}

interface SkillBoxProps {
  title: string;
  skills: Skill[];
}

const SkillBox: React.FC<SkillBoxProps> = ({ title, skills }) => {
  return (
    <div className='mb-8'>
      <h3 className='mb-6 text-xl font-semibold md:mb-4 xl:text-3xl'>
        {title}
      </h3>
      <div className='flex gap-3'>
        {skills.map((skill, index) => (
          <div key={index} className='group relative cursor-pointer'>
            <Image
              src={skill.src}
              alt={skill.alt}
              className='rounded-full border-2 border-normal'
              width={50}
              height={50}
            />
            <p className='absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-full rounded bg-light p-2 text-sm text-deep shadow-lg group-hover:flex'>
              {skill.alt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SkillSection() {
  return (
    <div>
      <SkillBox
        title='Front-End'
        skills={[
          { src: '/svgs/HTML.svg', alt: 'HTML' },
          { src: '/svgs/CSS.svg', alt: 'CSS' },
          { src: '/svgs/JavaScript.svg', alt: 'JavaScript' },
          { src: '/svgs/TypeScript.svg', alt: 'TypeScript' },
          { src: '/svgs/NextJS-Light.svg', alt: 'NextJS' },
          { src: '/svgs/React-Light.svg', alt: 'React' },
        ]}
      />
      <SkillBox
        title='Back-End'
        skills={[
          { src: '/svgs/Python-Light.svg', alt: 'Python' },
          { src: '/svgs/Django.svg', alt: 'Django' },
        ]}
      />
      <SkillBox
        title='DataBase'
        skills={[
          { src: '/svgs/PostgreSQL-Light.svg', alt: 'PostgreSQL' },
          { src: '/svgs/SQLite.svg', alt: 'SQLite' },
        ]}
      />
      <SkillBox
        title='ETC'
        skills={[
          { src: '/svgs/aws-ec2.svg', alt: 'EC2' },
          { src: '/svgs/aws-s3.svg', alt: 'S3' },
          { src: '/svgs/Vercel-Light.svg', alt: 'Vercel' },
        ]}
      />
    </div>
  );
}
