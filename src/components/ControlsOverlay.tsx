import { Play, Pause, Volume2 } from 'lucide-react';
import { useCurationStore } from '../store/useCurationStore';

export function ControlsOverlay() {
  const { isPlaying, togglePlay, isAudioInitialized } = useCurationStore();

  return (
    <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center items-center pointer-events-auto">
      <div className="flex items-center gap-6 px-8 py-3 bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all hover:bg-white/60 dark:hover:bg-black/60 duration-500">
        
        <button 
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95 transition-transform shadow-md"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
        
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 tracking-[0.2em] font-medium uppercase mb-0.5 transition-colors">
            Now Playing
          </span>
          <span className="text-sm text-black dark:text-white font-medium truncate max-w-[150px] md:max-w-[250px] transition-colors">
            {isAudioInitialized ? 'Sensory Flow (Live)' : 'Tap play to start audio context'}
          </span>
        </div>
        
        <button className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors p-2 hidden sm:block">
          <Volume2 size={20} />
        </button>
        
      </div>
    </div>
  );
}
