import { scrollToSection } from '@/shared/utils/scroll';
import { useSectionStore } from '@/store/useSectionStore';

interface NaveMenuItemProps {
  name: string;
}

const NavMenuItem = ({ name }: NaveMenuItemProps) => {
  const { activeSection } = useSectionStore();

  return (
    <div
      className={`flex origin-left cursor-pointer items-center border-l-4 py-2 pl-6 text-[16px] font-bold transition-all duration-300 hover:opacity-100 xl:text-[20px] ${
        activeSection === name ? 'opacity-100' : 'opacity-40'
      }`}
      onClick={() => scrollToSection(name)}
    >
      {name}
    </div>
  );
};

export default NavMenuItem;
