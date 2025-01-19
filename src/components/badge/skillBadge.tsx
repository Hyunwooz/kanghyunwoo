export const ExperienceSkillBadge: React.FC<{ title: string }> = ({
  title,
}) => {
  return (
    <div className='text-background rounded-lg bg-main px-2 font-bold'>
      {title}
    </div>
  );
};
