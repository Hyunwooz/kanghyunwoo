import SectionContainer from '../sectionContainer';
import { aboutDatas } from '@/data/about';
import AboutCard from '@/components/card/aboutCard';

const AboutSection = () => {
  return (
    <SectionContainer sectionTitle='About'>
      {aboutDatas.map((data, index) => (
        <AboutCard title={data.title} key={index} contents={data.contents} />
      ))}
    </SectionContainer>
  );
};

export default AboutSection;
