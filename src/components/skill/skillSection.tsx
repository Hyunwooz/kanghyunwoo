'use client';

import { frontend, backend, database, etc } from '@/data/skills';
import SkillBox from './skillBox';

const skillSetList = [
  {
    title: 'Front-End',
    skills: frontend,
  },
  {
    title: 'Back-End',
    skills: backend,
  },
  {
    title: 'DataBase',
    skills: database,
  },
  {
    title: 'ETC',
    skills: etc,
  },
];

export default function SkillSection() {
  return (
    <div>
      {skillSetList.map((skillSet, index) => (
        <SkillBox key={index} title='Front-End' skills={skillSet.skills} />
      ))}
    </div>
  );
}
