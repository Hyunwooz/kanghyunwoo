import Link from 'next/link';
import Pill from './Pill';
import Wordmark from './Wordmark';

const socials = [
  { href: 'https://www.instagram.com/wooh.dev/', label: 'Instagram' },
  { href: 'https://github.com/hyunwooz', label: 'Github' },
  { href: 'https://www.linkedin.com/in/woohyundev/', label: 'Linkedin' },
];

// 먹색 배경, 마무리 문장 + 워드마크
const Footer = () => {
  return (
    <footer
      id='contact'
      data-dark
      className='bg-ink px-4 pt-32 text-paper md:px-6 md:pt-44'
    >
      <div className='grid grid-cols-12 gap-x-4 gap-y-10'>
        <div className='col-span-12 md:col-span-8'>
          <h2 className='text-[44px] font-light leading-[1.02] tracking-[-0.03em] md:text-[88px]'>
            Let&apos;s start
            <br />
            from here<span className='text-accent'>.</span>
          </h2>
          <div className='mt-10 flex flex-wrap gap-3'>
            <Pill href='mailto:hyunwoo.kang@saladlab.co' inverted icon='@'>
              drop me an email
            </Pill>
            <Pill href='/archive' inverted>
              see the archive
            </Pill>
          </div>
        </div>
        <ul className='col-span-12 flex flex-col gap-1 text-xl md:col-span-3 md:col-start-10 md:self-end md:text-2xl'>
          {socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-opacity hover:opacity-60'
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-24 md:mt-32'>
        <Wordmark />
      </div>

      <div className='flex flex-col justify-between gap-2 py-4 text-[12px] md:flex-row md:text-[13px]'>
        <span>©{new Date().getFullYear()} — Kang Hyunwoo</span>
        <div className='flex gap-5 font-mono text-[11px] uppercase tracking-[0.12em]'>
          <Link href='/archive' className='opacity-70 hover:opacity-100'>
            archive
          </Link>
          <Link href='/portfolio' className='opacity-70 hover:opacity-100'>
            portfolio
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
