'use client';

import { useState } from 'react';
import { frontend, backend, database, etc } from '@/data/skills';
import SkillCard from '@/components/card/skillCard';
import { SkillCardProps } from '@/shared/types/skills';

type SkillSetKey = 'Front-End' | 'Back-End' | 'DataBase' | 'ETC';

const skillTitle = ['Front-End', 'Back-End', 'DataBase', 'ETC'];
const skillSetList: Record<SkillSetKey, SkillCardProps[]> = {
  'Front-End': frontend,
  'Back-End': backend,
  DataBase: database,
  ETC: etc,
};

const SkillSection = () => {
  const [skillSet, setSkillSet] = useState<SkillSetKey>('Front-End');

  return (
    <>
      <div className='mb-8 flex gap-2 md:mb-8 md:gap-2 lg:gap-4 xl:gap-10'>
        {skillTitle.map((title, index) => (
          <button
            key={index}
            onClick={() => setSkillSet(title as SkillSetKey)}
            className={`border-b-[3px] px-3 py-1 text-sm font-bold text-main transition-colors xl:text-lg ${
              skillSet === title
                ? 'border-main'
                : 'border-[#fffff536] hover:border-main'
            }`}
          >
            {title}
          </button>
        ))}
      </div>
      <div className='mb-8 min-h-[220px] py-2'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          {skillSetList[skillSet].map((skill, index) => (
            <SkillCard
              key={index}
              src={skill.src}
              alt={skill.alt}
              desc={skill.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillSection;
