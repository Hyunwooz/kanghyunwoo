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
      <h3 className='mb-6 text-lg md:mb-4 xl:text-3xl'>{title}</h3>
      <div className='flex gap-2'>
        {skills.map((skill, index) => (
          <Image
            key={index}
            src={skill.src}
            alt={skill.alt}
            className='border-normal rounded-full border-2'
            width={50}
            height={50}
          />
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
          { src: '/svgs/html.svg', alt: 'html' },
          { src: '/svgs/css.svg', alt: 'css' },
          { src: '/svgs/javascript.svg', alt: 'javascript' },
          { src: '/svgs/typescript.svg', alt: 'typescript' },
          { src: '/svgs/nextjs-light.svg', alt: 'nextjs' },
          { src: '/svgs/react-light.svg', alt: 'react' },
        ]}
      />
      <SkillBox
        title='Back-End'
        skills={[
          { src: '/svgs/python-light.svg', alt: 'python' },
          { src: '/svgs/django.svg', alt: 'django' },
        ]}
      />
      <SkillBox
        title='DataBase'
        skills={[
          { src: '/svgs/postgresql-light.svg', alt: 'postgresql' },
          { src: '/svgs/sqlite.svg', alt: 'sqlite' },
        ]}
      />
      <SkillBox
        title='ETC'
        skills={[
          { src: '/svgs/aws-ec2.svg', alt: 'ec2' },
          { src: '/svgs/aws-s3.svg', alt: 's3' },
          { src: '/svgs/vercel-light.svg', alt: 'vercel' },
        ]}
      />
    </div>
  );
}
