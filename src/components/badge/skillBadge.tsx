export const ExperienceSkillBadge: React.FC<{ title: string }> = ({
  title,
}) => {
  return (
    <div className='rounded-lg bg-main px-2 font-bold text-background'>
      {title}
    </div>
  );
};
