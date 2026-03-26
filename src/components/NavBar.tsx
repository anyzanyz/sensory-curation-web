import { Moon, Sun } from 'lucide-react';
import { useCurationStore } from '../store/useCurationStore';

export function NavBar() {
  const { isDarkMode, toggleDarkMode } = useCurationStore();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 transition-colors duration-500">
      <div 
        className="font-serif text-2xl font-light text-black dark:text-white tracking-tighter cursor-pointer" 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        aurore.
      </div>
      
      <div className="hidden md:flex flex-1 items-center justify-center gap-10 lg:gap-16 text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
        <button onClick={() => scrollTo('philosophy')} className="hover:text-black dark:hover:text-white transition-colors">Philosophy</button>
        <button onClick={() => scrollTo('brand')} className="hover:text-black dark:hover:text-white transition-colors">Brand</button>
        <button onClick={() => scrollTo('naming')} className="hover:text-black dark:hover:text-white transition-colors">Naming</button>
        <button onClick={() => scrollTo('scenarios')} className="hover:text-black dark:hover:text-white transition-colors">Scenarios</button>
        <button onClick={() => scrollTo('roadmap')} className="hover:text-black dark:hover:text-white transition-colors">Roadmap</button>
      </div>

      <button 
        onClick={toggleDarkMode} 
        className="p-2 ml-auto md:ml-0 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}
