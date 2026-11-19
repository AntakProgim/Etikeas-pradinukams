import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { HandbookView } from './components/HandbookView';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { DailyMissionView } from './components/DailyMissionView';
import { AIAnimatorView } from './components/AIAnimatorView';
import { GamesCenterView } from './components/GamesCenterView';
import { GlossaryTipsView } from './components/GlossaryTipsView';
import { ThankYouCardMaker } from './components/ThankYouCardMaker';
import { OwlAdvisor } from './components/OwlAdvisor';
import { AchievementsView } from './components/AchievementsView';
import { DiplomaModal } from './components/DiplomaModal';
import { 
  HeartHandshake, 
  Sparkles, 
  Award,
  PartyPopper
} from 'lucide-react';
import { sounds } from './utils/audio';
import { fireBadgeUnlockConfetti, fireStarMilestoneConfetti, fireGentleConfetti } from './utils/confetti';

interface ToastNotification {
  id: string;
  type: 'badge' | 'stars' | 'milestone';
  title: string;
  message: string;
  icon: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('handbook');
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('etiquette_stars');
    return saved ? parseInt(saved, 10) : 10; // 10 starter stars!
  });



  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem('etiquette_badges');
    return saved ? JSON.parse(saved) : ['respect_master'];
  });

  const [masteredChapters, setMasteredChapters] = useState<string[]>(() => {
    const saved = localStorage.getItem('etiquette_mastered_chapters');
    return saved ? JSON.parse(saved) : ['respect'];
  });

  const [isDiplomaOpen, setIsDiplomaOpen] = useState<boolean>(false);
  const [activeToast, setActiveToast] = useState<ToastNotification | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('etiquette_stars', stars.toString());
  }, [stars]);



  useEffect(() => {
    localStorage.setItem('etiquette_badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  useEffect(() => {
    localStorage.setItem('etiquette_mastered_chapters', JSON.stringify(masteredChapters));
  }, [masteredChapters]);

  const showToast = (toast: ToastNotification) => {
    setActiveToast(toast);
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === toast.id ? null : curr));
    }, 4500);
  };

  const handleAddStars = (count: number) => {
    setStars((prev) => {
      const next = prev + count;
      const milestones = [25, 50, 75, 100, 150, 200];
      const reachedMilestone = milestones.find((m) => prev < m && next >= m);

      if (reachedMilestone) {
        sounds.playFanfare();
        fireStarMilestoneConfetti();
        showToast({
          id: `milestone_${Date.now()}`,
          type: 'milestone',
          title: `Pasiektas ${reachedMilestone} žvaigždučių lygis! ⭐`,
          message: `Nuostabu! Esi tikras mandagumo ir gerų manierų pavyzdys!`,
          icon: '🌟',
        });
      } else {
        fireGentleConfetti({ count: 35 });
      }
      return next;
    });
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (!unlockedBadges.includes(badgeId)) {
      setUnlockedBadges((prev) => [...prev, badgeId]);
      sounds.playFanfare();
      fireBadgeUnlockConfetti();
      showToast({
        id: `badge_${badgeId}_${Date.now()}`,
        type: 'badge',
        title: 'Atrakintas naujas pasiekimo ženklelis! 🏆',
        message: 'Pažvelk į pasiekimų skiltį ir pamatyk savo naują trofėjų!',
        icon: '🎖️',
      });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/30 flex flex-col font-sans selection:bg-amber-200 relative">
      {/* Top Floating Toast Banner */}
      {activeToast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300 max-w-sm w-full">
          <div className="bg-white/95 backdrop-blur-md border-2 border-amber-300 rounded-2xl p-4 shadow-xl flex items-start gap-3 text-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-2xl shadow-sm shrink-0">
              {activeToast.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                {activeToast.title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                {activeToast.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stars={stars}
        onOpenDiploma={() => setIsDiplomaOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'handbook' && (
          <HandbookView
            onAddStars={handleAddStars}
            onUnlockBadge={handleUnlockBadge}
            masteredChapters={masteredChapters}
            setMasteredChapters={setMasteredChapters}
          />
        )}

        {activeTab === 'daily-mission' && (
          <DailyMissionView
            onAddStars={handleAddStars}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {activeTab === 'scenarios' && (
          <ScenarioSimulator
            onAddStars={handleAddStars}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {activeTab === 'ai-animator' && (
          <AIAnimatorView
            onAddStars={handleAddStars}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {activeTab === 'games' && (
          <GamesCenterView
            onAddStars={handleAddStars}
            onUnlockBadge={handleUnlockBadge}
            onOpenDiploma={() => setIsDiplomaOpen(true)}
          />
        )}

        {activeTab === 'glossary-tips' && (
          <GlossaryTipsView
            onAddStars={handleAddStars}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {activeTab === 'card-maker' && (
          <ThankYouCardMaker
            onAddStars={handleAddStars}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {activeTab === 'owl-advisor' && (
          <OwlAdvisor
            onAddStars={handleAddStars}
          />
        )}

        {activeTab === 'achievements' && (
          <AchievementsView
            unlockedBadgeIds={unlockedBadges}
            stars={stars}
            onOpenDiploma={() => setIsDiplomaOpen(true)}
          />
        )}
      </main>

      {/* Printable / Viewable Official Diploma Modal */}
      <DiplomaModal
        isOpen={isDiplomaOpen}
        onClose={() => setIsDiplomaOpen(false)}
        stars={stars}
        unlockedBadgeCount={unlockedBadges.length}
      />

      {/* Playful Bottom Footer */}
      <footer className="bg-white border-t border-amber-100 py-6 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 text-amber-700 font-heading font-semibold">
          <HeartHandshake className="w-4 h-4 text-amber-500" />
          <span>„Elkis su kitais taip, kaip norėtum, kad kiti elgtųsi su tavimi.“</span>
        </div>
        <p className="text-slate-400 text-[11px]">
          Sukurta remiantis Bob & Emilie Barnes knyga „Good Manners for Today's Kids“ (Etiketas šiandienos vaikams).
        </p>
      </footer>
    </div>
  );
}


