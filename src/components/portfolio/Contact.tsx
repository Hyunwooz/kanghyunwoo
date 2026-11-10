import Link from 'next/link';
import { contact, footer } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

const UNDERLINE = 'underline decoration-quiet-line underline-offset-[6px] transition-colors hover:decoration-quiet-ink';

const Contact = () => {
  return (
    <section id='contact' className='scroll-mt-16'>
      <SectionHead title='Contact' />
      <div className={GRID}>
        <h2
          data-reveal
          className='col-span-12 text-[clamp(36px,6vw,80px)] font-light leading-[1.05] tracking-[-0.03em] md:col-span-11 md:col-start-2'
        >
          {footer.title[0]}
          <br />
          <span className='text-quiet-mute'>{footer.title[1]}</span>
        </h2>
        <p
          data-reveal
          className='col-span-12 mt-8 max-w-[28em] break-keep text-[16px] leading-[1.7] text-quiet-ink/75 md:col-span-6 md:col-start-2 md:mt-12'
        >
          {footer.note}
        </p>
        <div data-reveal className='col-span-12 mt-10 md:col-span-11 md:col-start-2 md:mt-12'>
          <a href={`mailto:${contact.email}`} className={`break-all text-[20px] font-medium tracking-[-0.01em] md:text-[26px] ${UNDERLINE}`}>
            {contact.email}
          </a>
          <ul className='mt-8 flex flex-wrap gap-6 text-[14px]'>
            {contact.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target='_blank' rel='noopener noreferrer' className={UNDERLINE}>
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className='mt-24 flex flex-col justify-between gap-3 border-t border-quiet-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-quiet-mute md:mt-36 md:flex-row md:items-center'>
        <div className='flex flex-wrap gap-x-6 gap-y-1'>
          {footer.colophon.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <div className='flex gap-6'>
          <Link href='/' className='transition-colors hover:text-quiet-ink'>
            Home
          </Link>
          <Link href='/archive' className='transition-colors hover:text-quiet-ink'>
            Archive
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
