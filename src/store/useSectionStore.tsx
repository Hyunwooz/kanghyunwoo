import { create } from 'zustand';

interface SectionState {
  activeSection: string;
  setActiveSection: (state: string) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  activeSection: 'Intro',
  setActiveSection: (state) =>
    set(() => ({
      activeSection: state,
    })),
}));
