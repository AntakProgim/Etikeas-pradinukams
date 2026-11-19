import React, { useState } from 'react';
import { SCENARIOS } from '../data/scenarios';
import { Scenario, ScenarioChoice } from '../types';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Heart,
  User,
  Filter,
  Layers
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ScenarioSimulatorProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  onAddStars,
  onUnlockBadge,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [solvedAll, setSolvedAll] = useState(false);

  const categories = [
    { id: 'all', label: 'Visos situacijos' },
    { id: 'dining', label: '🍽️ Vakarienė su šeimininkais' },
    { id: 'presentation', label: '🎤 Pristatymas viešai' },
    { id: 'visiting', label: '🏡 Svečiuose & Privatumas' },
    { id: 'sports', label: '⚽ Sportas & Garbingumas' },
    { id: 'communication', label: '🎁 Dovanos & Padėka' },
  ];

  const filteredScenarios = SCENARIOS.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const safeIndex = Math.min(currentIndex, filteredScenarios.length - 1);
  const currentScenario: Scenario = filteredScenarios[safeIndex] || SCENARIOS[0];
  const isAnswered = selectedChoice !== null;

  const handleSelectChoice = (choice: ScenarioChoice) => {
    if (isAnswered) return;
    setSelectedChoice(choice);

    if (choice.isCorrect) {
      sounds.playCorrect();
      if (!completedScenarios.includes(currentScenario.id)) {
        setCompletedScenarios((prev) => [...prev, currentScenario.id]);
        onAddStars(10);
      }
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setSelectedChoice(null);

    if (safeIndex + 1 < filteredScenarios.length) {
      setCurrentIndex(safeIndex + 1);
    } else {
      setSolvedAll(true);
      onUnlockBadge('scenario_hero');
      sounds.playFanfare();
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentIndex(0);
    setSelectedChoice(null);
    setSolvedAll(false);
  };

  const handleSelectSpecificScenario = (index: number) => {
    sounds.playPop();
    setCurrentIndex(index);
    setSelectedChoice(null);
    setSolvedAll(false);
  };

  return (
    <div id="scenarios-container" className="max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              🎭 Tikros gyvenimo situacijos
            </span>
            <span className="text-xs bg-yellow-400 text-slate-900 font-bold px-2.5 py-0.5 rounded-full">
              +10 ⭐ už teisingą sprendimą
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Ką darytum tu?
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-lg">
            Spręsk keblius socialinius nutikimus pagal knygą „Good Manners for Today's Kids“: vakarienė su šeimininkais, viešas prisistatymas, pagarba privatumui ir garbingas žaidimas.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white/15 backdrop-blur-xs border border-white/20 rounded-2xl p-3 text-center min-w-[130px]">
          <span className="text-xs text-emerald-100 font-medium block">Išspręsta iš viso</span>
          <span className="text-xl font-heading font-extrabold text-white">
            {completedScenarios.length} / {SCENARIOS.length}
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playPop();
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              setSelectedChoice(null);
              setSolvedAll(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Scenarios Mini-Nav List */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filteredScenarios.map((s, idx) => {
          const isDone = completedScenarios.includes(s.id);
          const isCurrent = idx === safeIndex;

          return (
            <button
              key={s.id}
              onClick={() => handleSelectSpecificScenario(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer border ${
                isCurrent
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{idx + 1}. {s.title.split(' ')[0]}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {solvedAll ? (
        /* Completion Screen */
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto">
            🌟
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase">
              Etiketo išminčius
            </span>
            <h2 className="text-2xl font-heading font-extrabold text-slate-800">
              Valio! Perėjai visas šios kategorijos situacijas!
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Dabar tiksliai žinai, kaip elgtis bet kokioje netikėtoje ar nemalonioje padėtyje. Esi tikras etiketo superherojus!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="btn-restart-scenarios"
              onClick={handleRestart}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-heading font-bold text-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Pradėti situacijas iš naujo</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Scenario Card */
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg font-bold">
                  {safeIndex + 1}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    {currentScenario.categoryLabel}
                  </span>
                  <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900">
                    {currentScenario.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Herojus – <strong>{currentScenario.character}</strong></span>
              </div>
            </div>

            {/* Situation Story Box */}
            <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-slate-800 text-sm sm:text-base leading-relaxed flex items-start gap-3">
              <span className="text-2xl shrink-0">📖</span>
              <div>
                <strong className="text-amber-950">Situacija.</strong> {currentScenario.situation}
              </div>
            </div>

            {/* Choices */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pasirink geriausią elgesio variantą:
              </h3>

              <div className="space-y-2.5">
                {currentScenario.choices.map((choice, idx) => {
                  const isThisSelected = selectedChoice === choice;
                  return (
                    <button
                      key={idx}
                      id={`scenario-choice-${idx}`}
                      disabled={isAnswered}
                      onClick={() => handleSelectChoice(choice)}
                      className={`w-full p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-start gap-3 ${
                        isAnswered
                          ? choice.isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium'
                            : isThisSelected
                            ? 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                          : 'bg-white hover:bg-emerald-50/50 hover:border-emerald-300 border-slate-200 text-slate-800 hover:shadow-xs'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isAnswered
                          ? choice.isCorrect
                            ? 'bg-emerald-500 text-white'
                            : isThisSelected
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm leading-snug flex-1">
                        {choice.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback & Etiquette Lesson */}
            {selectedChoice && (
              <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                <div
                  className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                    selectedChoice.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-heading font-bold text-base">
                    {selectedChoice.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Teisingas pasirinkimas!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Tai nebūtų geriausias sprendimas</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed">{selectedChoice.feedback}</p>
                  
                  <div className="p-3.5 bg-white/85 rounded-xl border border-slate-200 text-slate-700 mt-2 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Ką sako etiketo knyga</span>
                    </div>
                    <p className="text-xs">{selectedChoice.etiquetteLesson}</p>
                  </div>
                </div>

                <button
                  id="btn-scenario-next"
                  onClick={handleNext}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-101 transition-all"
                >
                  <span>
                    {safeIndex + 1 === filteredScenarios.length
                      ? 'Baigti šią kategoriją 🏆'
                      : 'Kita situacija'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
