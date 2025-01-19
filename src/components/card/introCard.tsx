const IntroCard: React.FC<{
  title: string;
  contents: string;
  index: number;
}> = ({ title, contents }) => {
  return (
    <>
      <h3 className='text-background mb-4 rounded bg-main px-3 py-2 text-[22px] font-semibold md:text-[24px] xl:text-[28px]'>
        {title}
      </h3>
      <p className='mb-6 text-base font-normal leading-6 md:mb-12 xl:text-[18px]'>
        {contents}
      </p>
    </>
  );
};

export default IntroCard;
