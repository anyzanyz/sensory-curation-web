import { create } from 'zustand';

interface CurationState {
  isPlaying: boolean;
  isAudioInitialized: boolean;
  togglePlay: () => void;
  setAudioInitialized: (val: boolean) => void;
}

export const useCurationStore = create<CurationState>((set) => ({
  isPlaying: false,
  isAudioInitialized: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setAudioInitialized: (val) => set({ isAudioInitialized: val })
}));
