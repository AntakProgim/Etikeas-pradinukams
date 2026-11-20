import React, { useRef, useEffect, useState } from 'react';
import { ActiveTab } from '../types';
import { 
  BookOpen, 
  HelpCircle, 
  UtensilsCrossed, 
  Sparkles, 
  HeartHandshake, 
  Award, 
  Bot, 
  Send,
  Gamepad2,
  BookA,
  Flame,
  Film,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stars: number;
  onOpenDiploma: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stars,
  onOpenDiploma,
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const tabs = [
    { id: 'handbook' as ActiveTab, label: 'Pelėdos pamokos', icon: BookOpen, color: 'text-amber-600' },
    { id: 'daily-mission' as ActiveTab, label: 'Dienos misija', icon: Flame, color: 'text-orange-600' },
    { id: 'scenarios' as ActiveTab, label: 'Ką darytum tu?', icon: Sparkles, color: 'text-emerald-600' },
    { id: 'ai-animator' as ActiveTab, label: 'DI animacijos', icon: Film, color: 'text-purple-600' },
    { id: 'games' as ActiveTab, label: 'Žaidimai ir viktorinos', icon: Gamepad2, color: 'text-blue-600' },
    { id: 'glossary-tips' as ActiveTab, label: 'Žodynas ir patarimai', icon: BookA, color: 'text-teal-600' },
    { id: 'card-maker' as ActiveTab, label: 'Ačiū atvirukas', icon: Send, color: 'text-rose-600' },
    { id: 'owl-advisor' as ActiveTab, label: 'Klausk pelėdos', icon: Bot, color: 'text-indigo-600', highlight: true },
    { id: 'achievements' as ActiveTab, label: 'Pasiekimai', icon: Award, color: 'text-amber-500' },
  ];

  const checkScroll = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    // Scroll active tab into view smoothly
    const activeEl = document.getElementById(`tab-${activeTab}`);
    if (activeEl && navRef.current) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setTimeout(checkScroll, 300);
    }
  }, [activeTab]);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      navRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Logo / Brand */}
          <div 
            id="brand-logo"
            onClick={() => {
              sounds.playPop();
              setActiveTab('handbook');
            }}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 overflow-hidden flex items-center justify-center text-white shadow-md shadow-amber-200 group-hover:scale-105 transition-transform border border-amber-300">
              <img 
                src="/images/owl_teacher.jpg" 
                alt="Pelėdos herbas" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/owl_teacher_1789803378582.jpg';
                }}
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-base sm:text-lg text-slate-800 tracking-tight leading-tight">
                  Mandagaus elgesio mokyklėlė
                </span>
                <span className="hidden md:inline-flex px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 rounded-md">
                  Pradinukams
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Pagal Bobo ir Emilės Barns knygą „Etiketas šiandienos vaikams“
              </p>
            </div>
          </div>

          {/* Right Header Badges: Stars, Audio, Diploma */}
          <div className="flex items-center gap-2">
            {/* Stars Counter */}
            <div 
              id="stars-badge"
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 px-3 py-1.5 rounded-full shadow-xs"
              title="Surinktos etiketo žvaigždutės"
            >
              <span className="text-base animate-bounce">⭐</span>
              <span className="font-bold text-amber-900 text-sm">{stars}</span>
              <span className="text-xs text-amber-700 hidden sm:inline font-medium">žvaigžd.</span>
            </div>

            {/* Diploma Button */}
            <button
              id="btn-diploma-top"
              onClick={() => {
                sounds.playPop();
                onOpenDiploma();
              }}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Diplomas</span>
            </button>


          </div>
        </div>

        {/* Tabs Navigation with scroll controls */}
        <div className="relative mt-2.5 flex items-center">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollNav('left')}
              className="md:hidden absolute left-0 z-10 w-7 h-7 bg-white/95 border border-slate-300 shadow-md rounded-full flex items-center justify-center text-slate-700 hover:bg-amber-50 -ml-1 cursor-pointer transition-all"
              aria-label="Slinkti kairėn"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <nav 
            ref={navRef}
            onScroll={checkScroll}
            className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto md:overflow-visible md:flex-wrap pb-1 scrollbar-none scroll-smooth w-full px-1"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => {
                    sounds.playPop();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-heading font-semibold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs scale-100'
                      : tab.highlight
                        ? 'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100/80 border border-indigo-200/60'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-amber-100/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollNav('right')}
              className="md:hidden absolute right-0 z-10 w-7 h-7 bg-white/95 border border-slate-300 shadow-md rounded-full flex items-center justify-center text-slate-700 hover:bg-amber-50 -mr-1 cursor-pointer transition-all"
              aria-label="Slinkti dešinėn"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

