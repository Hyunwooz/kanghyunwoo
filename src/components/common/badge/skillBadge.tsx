export const SkillBadge = ({ title }: { title: string }) => {
  return (
    <div className='rounded-md bg-main px-2 font-bold text-background'>
      {title}
    </div>
  );
};
