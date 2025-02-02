export const SkillBadge = ({ title }: { title: string }) => {
  return (
    <div className='rounded-lg bg-main px-2 font-bold text-background'>
      {title}
    </div>
  );
};
