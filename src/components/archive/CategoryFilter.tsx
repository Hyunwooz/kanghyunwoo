'use client';

import type { ArchiveCategory, CategoryOption } from '@/shared/types/archive';

interface CategoryFilterProps {
  options: CategoryOption[];
  active: ArchiveCategory;
  onChange: (key: ArchiveCategory) => void;
}

const CategoryFilter = ({ options, active, onChange }: CategoryFilterProps) => {
  return (
    <div className='no-scrollbar flex w-full snap-x snap-mandatory gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible'>
      {options.map((opt) => {
        const isActive = opt.key === active;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`group relative shrink-0 snap-start rounded-full border px-4 py-1.5 text-sm font-medium tracking-wide transition-all duration-300 md:px-5 md:py-2 md:text-[15px] ${
              isActive
                ? 'border-white/80 bg-white text-black shadow-[0_8px_30px_rgb(255,255,255,0.12)]'
                : 'border-white/15 bg-white/5 text-white/70 hover:border-white/40 hover:text-white'
            }`}
          >
            <span className='relative z-10'>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
