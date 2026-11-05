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
          className='col-span-12 font-serif text-[clamp(44px,8vw,128px)] leading-[0.92] tracking-[-0.025em] md:col-span-9 md:col-start-4'
        >
          {footer.title[0]}
          <br />
          <em className='font-normal italic'>{footer.title[1]}</em>
        </h2>
        <p data-reveal className='col-span-12 mt-8 max-w-[28em] break-keep text-[16px] leading-[1.6] text-muted md:col-span-5 md:col-start-4 md:mt-12'>
          {footer.note}
        </p>
        <div data-reveal className='col-span-12 mt-10 md:col-span-9 md:col-start-4 md:mt-12'>
          <a
            href={`mailto:${contact.email}`}
            className='inline-block break-all text-[20px] tracking-[-0.01em] underline decoration-accent decoration-1 underline-offset-[10px] transition-colors hover:text-accent md:text-[32px]'
          >
            {contact.email}
          </a>
          <ul className='mt-8 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]'>
            {contact.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target='_blank' rel='noopener noreferrer' className='text-muted transition-colors hover:text-ink'>
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className='mt-24 flex flex-col justify-between gap-3 border-t border-rule py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:mt-32 md:flex-row md:items-center'>
        <div className='flex flex-wrap gap-x-6 gap-y-1'>
          {footer.colophon.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <div className='flex gap-6'>
          <Link href='/' className='transition-colors hover:text-ink'>
            Home
          </Link>
          <Link href='/archive' className='transition-colors hover:text-ink'>
            Archive
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
