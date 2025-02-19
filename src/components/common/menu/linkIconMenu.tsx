import Link from 'next/link';
import { Icon } from '@iconify/react';

interface LinkIconMenuProps {
  link: string;
  icon: string;
}

const LinkIconMenu = ({ link, icon }: LinkIconMenuProps) => {
  return (
    <Link
      href={link}
      className='duration-400 mb-3 w-[30px] origin-center opacity-60 transition-transform hover:scale-125 hover:opacity-100'
    >
      <Icon icon={icon} width={30} height={30} />
    </Link>
  );
};

export default LinkIconMenu;
