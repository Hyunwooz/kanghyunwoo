interface AboutCardProps {
  title: string;
  contents: string;
}

const AboutCard = ({ title, contents }: AboutCardProps) => {
  return (
    <>
      <h3 className='mb-4 rounded bg-main px-3 py-1 text-[22px] font-semibold text-background md:text-[26px] xl:text-[32px]'>
        {title}
      </h3>
      <p className='mb-6 text-base font-light leading-normal md:mb-12 xl:text-[20px]'>
        {contents}
      </p>
    </>
  );
};

export default AboutCard;
