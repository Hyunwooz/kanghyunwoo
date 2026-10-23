import { twMerge } from 'tailwind-merge';

// CSS 그라데이션만으로 만든 광택 오브제 (noth.in 의 3D 오브제 대용)
export type ObjectShape = 'sphere' | 'pill' | 'ring' | 'blob';
export type ObjectTone = 'blue' | 'chrome' | 'ink';

const toneGradient: Record<ObjectTone, string> = {
  blue: 'radial-gradient(circle at 32% 28%, #ffffff 0%, #c7c9ff 10%, #2B2BD9 48%, #0a0a5c 100%)',
  chrome:
    'radial-gradient(circle at 32% 28%, #ffffff 0%, #e9e9e6 14%, #9c9c98 46%, #3a3a38 100%)',
  ink: 'radial-gradient(circle at 32% 28%, #8a8a8a 0%, #2a2a2a 22%, #121212 60%, #000000 100%)',
};

const shapeClass: Record<ObjectShape, string> = {
  sphere: 'aspect-square rounded-full',
  pill: 'aspect-[2.4/1] rounded-full',
  ring: 'aspect-square rounded-full [mask:radial-gradient(circle,transparent_36%,#000_37%)]',
  blob: 'aspect-square rounded-[58%_42%_55%_45%/48%_56%_44%_52%]',
};

interface GlossyObjectProps {
  shape: ObjectShape;
  tone: ObjectTone;
  className?: string;
}

const GlossyObject = ({ shape, tone, className }: GlossyObjectProps) => {
  return (
    <div
      aria-hidden
      className={twMerge(
        'shadow-[0_30px_60px_-20px_rgba(18,18,18,0.35)]',
        shapeClass[shape],
        className,
      )}
      style={{ background: toneGradient[tone] }}
    />
  );
};

export default GlossyObject;
