import Link from 'next/link';
import { contact, footer } from '@/data/portfolio';
import { GRID } from './grid';
import SectionHead from './SectionHead';

const Contact = () => {
  return (
    <section id='contact' className='scroll-mt-16'>
      <SectionHead no='05' title='Contact' />
      <div className={GRID}>
        <h2
          data-reveal
          className='retro-stroke col-span-12 font-display text-[clamp(40px,8vw,120px)] uppercase leading-[0.92] tracking-[-0.005em] text-retro-yellow'
        >
          {footer.title[0]}
          <br />
          <span className='text-retro-cream'>{footer.title[1]}</span>
        </h2>
        <p
          data-reveal
          className='col-span-12 mt-8 max-w-[28em] break-keep text-[16px] font-semibold leading-[1.6] text-retro-ink/85 md:col-span-6 md:mt-12'
        >
          {footer.note}
        </p>
        <div data-reveal className='col-span-12 mt-10 md:mt-12'>
          <a
            href={`mailto:${contact.email}`}
            className='retro-card inline-block break-all bg-retro-pink px-6 py-4 text-[18px] font-bold tracking-[-0.01em] text-retro-cream transition-all duration-200 hover:-translate-y-1 hover:shadow-[9px_9px_0_#1A1838] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#1A1838] md:text-[26px]'
          >
            {contact.email}
          </a>
          <ul className='mt-8 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.14em]'>
            {contact.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='retro-card-sm inline-block bg-retro-cream px-3 py-1.5 transition-colors hover:bg-retro-yellow'
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className='mt-24 flex flex-col justify-between gap-3 border-t-[3px] border-retro-ink py-6 font-mono text-[11px] uppercase tracking-[0.14em] md:mt-32 md:flex-row md:items-center'>
        <div className='flex flex-wrap gap-x-6 gap-y-1'>
          {footer.colophon.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <div className='flex gap-6'>
          <Link href='/' className='underline decoration-retro-pink decoration-2 underline-offset-4 hover:text-retro-cream'>
            Home
          </Link>
          <Link href='/archive' className='underline decoration-retro-pink decoration-2 underline-offset-4 hover:text-retro-cream'>
            Archive
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
