import Pill from './Pill';
import Wordmark from './Wordmark';

const socials = [
  { href: 'https://www.instagram.com/wooh.dev/', label: 'instagram' },
  { href: 'https://github.com/hyunwooz', label: 'github' },
  { href: 'https://www.linkedin.com/in/woohyundev/', label: 'linkedin' },
];

const Hero = () => {
  return (
    <section className='flex min-h-[100svh] flex-col justify-between px-4 pb-4 pt-20 md:px-6 md:pb-6 md:pt-24'>
      <div>
        <p className='text-[22px] font-medium leading-[1.15] tracking-[-0.02em] md:text-[28px]'>
          Bridging business and code.
          <br />
          Sharing the world, through light.
        </p>
        <Pill href='/archive' className='mt-6'>
          enter the archive
        </Pill>
      </div>

      <div className='flex flex-1 items-center py-10'>
        <Wordmark />
      </div>

      <div className='flex flex-col gap-3 text-[13px] font-medium md:flex-row md:items-center md:justify-between md:text-sm'>
        <span>Kang Hyunwoo — Seoul, KR</span>
        <ul className='flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]'>
          {socials.map((social, index) => (
            <li key={social.href} className='flex items-center gap-2'>
              {index > 0 && <span className='opacity-40'>/</span>}
              <a
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='opacity-70 transition-opacity hover:opacity-100'
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;
