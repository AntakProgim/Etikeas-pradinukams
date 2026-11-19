import React, { useState } from 'react';
import { QUIZ_QUESTIONS, getQuizFeedback } from '../data/quizQuestions';
import { 
  Check, 
  X, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  Eye
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenDiploma: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onAddStars, onUnlockBadge, onOpenDiploma }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentAnswer = userAnswers[currentQ?.id];

  const handleAnswer = (answer: boolean) => {
    if (showExplanation) return;
    
    const isCorrect = answer === currentQ.correctAnswer;
    if (isCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }

    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: answer }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    sounds.playPop();
    setShowExplanation(false);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished!
      setIsFinished(true);
      
      // Calculate final score
      let score = 0;
      QUIZ_QUESTIONS.forEach((q) => {
        if (userAnswers[q.id] === q.correctAnswer) {
          score++;
        }
      });

      const starsEarned = score * 2;
      onAddStars(starsEarned);

      if (score >= 16) {
        onUnlockBadge('quiz_champion');
        sounds.playFanfare();
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {}
      } else {
        sounds.playCorrect();
      }
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentIndex(0);
    setUserAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
    setShowReview(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const finalScore = calculateScore();
  const feedback = getQuizFeedback(finalScore);

  // Category labels and colors
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'table': return { label: '🍽️ Stalo etiketas', color: 'bg-blue-100 text-blue-800' };
      case 'friends': return { label: '🤝 Draugai ir svečiai', color: 'bg-rose-100 text-rose-800' };
      case 'communication': return { label: '🗣️ Bendravimas', color: 'bg-purple-100 text-purple-800' };
      case 'hygiene': return { label: '🧼 Švara ir apranga', color: 'bg-teal-100 text-teal-800' };
      case 'public': return { label: '🏛️ Viešos vietos', color: 'bg-amber-100 text-amber-800' };
      default: return { label: '⭐ Etiketas', color: 'bg-slate-100 text-slate-800' };
    }
  };

  if (isFinished) {
    return (
      <div id="quiz-results-container" className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Results Card */}
        <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-amber-50 border border-amber-200 text-4xl shadow-inner">
            🏆
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider">
              Etiketo IQ rezultatai
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-800">
              {feedback.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
              {feedback.desc}
            </p>
          </div>

          {/* Big Score Box */}
          <div className="bg-gradient-to-tr from-amber-50 to-yellow-50 border-2 border-amber-200/80 rounded-2xl p-6 max-w-sm mx-auto shadow-xs">
            <div className="text-4xl sm:text-5xl font-heading font-extrabold text-amber-900">
              {finalScore} <span className="text-xl sm:text-2xl text-amber-600 font-normal">/ {totalQuestions}</span>
            </div>
            <div className="flex items-center justify-center gap-1 mt-2 text-xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < feedback.stars ? 'text-amber-400' : 'text-slate-200'}>
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-xs font-bold text-amber-800 mt-2">
              Uždirbai +{finalScore * 2} žvaigždutes!
            </p>
          </div>

          {/* Book Evaluation Scale Reference */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 text-slate-600">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>📖 Knygos „Good Manners for Today's Kids“ vertinimo skalė:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              <div className={`p-2 rounded-lg ${finalScore >= 19 ? 'bg-amber-100 font-bold text-amber-900' : ''}`}>
                👑 19–20 tšk: Etiketo čempionas (Klasės lyderis)
              </div>
              <div className={`p-2 rounded-lg ${finalScore >= 16 && finalScore <= 18 ? 'bg-amber-100 font-bold text-amber-900' : ''}`}>
                🌟 16–18 tšk: Puikus tėvų ir mokytojų paruošimas
              </div>
              <div className={`p-2 rounded-lg ${finalScore >= 11 && finalScore <= 15 ? 'bg-amber-100 font-bold text-amber-900' : ''}`}>
                👍 11–15 tšk: Teisingame kelyje, bet yra ko pasimokyti
              </div>
              <div className={`p-2 rounded-lg ${finalScore <= 10 ? 'bg-amber-100 font-bold text-amber-900' : ''}`}>
                📖 0–10 tšk: Verta pakartoti knygelės skyrius
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="btn-open-diploma-from-quiz"
              onClick={onOpenDiploma}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl font-heading font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer hover:scale-102 transition-all"
            >
              <Award className="w-5 h-5" />
              <span>Gauti mano diplomą 📜</span>
            </button>

            <button
              id="btn-toggle-quiz-review"
              onClick={() => {
                sounds.playPop();
                setShowReview(!showReview);
              }}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-heading font-medium text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>{showReview ? 'Slėpti atsakymus' : 'Peržiūrėti visus atsakymus'}</span>
            </button>

            <button
              id="btn-restart-quiz"
              onClick={handleRestart}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-heading font-medium text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Bandyti dar kartą</span>
            </button>
          </div>
        </div>

        {/* Answers Review Section */}
        {showReview && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="font-heading font-bold text-lg text-slate-800 flex items-center gap-2">
              <span>📋 Visi 20 klausimų ir paaiškinimai:</span>
            </h3>
            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q) => {
                const userAns = userAnswers[q.id];
                const isUserCorrect = userAns === q.correctAnswer;
                const cat = getCategoryLabel(q.category);

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border bg-white ${
                      isUserCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-xs font-bold flex items-center justify-center text-slate-700">
                          {q.id}
                        </span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold ${cat.color}`}>
                          {cat.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold">
                        {isUserCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Teisingai
                          </span>
                        ) : (
                          <span className="text-rose-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Suklydai
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-medium text-slate-800 text-sm mt-2">
                      {q.question}
                    </p>
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600">
                      <p>
                        <strong>Teisingas atsakymas.</strong>{' '}
                        <span className="font-bold text-slate-900">
                          {q.correctAnswer ? 'Taip' : 'Ne'}
                        </span>{' '}
                        (tavo pasirinkimas: {userAns ? 'Taip' : 'Ne'})
                      </p>
                      <p className="text-slate-700">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  const category = getCategoryLabel(currentQ.category);

  return (
    <div id="quiz-active-container" className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Top Progress bar */}
      <div className="bg-white border border-amber-100 rounded-2xl p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-heading font-bold text-slate-700">
            Klausimas {currentIndex + 1} iš {totalQuestions}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full font-medium text-[11px] ${category.color}`}>
            {category.label}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 font-heading font-extrabold text-lg flex items-center justify-center shrink-0 shadow-inner">
            {currentQ.id}
          </div>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-800 leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.hint && !showExplanation && (
              <p className="text-xs text-slate-400 flex items-center gap-1 pt-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Užuomina: {currentQ.hint}</span>
              </p>
            )}
          </div>
        </div>

        {/* Yes / No Choices */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
          {/* YES Button */}
          <button
            id="btn-quiz-yes"
            disabled={showExplanation}
            onClick={() => handleAnswer(true)}
            className={`py-4 sm:py-5 px-4 rounded-2xl font-heading font-bold text-base sm:text-lg flex flex-col sm:flex-row items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
              showExplanation
                ? currentQ.correctAnswer === true
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-300'
                  : currentAnswer === true
                  ? 'bg-rose-50 border-rose-400 text-rose-700'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                : 'bg-emerald-50/60 hover:bg-emerald-100 border-emerald-300 text-emerald-800 hover:scale-102 shadow-xs'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <span>Taip</span>
          </button>

          {/* NO Button */}
          <button
            id="btn-quiz-no"
            disabled={showExplanation}
            onClick={() => handleAnswer(false)}
            className={`py-4 sm:py-5 px-4 rounded-2xl font-heading font-bold text-base sm:text-lg flex flex-col sm:flex-row items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
              showExplanation
                ? currentQ.correctAnswer === false
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-300'
                  : currentAnswer === false
                  ? 'bg-rose-50 border-rose-400 text-rose-700'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                : 'bg-rose-50/60 hover:bg-rose-100 border-rose-300 text-rose-800 hover:scale-102 shadow-xs'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center">
              <X className="w-5 h-5 stroke-[3]" />
            </div>
            <span>Ne</span>
          </button>
        </div>

        {/* Explanation Card */}
        {showExplanation && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div
              className={`p-4 rounded-2xl border text-sm flex items-start gap-3 ${
                currentAnswer === currentQ.correctAnswer
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="text-2xl shrink-0">
                {currentAnswer === currentQ.correctAnswer ? '🎉' : '💡'}
              </div>
              <div className="space-y-1">
                <div className="font-heading font-bold">
                  {currentAnswer === currentQ.correctAnswer
                    ? 'Puiku, teisingas atsakymas!'
                    : 'Ne visai taip, bet pasimokykime!'}
                </div>
                <p className="text-xs sm:text-sm">{currentQ.explanation}</p>
              </div>
            </div>

            <button
              id="btn-quiz-next"
              onClick={handleNext}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-101 transition-all"
            >
              <span>{currentIndex + 1 === totalQuestions ? 'Baigti testą ir pamatyti rezultatą 🏆' : 'Kitas klausimas'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
