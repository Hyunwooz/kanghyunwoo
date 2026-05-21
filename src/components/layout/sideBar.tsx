'use client';

import Link from 'next/link';
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
        <Link
          href='/'
          className='group mb-6 inline-flex items-center gap-2 pl-6 text-[11px] uppercase tracking-[0.25em] text-main/60 transition-colors hover:text-main'
        >
          <svg
            width='12'
            height='12'
            viewBox='0 0 24 24'
            fill='none'
            className='transition-transform group-hover:-translate-x-0.5'
          >
            <path
              d='M19 12H5M11 18l-6-6 6-6'
              stroke='currentColor'
              strokeWidth='1.8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Archive</span>
        </Link>
        {sectionList.map((section, index) => (
          <NavMenuItem key={index} name={section.name} />
        ))}
      </div>
      <div className='mt-0 flex flex-col items-center gap-1'>
        {linkIconList.map((menu, index) => (
          <LinkIconMenu link={menu.link} icon={menu.icon} key={index} />
        ))}
        <p className='text-xs font-light'>Updated 2025/04/08</p>
      </div>
    </aside>
  );
};

export default SideBar;
