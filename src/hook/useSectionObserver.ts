import { useEffect, useRef } from 'react';
import { useSectionStore } from '@/store/useSectionStore';

export const useSectionObserver = () => {
  const { setActiveSection } = useSectionStore();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    intro: null,
    about: null,
    experience: null,
    skills: null,
    projects: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      sectionRefs.current.projects || sectionRefs.current.intro
        ? { threshold: 0.1 }
        : { threshold: 0.3 },
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return sectionRefs;
};
