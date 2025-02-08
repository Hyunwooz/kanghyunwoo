import { aboutDatas } from '@/data/about';
import AboutCard from '@/components/card/aboutCard';

const AboutSection = () => {
  return (
    <>
      {aboutDatas.map((data, index) => (
        <AboutCard title={data.title} key={index} contents={data.contents} />
      ))}
    </>
  );
};

export default AboutSection;
