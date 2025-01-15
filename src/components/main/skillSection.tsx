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
            className='rounded-full border-2 border-normal'
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
          { src: '/svgs/HTML.svg', alt: 'html' },
          { src: '/svgs/CSS.svg', alt: 'css' },
          { src: '/svgs/JavaScript.svg', alt: 'javascript' },
          { src: '/svgs/TypeScript.svg', alt: 'typescript' },
          { src: '/svgs/NextJS-Light.svg', alt: 'nextjs' },
          { src: '/svgs/React-Light.svg', alt: 'react' },
        ]}
      />
      <SkillBox
        title='Back-End'
        skills={[
          { src: '/svgs/Python-Light.svg', alt: 'python' },
          { src: '/svgs/Django.svg', alt: 'django' },
        ]}
      />
      <SkillBox
        title='DataBase'
        skills={[
          { src: '/svgs/Postgresql-Light.svg', alt: 'postgresql' },
          { src: '/svgs/SQLite.svg', alt: 'sqlite' },
        ]}
      />
      <SkillBox
        title='ETC'
        skills={[
          { src: '/svgs/aws-ec2.svg', alt: 'ec2' },
          { src: '/svgs/aws-s3.svg', alt: 's3' },
          { src: '/svgs/Vercel-Light.svg', alt: 'vercel' },
        ]}
      />
    </div>
  );
}
