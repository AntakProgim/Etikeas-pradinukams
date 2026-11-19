import React, { useState } from 'react';
import { BOOK_SECTIONS } from '../data/bookContent';
import { 
  HeartHandshake, 
  Trophy, 
  Home, 
  UtensilsCrossed, 
  Sparkles, 
  MessageSquareQuote,
  Search,
  CheckCircle,
  Lightbulb,
  Quote,
  Check,
  X,
  BookmarkCheck
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface HandbookViewProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  masteredChapters: string[];
  setMasteredChapters: React.Dispatch<React.SetStateAction<string[]>>;
}

export const HandbookView: React.FC<HandbookViewProps> = ({
  onAddStars,
  onUnlockBadge,
  masteredChapters,
  setMasteredChapters,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(BOOK_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const currentChapter = BOOK_SECTIONS.find((c) => c.id === selectedChapterId) || BOOK_SECTIONS[0];
  const isMastered = masteredChapters.includes(currentChapter.id);

  const handleMarkMastered = () => {
    sounds.playPop();
    if (!isMastered) {
      setMasteredChapters((prev) => [...prev, currentChapter.id]);
      onAddStars(15);
      onUnlockBadge(currentChapter.badgeId);
      sounds.playCorrect();
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'MessageSquareQuote': return <MessageSquareQuote className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Filtered rules if searching
  const isSearching = searchQuery.trim().length > 0;
  const filteredSections = BOOK_SECTIONS.map((sec) => ({
    ...sec,
    rules: sec.rules.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.doText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.dontText.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((sec) => sec.rules.length > 0 || sec.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Get illustration for chapter
  const getChapterIllustration = (chapterId: string) => {
    switch (chapterId) {
      case 'ch-friends':
      case 'ch-public':
      case 'ch-communication':
        return {
          src: '/images/kids_friendship.jpg',
          alt: 'Draugystė ir mandagus bendravimas'
        };
      case 'ch-dining':
        return {
          src: '/images/kids_dining_table.jpg',
          alt: 'Vaikai prie gražiai paserviruoto stalo'
        };
      default:
        return {
          src: '/images/owl_teacher.jpg',
          alt: 'Išmintingoji pelėda mokytoja'
        };
    }
  };

  const chapterImage = getChapterIllustration(currentChapter.id);

  return (
    <div id="handbook-container" className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-xs">
            📚 Etiketo žinynas pradinukams
          </span>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold tracking-tight">
            Pelėdos pamokos
          </h1>
          <p className="text-amber-100 text-xs sm:text-base leading-relaxed">
            Išmok svarbiausių taisyklių iš knygos „Good Manners for Today's Kids“: pagarba draugams, stalo etiketas, švara, sąžiningas sportas ir mandagus bendravimas!
          </p>

          {/* Quick Search */}
          <div className="pt-2">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-handbook"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ieškok taisyklės (pvz. peilis, dovana, čiaudulys, svečiai)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/95 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Owl mascot image in header */}
        <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white/30 shrink-0 bg-amber-700/40">
          <img 
            src="/images/owl_teacher.jpg" 
            alt="Pelėda mokytoja" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/src/assets/images/owl_teacher_1789803378582.jpg';
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isSearching ? (
        /* Search Results View */
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-slate-800">
              🔍 Paieškos rezultatai pagal „{searchQuery}“:
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-amber-700 hover:underline font-semibold cursor-pointer"
            >
              Išvalyti paiešką
            </button>
          </div>

          {filteredSections.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
              <p className="text-slate-500 text-sm">Nerasta taisyklių pagal jūsų užklausą.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Rodyti visus skyrius
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredSections.map((sec) => (
                <div key={sec.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-heading font-bold text-base text-slate-800 flex items-center gap-2">
                    {getIcon(sec.icon)}
                    <span>{sec.title}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.rules.map((rule, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
                        <h4 className="font-bold text-slate-900 text-sm">{rule.title}</h4>
                        <p className="text-slate-600">{rule.description}</p>
                        <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-900 border border-emerald-200">
                          <strong>✅ Tinkamas elgesys.</strong> {rule.doText}
                        </div>
                        <div className="p-2.5 bg-rose-50 rounded-lg text-rose-900 border border-rose-200">
                          <strong>❌ Nederamas elgesys.</strong> {rule.dontText}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Normal Chapter Navigation & Content View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chapter Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-500 px-2">
              Knygos skyriai
            </h3>
            <div className="space-y-1.5">
              {BOOK_SECTIONS.map((sec) => {
                const isSelected = sec.id === selectedChapterId;
                const mastered = masteredChapters.includes(sec.id);

                return (
                  <button
                    key={sec.id}
                    id={`chapter-nav-${sec.id}`}
                    onClick={() => {
                      sounds.playPop();
                      setSelectedChapterId(sec.id);
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between gap-3 border cursor-pointer ${
                      isSelected
                        ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-300/60'
                        : 'bg-white/70 hover:bg-white border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-amber-500 text-white shadow-xs' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {getIcon(sec.icon)}
                      </div>
                      <div>
                        <div className="font-heading font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                          {sec.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {sec.subtitle}
                        </div>
                      </div>
                    </div>

                    {mastered && (
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0" title="Skyrius įsisavintas!">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Main Details View */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header with Title & Read Button & Chapter Illustration */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    {getIcon(currentChapter.icon)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                      {currentChapter.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {currentChapter.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  id="btn-master-chapter"
                  onClick={handleMarkMastered}
                  disabled={isMastered}
                  className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isMastered
                      ? 'bg-emerald-100 text-emerald-800 cursor-default'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-xs hover:scale-102'
                  }`}
                >
                  {isMastered ? (
                    <>
                      <BookmarkCheck className="w-4 h-4" />
                      <span>Įsisavinta! (+15 ⭐)</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Išmokau šį skyrių (+15 ⭐)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Story Chapter Illustration Banner */}
              <div className="rounded-2xl overflow-hidden border border-amber-200/80 bg-amber-50 shadow-inner flex flex-col sm:flex-row items-center gap-4 p-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-sm shrink-0 border-2 border-white bg-amber-100">
                  <img 
                    src={chapterImage.src} 
                    alt={chapterImage.alt}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/owl_teacher.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                    Pamokėlės iliustracija
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {currentChapter.id === 'respect'
                      ? 'Laikykis auksinės taisyklės — praktikuokis kiekvieną dieną ir tapk tikru etiketo žinovu!'
                      : `${currentChapter.subtitle} — praktikuokis kiekvieną dieną ir tapk tikru etiketo žinovu!`}
                  </p>
                </div>
              </div>

              {/* Rules Cards List */}
              <div className="grid grid-cols-1 gap-4 pt-2">
                {currentChapter.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                        {rule.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                      {rule.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 pl-0 sm:pl-8">
                      {/* DO CARD */}
                      <div className="p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                          <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
                          <span>Tinkamas elgesys</span>
                        </div>
                        <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                          {rule.doText}
                        </p>
                      </div>

                      {/* DON'T CARD */}
                      <div className="p-3 bg-rose-50/90 border border-rose-200 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                          <X className="w-4 h-4 stroke-[3] text-rose-600" />
                          <span>Nederamas elgesys</span>
                        </div>
                        <p className="text-xs text-rose-950 font-medium leading-relaxed">
                          {rule.dontText}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fun Fact & Quote Callout Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Ar žinojai?</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    {currentChapter.funFact}
                  </p>
                </div>

                <div className="p-4 bg-purple-50/90 border border-purple-200 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                    <Quote className="w-4 h-4 text-purple-600" />
                    <span>Auksinė mintis</span>
                  </div>
                  <p className="text-xs text-purple-950 italic leading-relaxed">
                    {currentChapter.kidQuote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
