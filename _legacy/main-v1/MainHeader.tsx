'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '#scenes', label: 'scenes' },
  { href: '/archive', label: 'archive' },
  { href: '#contact', label: 'contact' },
];

// 먹색 섹션 위를 지날 때 글자색을 반전시킨다
const MainHeader = () => {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-dark]');
    const check = () => {
      const probe = 40;
      const hit = Array.from(sections).some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probe && rect.bottom >= probe;
      });
      setOnDark(hit);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 mix-blend-normal transition-colors duration-300 ${
        onDark ? 'text-paper' : 'text-ink'
      }`}
    >
      <div className='mx-auto flex h-16 max-w-[1800px] items-center justify-between px-4 md:px-6'>
        <Link href='/' className='text-lg font-bold tracking-tight'>
          w<span className='text-accent'>.</span>
        </Link>
        <nav className='flex gap-5 font-mono text-[11px] uppercase tracking-[0.12em] md:gap-8'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='opacity-70 transition-opacity hover:opacity-100'
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
