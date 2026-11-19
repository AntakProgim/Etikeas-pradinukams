import React, { useState } from 'react';
import { TableSettingGame } from './TableSettingGame';
import { QuizView } from './QuizView';
import { SORTING_GAME_ITEMS, THEMED_QUIZZES } from '../data/themedGamesData';
import { SortingItem, ThemedQuiz } from '../types';
import { 
  UtensilsCrossed, 
  HelpCircle, 
  Check, 
  X, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  Zap, 
  Puzzle, 
  CheckCircle2, 
  XCircle,
  ArrowRight
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GamesCenterViewProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenDiploma: () => void;
}

type GameMode = 'table-setting' | 'sorting-game' | 'themed-quizzes' | 'grand-iq';

export const GamesCenterView: React.FC<GamesCenterViewProps> = ({
  onAddStars,
  onUnlockBadge,
  onOpenDiploma,
}) => {
  const [activeMode, setActiveMode] = useState<GameMode>('table-setting');

  // Sorting game state
  const [sortingIndex, setSortingIndex] = useState(0);
  const [sortingScore, setSortingScore] = useState(0);
  const [sortingAnswered, setSortingAnswered] = useState<boolean | null>(null);
  const [isSortingFinished, setIsSortingFinished] = useState(false);

  // Themed quiz state
  const [selectedThemedQuiz, setSelectedThemedQuiz] = useState<ThemedQuiz>(THEMED_QUIZZES[0]);
  const [themedQIndex, setThemedQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [themedScore, setThemedScore] = useState(0);
  const [isThemedFinished, setIsThemedFinished] = useState(false);

  // Sorting game handlers
  const currentSortingItem: SortingItem = SORTING_GAME_ITEMS[sortingIndex];

  const handleSortChoice = (userChoiceIsPolite: boolean) => {
    if (sortingAnswered !== null) return;

    const isCorrect = userChoiceIsPolite === currentSortingItem.isPolite;
    setSortingAnswered(userChoiceIsPolite);

    if (isCorrect) {
      sounds.playCorrect();
      setSortingScore((prev) => prev + 1);
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNextSort = () => {
    sounds.playPop();
    setSortingAnswered(null);

    if (sortingIndex + 1 < SORTING_GAME_ITEMS.length) {
      setSortingIndex((prev) => prev + 1);
    } else {
      setIsSortingFinished(true);
      onAddStars(sortingScore * 2);
      if (sortingScore >= 10) {
        onUnlockBadge('quiz_champion');
        sounds.playFanfare();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  const handleRestartSorting = () => {
    sounds.playPop();
    setSortingIndex(0);
    setSortingScore(0);
    setSortingAnswered(null);
    setIsSortingFinished(false);
  };

  // Themed Quiz handlers
  const currentThemedQ = selectedThemedQuiz.questions[themedQIndex];

  const handleSelectThemedOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (index === currentThemedQ.correctIndex) {
      sounds.playCorrect();
      setThemedScore((prev) => prev + 1);
    } else {
      sounds.playIncorrect();
    }
  };

  const handleNextThemedQ = () => {
    sounds.playPop();
    setSelectedOption(null);

    if (themedQIndex + 1 < selectedThemedQuiz.questions.length) {
      setThemedQIndex((prev) => prev + 1);
    } else {
      setIsThemedFinished(true);
      onAddStars(themedScore * 3);
      sounds.playFanfare();
    }
  };

  const handleRestartThemed = (quiz?: ThemedQuiz) => {
    sounds.playPop();
    if (quiz) setSelectedThemedQuiz(quiz);
    setThemedQIndex(0);
    setSelectedOption(null);
    setThemedScore(0);
    setIsThemedFinished(false);
  };

  return (
    <div id="games-center-container" className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Game Selector Menu Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
            🎮
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 leading-none">
              Žaidimai ir viktorinos
            </h2>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Rink žvaigždutes ir treniruok gerų manierų įgūdžius!
            </p>
          </div>
        </div>

        {/* Mode Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <button
            id="btn-mode-table"
            onClick={() => {
              sounds.playPop();
              setActiveMode('table-setting');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'table-setting'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Padenk stalą</span>
          </button>

          <button
            id="btn-mode-sorting"
            onClick={() => {
              sounds.playPop();
              setActiveMode('sorting-game');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'sorting-game'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Puzzle className="w-4 h-4" />
            <span>Mandagu ar ne? (40)</span>
          </button>

          <button
            id="btn-mode-themed"
            onClick={() => {
              sounds.playPop();
              setActiveMode('themed-quizzes');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'themed-quizzes'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Teminės viktorinos (8)</span>
          </button>

          <button
            id="btn-mode-iq"
            onClick={() => {
              sounds.playPop();
              setActiveMode('grand-iq');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === 'grand-iq'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span>Didysis testas (20)</span>
          </button>
        </div>
      </div>

      {/* GAME MODE 1: Table Setting */}
      {activeMode === 'table-setting' && (
        <TableSettingGame
          onAddStars={onAddStars}
          onUnlockBadge={onUnlockBadge}
        />
      )}

      {/* GAME MODE 2: Sorting Game "Mandagu ar Nemandagu?" */}
      {activeMode === 'sorting-game' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-md flex items-center justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase">
                Rūšiavimo žaidimas
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                Mandagu ar nemandagu?
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm">
                Perskaityk veiksmą ir nuspręsk: ar tai mandagus, ar nemandagus poelgis!
              </p>
            </div>
            <div className="bg-white/20 px-3 py-2 rounded-2xl text-center">
              <span className="text-xs text-emerald-100 block">Taškai</span>
              <span className="font-heading font-extrabold text-lg text-white">
                {sortingScore} / {SORTING_GAME_ITEMS.length}
              </span>
            </div>
          </div>

          {isSortingFinished ? (
            <div className="bg-white border-2 border-emerald-200 rounded-3xl p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto">
                🌟
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-extrabold text-slate-800">
                  Žaidimas baigtas!
                </h3>
                <p className="text-slate-600 text-sm">
                  Teisingai surūšiavai <strong>{sortingScore}</strong> iš <strong>{SORTING_GAME_ITEMS.length}</strong> poelgių!
                </p>
                <p className="text-xs font-bold text-amber-800">
                  Uždirbai +{sortingScore * 2} ⭐ žvaigždutes!
                </p>
              </div>

              <button
                onClick={handleRestartSorting}
                className="px-6 py-3 bg-slate-900 text-white font-heading font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Žaisti iš naujo
              </button>
            </div>
          ) : (
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Poelgis {sortingIndex + 1} iš {SORTING_GAME_ITEMS.length}</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-700">
                  {currentSortingItem.category}
                </span>
              </div>

              {/* Action Card */}
              <div className="p-6 bg-amber-50/80 border-2 border-dashed border-amber-300 rounded-2xl text-center space-y-3">
                <span className="text-3xl">🤔</span>
                <p className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-snug">
                  „{currentSortingItem.text}“
                </p>
              </div>

              {/* Choices */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  disabled={sortingAnswered !== null}
                  onClick={() => handleSortChoice(true)}
                  className={`py-4 rounded-2xl font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                    sortingAnswered !== null
                      ? currentSortingItem.isPolite === true
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-300'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800 hover:scale-102'
                  }`}
                >
                  <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                  <span>Mandagu ✅</span>
                </button>

                <button
                  disabled={sortingAnswered !== null}
                  onClick={() => handleSortChoice(false)}
                  className={`py-4 rounded-2xl font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                    sortingAnswered !== null
                      ? currentSortingItem.isPolite === false
                        ? 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-300'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                      : 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-800 hover:scale-102'
                  }`}
                >
                  <X className="w-5 h-5 text-rose-600 stroke-[3]" />
                  <span>Nemandagu ❌</span>
                </button>
              </div>

              {/* Feedback */}
              {sortingAnswered !== null && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div
                    className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 ${
                      sortingAnswered === currentSortingItem.isPolite
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-amber-50 border-amber-200 text-amber-950'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {sortingAnswered === currentSortingItem.isPolite ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Teisingai!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Suklydai, pasimokykime.</span>
                        </>
                      )}
                    </div>
                    <p>{currentSortingItem.explanation}</p>
                  </div>

                  <button
                    onClick={handleNextSort}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Kitas poelgis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* GAME MODE 3: Themed Quizzes */}
      {activeMode === 'themed-quizzes' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quiz Theme Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {THEMED_QUIZZES.map((quiz) => {
              const isSelected = selectedThemedQuiz.id === quiz.id;
              return (
                <button
                  key={quiz.id}
                  onClick={() => handleRestartThemed(quiz)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-300'
                      : 'bg-white/80 hover:bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-3xl shrink-0">{quiz.icon}</span>
                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight truncate">
                      {quiz.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-amber-700 font-bold">{quiz.category}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md font-medium">
                        {quiz.questions.length} klausimai
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Themed Quiz Box */}
          {isThemedFinished ? (
            <div className="bg-white border-2 border-amber-200 rounded-3xl p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95">
              <span className="text-4xl">🏆</span>
              <h3 className="text-2xl font-heading font-extrabold text-slate-800">
                {selectedThemedQuiz.title} įveikta!
              </h3>
              <p className="text-slate-600 text-sm">
                Surinkai <strong>{themedScore}</strong> iš <strong>{selectedThemedQuiz.questions.length}</strong> taškų!
              </p>
              <p className="text-xs font-bold text-amber-800">
                Uždirbai +{themedScore * 3} ⭐ žvaigždutes!
              </p>

              <button
                onClick={() => handleRestartThemed()}
                className="px-6 py-3 bg-slate-900 text-white font-heading font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Bandyti iš naujo
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-3">
                <span>Klausimas {themedQIndex + 1} iš {selectedThemedQuiz.questions.length}</span>
                <span className="text-amber-700 font-bold">{selectedThemedQuiz.category}</span>
              </div>

              <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900">
                {currentThemedQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentThemedQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = idx === currentThemedQ.correctIndex;

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectThemedOption(idx)}
                      className={`w-full p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center gap-3 ${
                        selectedOption !== null
                          ? isCorrectOption
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                            : isSelected
                            ? 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                          : 'bg-slate-50 hover:bg-amber-50/60 hover:border-amber-300 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        selectedOption !== null
                          ? isCorrectOption
                            ? 'bg-emerald-500 text-white'
                            : isSelected
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                          : 'bg-white text-slate-700 border'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {selectedOption !== null && (
                <div className="space-y-4 animate-in fade-in duration-200 pt-2">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <strong className="text-slate-900 block">📖 Knygos paaiškinimas.</strong>
                    <p>{currentThemedQ.explanation}</p>
                  </div>

                  <button
                    onClick={handleNextThemedQ}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Kitas klausimas</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* GAME MODE 4: Grand IQ Quiz (20 questions from book) */}
      {activeMode === 'grand-iq' && (
        <QuizView
          onAddStars={onAddStars}
          onUnlockBadge={onUnlockBadge}
          onOpenDiploma={onOpenDiploma}
        />
      )}
    </div>
  );
};
