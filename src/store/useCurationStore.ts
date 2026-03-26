import { create } from 'zustand';

interface CurationState {
  isPlaying: boolean;
  isAudioInitialized: boolean;
  isDarkMode: boolean;
  togglePlay: () => void;
  setAudioInitialized: (status: boolean) => void;
  toggleDarkMode: () => void;
}

export const useCurationStore = create<CurationState>((set) => ({
  isPlaying: false,
  isAudioInitialized: false,
  isDarkMode: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setAudioInitialized: (status) => set({ isAudioInitialized: status }),
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { isDarkMode: newDarkMode };
  }),
}));
