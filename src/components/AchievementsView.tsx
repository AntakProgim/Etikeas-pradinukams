import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Achievement } from '../types';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Trophy, 
  HeartHandshake,
  PartyPopper
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { fireBadgeUnlockConfetti, fireGentleConfetti } from '../utils/confetti';

interface AchievementsViewProps {
  unlockedBadgeIds: string[];
  stars: number;
  onOpenDiploma: () => void;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'respect_master',
    title: 'Pagarbos riteris / dama',
    description: 'Įsisavintas pagarbos ir Auksinės taisyklės skyrius.',
    icon: '❤️',
    category: 'Pagarba',
    unlocked: false,
  },
  {
    id: 'sportsmanship_badge',
    title: 'Garbingas žaidėjas',
    description: 'Išmoktos garbingo sporto, pergalės ir pralaimėjimo taisyklės.',
    icon: '⚽',
    category: 'Sportas',
    unlocked: false,
  },
  {
    id: 'hospitality_badge',
    title: 'Tobulas svečias ir šeimininkas',
    description: 'Įsisavintas svetingumo ir elgesio svečiuose skyrius.',
    icon: '🏡',
    category: 'Svetingumas',
    unlocked: false,
  },
  {
    id: 'dining_master',
    title: 'Stalo serviravimo meistras',
    description: 'Be klaidų padengtas stalas interaktyviame žaidime!',
    icon: '🍽️',
    category: 'Stalo etiketas',
    unlocked: false,
  },
  {
    id: 'hygiene_knight',
    title: 'Švaros ir tvarkos čempionas',
    description: 'Įsisavintas higienos, vonios ir mandagios aprangos skyrius.',
    icon: '🧼',
    category: 'Higiena',
    unlocked: false,
  },
  {
    id: 'words_master',
    title: 'Padėkos ir žodžių burtininkas',
    description: 'Sukurtas ir paruoštas nuoširdus padėkos atvirukas ar misija.',
    icon: '💌',
    category: 'Bendravimas',
    unlocked: false,
  },
  {
    id: 'scenario_hero',
    title: 'Gyvenimo situacijų herojus',
    description: 'Sėkmingai išspręsti keblūs nutikimai „Ką darytum tu?“ ar peržiūrėtos animacijos.',
    icon: '🦸‍♂️',
    category: 'Situacijos',
    unlocked: false,
  },
  {
    id: 'quiz_champion',
    title: 'Etiketo IQ genijus',
    description: 'Surinkta 16 ar daugiau taškų didžiajame 20 klausimų IQ teste!',
    icon: '🧠',
    category: 'IQ testas',
    unlocked: false,
  }
];

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  unlockedBadgeIds,
  stars,
  onOpenDiploma,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [celebratingBadgeId, setCelebratingBadgeId] = useState<string | null>(null);
  const [shakingBadgeId, setShakingBadgeId] = useState<string | null>(null);
  const feedbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const unlockedCount = ALL_ACHIEVEMENTS.filter((a) => unlockedBadgeIds.includes(a.id)).length;
  const progressPercent = Math.round((unlockedCount / ALL_ACHIEVEMENTS.length) * 100);

  const handleBadgeClick = (badge: Achievement, isUnlocked: boolean) => {
    if (feedbackTimerRef.current !== null) {
      window.clearTimeout(feedbackTimerRef.current);
    }

    if (isUnlocked) {
      sounds.playFanfare();
      fireBadgeUnlockConfetti();
      setShakingBadgeId(null);
      setCelebratingBadgeId(badge.id);
      feedbackTimerRef.current = window.setTimeout(() => {
        setCelebratingBadgeId(null);
      }, 550);
    } else {
      sounds.playPop();
      setCelebratingBadgeId(null);
      setShakingBadgeId(badge.id);
      feedbackTimerRef.current = window.setTimeout(() => {
        setShakingBadgeId(null);
      }, 420);
    }
  };

  return (
    <div id="achievements-container" className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              🏆 Tavo etiketo karūna
            </span>
            <span className="text-xs bg-white text-slate-900 font-bold px-2 py-0.5 rounded-full">
              {stars} ⭐ taškai
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Pasiekimai ir ženkleliai
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm max-w-lg">
            Rink etiketo ženklelius už dienos misijas, testus, stalo žaidimus, knygelės skyrius ir situacijas!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sounds.playFanfare();
              fireBadgeUnlockConfetti();
            }}
            className="px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-heading font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PartyPopper className="w-4 h-4 text-yellow-300" />
            <span>Fejerverkas! 🎉</span>
          </button>

          <button
            id="btn-open-diploma-achievements"
            onClick={() => {
              sounds.playPop();
              onOpenDiploma();
            }}
            className="px-5 py-3 bg-white text-amber-900 hover:bg-amber-50 rounded-2xl font-heading font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <Award className="w-5 h-5 text-amber-600" />
            <span>Atidaryti diplomą 📜</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Atrakinta ženklelių: {unlockedCount} iš {ALL_ACHIEVEMENTS.length}</span>
          <span className="text-amber-600 tabular-nums">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {ALL_ACHIEVEMENTS.map((badge, index) => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);
          const isCelebrating = celebratingBadgeId === badge.id;
          const isShaking = shakingBadgeId === badge.id;

          return (
            <motion.button
              key={badge.id}
              type="button"
              onClick={() => handleBadgeClick(badge, isUnlocked)}
              initial={
                shouldReduceMotion
                  ? { opacity: isUnlocked ? 1 : 0.65 }
                  : { opacity: 0, y: 14, scale: 0.96 }
              }
              animate={{
                opacity: isUnlocked ? 1 : 0.65,
                y: 0,
                scale: 1,
                transition: {
                  opacity: { duration: 0.25, delay: shouldReduceMotion ? 0 : index * 0.045 },
                  y: { type: 'spring', stiffness: 420, damping: 28, delay: shouldReduceMotion ? 0 : index * 0.045 },
                  scale: { type: 'spring', stiffness: 450, damping: 26, delay: shouldReduceMotion ? 0 : index * 0.045 },
                },
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : isUnlocked
                  ? { y: -4, scale: 1.02, transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] } }
                  : { y: -2, opacity: 0.85, transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] } }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : isUnlocked
                  ? { scale: 0.97, y: 0, transition: { duration: 0.1 } }
                  : { scale: 0.985, transition: { duration: 0.1 } }
              }
              className={`group p-5 rounded-3xl border-2 transition-[border-color,box-shadow,background-color] duration-200 flex flex-col justify-between text-center relative overflow-hidden cursor-pointer select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-100 hover:border-amber-400 hover:shadow-xl hover:ring-amber-200'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {/* Subtle metallic sheen sweep on hover for unlocked badges */}
              {isUnlocked && !shouldReduceMotion && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-amber-100/45 to-transparent skew-x-[-20deg]"
                />
              )}

              <div className="space-y-2 relative z-10 w-full">
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : isCelebrating
                      ? { scale: [1, 1.22, 0.95, 1.08, 1], rotate: [0, -8, 8, -4, 0] }
                      : isShaking
                      ? { x: [0, -4, 4, -3, 3, 0] }
                      : { scale: 1, rotate: 0, x: 0 }
                  }
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-3xl border shadow-inner transition-colors duration-200 ${
                    isUnlocked
                      ? 'bg-amber-50 border-amber-200 group-hover:bg-amber-100/80 group-hover:shadow-sm'
                      : 'bg-slate-100/80 border-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block transition-transform duration-200 ease-out ${
                      isUnlocked
                        ? 'group-hover:scale-110 group-hover:-rotate-6'
                        : 'group-hover:scale-105'
                    }`}
                  >
                    {isUnlocked ? badge.icon : '🔒'}
                  </span>
                </motion.div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {badge.category}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                    {badge.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 relative z-10 w-full">
                {isUnlocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 transition-transform duration-200 group-hover:scale-105">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Atrakinta! (Spustelėk šventei)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                    <Lock className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-6" /> Užrakinta
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

