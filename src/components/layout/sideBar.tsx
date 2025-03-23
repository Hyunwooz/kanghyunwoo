'use client';

import NavMenuItem from './menu/navMenu';
import LinkIconMenu from '../common/menu/linkIconMenu';
import { sectionList } from '@/data/section';
import { linkIconList } from '@/data/linkIcon';
import { useClickedStore } from '@/store/useClick';

const SideBar = () => {
  const { isClicked } = useClickedStore();

  return (
    <aside
      className={`fixed left-0 top-0 z-10 hidden h-screen justify-between px-6 pb-[50px] pt-[200px] lg:flex lg:flex-col xl:px-10 xl:pt-[260px] ${
        isClicked ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className='flex flex-col items-start'>
        {sectionList.map((section, index) => (
          <NavMenuItem key={index} name={section.name} />
        ))}
      </div>
      <div className='mt-0 flex flex-col items-center gap-1'>
        {linkIconList.map((menu, index) => (
          <LinkIconMenu link={menu.link} icon={menu.icon} key={index} />
        ))}
        <p className='text-xs font-light'>Updated 2025/03/23</p>
      </div>
    </aside>
  );
};

export default SideBar;
