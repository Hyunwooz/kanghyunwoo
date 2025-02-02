import { create } from 'zustand';

interface isClickedState {
  isClicked: boolean;
  setIsClicked: (state: boolean) => void;
}

export const useClickedStore = create<isClickedState>((set) => ({
  isClicked: false,
  setIsClicked: (state) =>
    set(() => ({
      isClicked: state,
    })),
}));
