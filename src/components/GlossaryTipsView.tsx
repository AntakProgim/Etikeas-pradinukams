import React, { useState } from 'react';
import { GLOSSARY_TERMS, DAILY_TIPS } from '../data/glossaryData';
import { GlossaryTerm, DailyTip } from '../types';
import { 
  BookA, 
  Sparkles, 
  Search, 
  Sun, 
  School, 
  UtensilsCrossed, 
  Home, 
  Moon, 
  Theater, 
  CheckCircle2, 
  Quote, 
  Lightbulb, 
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface GlossaryTipsViewProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

export const GlossaryTipsView: React.FC<GlossaryTipsViewProps> = ({ onAddStars, onUnlockBadge }) => {
  const [activeSubTab, setActiveSubTab] = useState<'glossary' | 'tips'>('glossary');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(GLOSSARY_TERMS[0]);
  const [selectedDailyTip, setSelectedDailyTip] = useState<DailyTip>(DAILY_TIPS[0]);
  const [triedTips, setTriedTips] = useState<string[]>([]);

  const handleSelectTerm = (term: GlossaryTerm) => {
    sounds.playPop();
    setSelectedTerm(term);
  };

  const handleTryTip = (tipId: string) => {
    sounds.playPop();
    if (!triedTips.includes(tipId)) {
      setTriedTips((prev) => [...prev, tipId]);
      onAddStars(5);
      sounds.playCorrect();
    }
  };

  const categories = [
    { id: 'all', label: 'Visi terminai' },
    { id: 'bendras', label: '❤️ Pagarba ir higiena' },
    { id: 'stalas', label: '🍽️ Stalo etiketas' },
    { id: 'svetingumas', label: '🏡 Svetingumas' },
    { id: 'sportas', label: '⚽ Garbingas sportas' },
    { id: 'bendraujant', label: '🗣️ Bendravimas' },
  ];

  const filteredTerms = GLOSSARY_TERMS.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesQuery = 
      t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.example.toLowerCase().includes(glossarySearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div id="glossary-tips-container" className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-xs">
            📖 Knygos žinių bagažas
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Etiketo žodynas ir dienos patarimai
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm leading-relaxed">
            Išmok svarbiausius terminus iš knygos „Good Manners for Today's Kids“ ir sužinok lengvai įgyvendinamus patarimus kiekvienai dienai!
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="bg-black/20 p-1.5 rounded-2xl flex items-center gap-1 border border-white/20 w-full sm:w-auto">
          <button
            onClick={() => {
              sounds.playPop();
              setActiveSubTab('glossary');
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSubTab === 'glossary'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookA className="w-4 h-4" />
            <span>Interaktyvus žodynas</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setActiveSubTab('tips');
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSubTab === 'tips'
                ? 'bg-white text-teal-900 shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Kasdieniai patarimai</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'glossary' ? (
        /* INTERACTIVE GLOSSARY VIEW */
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="Ieškok etiketo termino (pvz. svetingumas, taktiškumas, stalas)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sounds.playPop();
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2-Column Glossary Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Term List Sidebar */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-2 uppercase tracking-wider">
                <span>Terminai ({filteredTerms.length})</span>
                <span>Pasirink terminą</span>
              </div>

              <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                {filteredTerms.map((term) => {
                  const isSelected = selectedTerm?.id === term.id;
                  return (
                    <button
                      key={term.id}
                      onClick={() => handleSelectTerm(term)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-200'
                          : 'bg-white/80 hover:bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-xl flex items-center justify-center shrink-0 border border-teal-100">
                          {term.icon}
                        </div>
                        <div>
                          <div className="font-heading font-bold text-sm text-slate-900 leading-tight">
                            {term.term}
                          </div>
                          <div className="text-[11px] text-teal-700 font-medium">
                            {term.categoryLabel}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-teal-600 translate-x-1' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Term Deep-Dive Details */}
            <div className="lg:col-span-7">
              {selectedTerm ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-teal-100 text-3xl flex items-center justify-center shadow-inner">
                        {selectedTerm.icon}
                      </div>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold uppercase tracking-wider">
                          {selectedTerm.categoryLabel}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 pt-1">
                          {selectedTerm.term}
                        </h2>
                        {selectedTerm.englishOrigin && (
                          <p className="text-xs text-slate-400 font-mono">
                            Knygoje: „{selectedTerm.englishOrigin}“
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Definition */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      📖 Apibrėžimas:
                    </h4>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {selectedTerm.definition}
                    </p>
                  </div>

                  {/* Practical Example */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      <span>Pavyzdys vaikams</span>
                    </h4>
                    <div className="p-4 bg-teal-50/80 border border-teal-200/80 rounded-2xl text-xs sm:text-sm text-teal-950 leading-relaxed">
                      {selectedTerm.example}
                    </div>
                  </div>

                  {/* Real Situation */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Gyvenimiška situacija</span>
                    </h4>
                    <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs sm:text-sm text-amber-950 leading-relaxed italic">
                      „{selectedTerm.situation}“
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center text-slate-400">
                  Pasirinkite terminą kairėje
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* DAILY TIPS VIEW */
        <div className="space-y-6">
          {/* Time of Day Picker */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {DAILY_TIPS.map((tip) => {
              const isSelected = selectedDailyTip.id === tip.id;
              const hasTried = triedTips.includes(tip.id);

              return (
                <button
                  key={tip.id}
                  onClick={() => {
                    sounds.playPop();
                    setSelectedDailyTip(tip);
                  }}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 relative ${
                    isSelected
                      ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-300'
                      : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-2xl">{tip.icon}</span>
                  <span className="text-xs font-bold">{tip.dayTime}</span>
                  {hasTried && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 text-white rounded-full text-[9px] flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tip Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-3xl flex items-center justify-center shadow-inner">
                  {selectedDailyTip.icon}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                    Dienos etiketo praktika: {selectedDailyTip.dayTime}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-heading font-extrabold text-slate-900 pt-1">
                    {selectedDailyTip.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => handleTryTip(selectedDailyTip.id)}
                className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  triedTips.includes(selectedDailyTip.id)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xs hover:scale-102'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{triedTips.includes(selectedDailyTip.id) ? 'Išbandyta šiandien! ✓' : 'Išbandysiu šį patarimą (+5 ⭐)'}</span>
              </button>
            </div>

            {/* Tip Description */}
            <div className="p-4 sm:p-5 bg-teal-50/70 border border-teal-200/80 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-teal-600" />
                <span>Patarimas iš knygos</span>
              </h4>
              <p className="text-xs sm:text-sm text-teal-950 leading-relaxed">
                {selectedDailyTip.tip}
              </p>
            </div>

            {/* Actionable Step */}
            <div className="p-4 sm:p-5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Konkretus tavo žingsnis</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {selectedDailyTip.actionableStep}
              </p>
            </div>

            {/* Quote */}
            {selectedDailyTip.quote && (
              <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-2xl flex items-center gap-3 text-purple-950 text-xs sm:text-sm italic">
                <Quote className="w-5 h-5 text-purple-600 shrink-0" />
                <span>{selectedDailyTip.quote}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
