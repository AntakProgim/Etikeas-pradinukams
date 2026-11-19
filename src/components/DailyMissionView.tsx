import React, { useState, useEffect } from 'react';
import { DailyMission, DailyMissionLog } from '../types';
import { DAILY_MISSIONS, getTodayMission, getTodayDateString } from '../data/dailyMissionsData';
import { 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Calendar, 
  Award, 
  HeartHandshake, 
  Smile, 
  Check, 
  PartyPopper,
  Info,
  RotateCcw
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { fireBadgeUnlockConfetti, fireGentleConfetti } from '../utils/confetti';

interface DailyMissionViewProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

export const DailyMissionView: React.FC<DailyMissionViewProps> = ({
  onAddStars,
  onUnlockBadge,
}) => {
  const todayDateStr = getTodayDateString();
  const [selectedMission, setSelectedMission] = useState<DailyMission>(() => getTodayMission());
  const [missionLogs, setMissionLogs] = useState<Record<string, DailyMissionLog>>(() => {
    const saved = localStorage.getItem('etiquette_daily_mission_logs');
    return saved ? JSON.parse(saved) : {};
  });

  const [checkedSteps, setCheckedSteps] = useState<boolean[]>(() => [false, false, false]);
  const [reflection, setReflection] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('😊');
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);

  const isTodayMission = selectedMission.id === getTodayMission().id;
  const todayLog = missionLogs[todayDateStr];
  const isTodayCompleted = todayLog && todayLog.completed;

  // Calculate current streak
  const calculateStreak = (): number => {
    let streak = 0;
    const today = new Date();
    
    // Check back up to 30 days
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const key = `${year}-${month}-${day}`;
      
      if (missionLogs[key]?.completed) {
        streak++;
      } else if (i > 0) {
        // Break streak if a past day was missed
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak();
  const totalCompleted = Object.values(missionLogs).filter((l) => l.completed).length;

  // Reset check steps when switching missions
  useEffect(() => {
    setCheckedSteps([false, false, false]);
  }, [selectedMission]);

  const handleToggleStep = (index: number) => {
    sounds.playPop();
    const next = [...checkedSteps];
    next[index] = !next[index];
    setCheckedSteps(next);
  };

  const handleCompleteMission = () => {
    if (isTodayCompleted) return;

    sounds.playFanfare();
    fireGentleConfetti({ count: 60, spread: 75 });
    fireBadgeUnlockConfetti();

    // Reward stars
    onAddStars(selectedMission.starsReward);

    // Save log
    const newLog: DailyMissionLog = {
      date: todayDateStr,
      missionId: selectedMission.id,
      completed: true,
      completedAt: new Date().toISOString(),
      reflection: reflection.trim(),
      moodEmoji: selectedMood,
    };

    const updated = {
      ...missionLogs,
      [todayDateStr]: newLog,
    };

    setMissionLogs(updated);
    localStorage.setItem('etiquette_daily_mission_logs', JSON.stringify(updated));
    setShowCelebrationModal(true);

    // If streak reaches milestone, unlock achievement
    if (streak + 1 >= 3) {
      onUnlockBadge('words_master');
    }
    onUnlockBadge('respect_master');
  };

  const moods = [
    { emoji: '😊', label: 'Džiaugsmingai' },
    { emoji: '🌟', label: 'Išdidžiai' },
    { emoji: '💖', label: 'Nuoširdžiai' },
    { emoji: '🦸‍♂️', label: 'Kaip herojus' },
  ];

  return (
    <div id="daily-mission-container" className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                Dienos etiketo misija
              </span>
              <span className="text-xs bg-amber-900/30 border border-amber-200/30 text-amber-100 font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date().toLocaleDateString('lt-LT', { month: 'long', day: 'numeric', weekday: 'long' })}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
              Viena maža mandagumo užduotis šiandienai!
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm max-w-lg leading-relaxed">
              Atlik paprastą gerumo žingsnį, ugdyk kasdienius įpročius ir užsidirbk papildomų žvaigždučių!
            </p>
          </div>

          {/* Streak & Stats Counter */}
          <div className="flex items-center gap-2.5 self-stretch sm:self-auto bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-amber-200">
                <Flame className={`w-5 h-5 ${streak > 0 ? 'text-amber-300 animate-pulse' : 'text-slate-300'}`} />
                <span className="font-heading font-extrabold text-lg text-white">{streak}</span>
              </div>
              <p className="text-[10px] text-amber-100 uppercase font-semibold">Dienų serija</p>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1 text-amber-200">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="font-heading font-extrabold text-lg text-white">{totalCompleted}</span>
              </div>
              <p className="text-[10px] text-amber-100 uppercase font-semibold">Įvykdyta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Mission Card */}
      <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-md space-y-6">
        {/* Mission Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-3xl shadow-md shadow-amber-200 border border-amber-300 shrink-0">
              {selectedMission.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {selectedMission.categoryLabel}
                </span>
                {isTodayCompleted && isTodayMission && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Šiandien jau atlikta!
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900 mt-1">
                {selectedMission.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-2 rounded-2xl">
            <span className="text-xl">⭐</span>
            <div>
              <span className="text-xs text-amber-800 font-bold block leading-none">
                +{selectedMission.starsReward} žvaigždutės
              </span>
              <span className="text-[10px] text-slate-500">Prizas už atlikimą</span>
            </div>
          </div>
        </div>

        {/* Goal & Context */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-800 space-y-1">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              🎯 Tavo dienos tikslas:
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
              {selectedMission.goal}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {selectedMission.context}
          </p>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2.5 text-xs text-slate-700 italic">
            <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{selectedMission.goldenRuleQuote}</span>
          </div>
        </div>

        {/* Practical Checklist Steps */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-600" />
            Praktiniai žingsniai (pažymėk, kai atliksi):
          </h3>
          <div className="space-y-2">
            {selectedMission.steps.map((step, idx) => {
              const isChecked = checkedSteps[idx] || (isTodayCompleted && isTodayMission);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleToggleStep(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 ${
                      isChecked
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'bg-white border-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through text-slate-500' : ''}`}>
                    {step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reflection & Completion Box */}
        {!isTodayCompleted && isTodayMission && (
          <div className="p-5 rounded-2xl bg-gradient-to-tr from-amber-50 to-orange-50/50 border border-amber-200 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kaip jauteisi atlikęs šią misiją? (Pasirink nuotaiką)
              </label>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => (
                  <button
                    key={m.emoji}
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setSelectedMood(m.emoji);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                      selectedMood === m.emoji
                        ? 'bg-white border-amber-400 text-amber-900 shadow-xs ring-2 ring-amber-200'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span className="text-base">{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mažas įspūdis ar kam padėkojai? (Neprivaloma)
              </label>
              <input
                type="text"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Pvz., padėkojau mokytojai už įdomią pamoką..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <button
              id="btn-complete-daily-mission"
              type="button"
              onClick={handleCompleteMission}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-heading font-extrabold text-sm sm:text-base shadow-md shadow-emerald-200 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PartyPopper className="w-5 h-5 text-amber-200" />
              <span>Įvykdžiau dienos misiją! (+{selectedMission.starsReward} ⭐)</span>
            </button>
          </div>
        )}

        {isTodayCompleted && isTodayMission && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-md shadow-emerald-200">
              🎉
            </div>
            <h4 className="font-heading font-extrabold text-slate-900 text-base">
              Šaunuolis! Šiandienos misija sėkmingai atlikta!
            </h4>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Gavai {selectedMission.starsReward} žvaigždutes! Sugrįžk rytoj naujai mandagumo užduočiai ir palaikyk savo dienų seriją.
            </p>
            {todayLog?.reflection && (
              <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-emerald-100 max-w-md mx-auto italic">
                {todayLog.moodEmoji} „{todayLog.reflection}“
              </p>
            )}
          </div>
        )}
      </div>

      {/* Mission Rotation Archive / Preview */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <h3 className="font-heading font-bold text-sm text-slate-900">
              Kitos dienos misijos ir idėjos
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Viso rinkinyje: {DAILY_MISSIONS.length} misijos
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {DAILY_MISSIONS.map((mission) => {
            const isSelected = selectedMission.id === mission.id;
            const isToday = mission.id === getTodayMission().id;

            return (
              <button
                key={mission.id}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setSelectedMission(mission);
                }}
                className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-100 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-amber-200 hover:bg-amber-50/30'
                }`}
              >
                <span className="text-2xl shrink-0 p-1 bg-amber-100/50 rounded-lg">{mission.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase text-amber-700">
                      {mission.categoryLabel}
                    </span>
                    {isToday && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-amber-500 text-white rounded">
                        Šiandien
                      </span>
                    )}
                  </div>
                  <h5 className="font-heading font-bold text-xs text-slate-900 truncate">
                    {mission.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {mission.goal}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 border-4 border-amber-300 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-amber-200 animate-bounce">
              ⭐
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Misija įvykdyta!
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900">
                Šaunuolis, etiketo čempione!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Gavai <span className="font-bold text-amber-600">+{selectedMission.starsReward} žvaigždutes</span> už gerumą ir mandagų poelgį.
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
              „Elkis su kitais taip, kaip norėtum, kad kiti elgtųsi su tavimi.“
            </div>

            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setShowCelebrationModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-heading font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Tęsti mokyklėlę! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
