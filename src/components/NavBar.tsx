import { Moon, Sun, Menu, X } from 'lucide-react';
import { useCurationStore } from '../store/useCurationStore';
import { useState, useEffect } from 'react';

export function NavBar() {
  const { isDarkMode, toggleDarkMode } = useCurationStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close menu after scrolling
    }
  };

  const navBgClass = isScrolled || isMobileMenuOpen
    ? 'bg-white/85 dark:bg-black/85 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-sm py-4' 
    : 'bg-transparent border-transparent py-6';
    
  const textClass = isScrolled
    ? 'text-black dark:text-white'
    : 'text-white/90 drop-shadow-md';

  const menuClass = isScrolled
    ? 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
    : 'text-white/60 hover:text-white drop-shadow-md';

  const btnClass = isScrolled
    ? 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
    : 'text-white/70 hover:bg-white/10 hover:text-white drop-shadow-md';

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-700 ${navBgClass}`}>
      <div 
        className={`font-serif text-2xl font-light tracking-tighter cursor-pointer transition-colors duration-500 ${textClass}`} 
        onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}) }}
      >
        aurore.
      </div>
      
      <div className={`hidden md:flex flex-1 items-center justify-center gap-10 lg:gap-16 text-[15px] font-serif tracking-widest transition-colors duration-500 ${menuClass}`}>
        <button onClick={() => scrollTo('philosophy')} className="transition-colors lowercase">philosophy</button>
        <button onClick={() => scrollTo('brand')} className="transition-colors lowercase">brand</button>
        <button onClick={() => scrollTo('naming')} className="transition-colors lowercase">naming</button>
        <button onClick={() => scrollTo('scenarios')} className="transition-colors lowercase">scenarios</button>
        <button onClick={() => scrollTo('roadmap')} className="transition-colors lowercase">roadmap</button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full transition-colors duration-500 ${btnClass}`}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-full transition-colors duration-500 ${btnClass}`}
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 flex flex-col items-center py-8 gap-8 md:hidden shadow-lg transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
        <button onClick={() => scrollTo('philosophy')} className={`text-lg font-serif lowercase tracking-widest ${textClass}`}>philosophy</button>
        <button onClick={() => scrollTo('brand')} className={`text-lg font-serif lowercase tracking-widest ${textClass}`}>brand</button>
        <button onClick={() => scrollTo('naming')} className={`text-lg font-serif lowercase tracking-widest ${textClass}`}>naming</button>
        <button onClick={() => scrollTo('scenarios')} className={`text-lg font-serif lowercase tracking-widest ${textClass}`}>scenarios</button>
        <button onClick={() => scrollTo('roadmap')} className={`text-lg font-serif lowercase tracking-widest ${textClass}`}>roadmap</button>
      </div>
    </nav>
  );
}
