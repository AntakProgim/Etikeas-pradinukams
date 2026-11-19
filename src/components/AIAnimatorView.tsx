import React, { useState, useEffect, useRef } from 'react';
import { AnimationCharacter, AICharacterAnimationStory, AnimationSceneFrame } from '../types';
import { ANIMATION_CHARACTERS, PRESET_ANIMATION_STORIES } from '../data/characterAnimationsData';
import { 
  Sparkles, 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Wand2, 
  Award, 
  MessageSquare, 
  CheckCircle2, 
  Loader2, 
  HeartHandshake,
  Lightbulb
} from 'lucide-react';
import { sounds, speech } from '../utils/audio';
import { fireGentleConfetti } from '../utils/confetti';

interface AIAnimatorViewProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

export const AIAnimatorView: React.FC<AIAnimatorViewProps> = ({
  onAddStars,
  onUnlockBadge,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<AnimationCharacter>(ANIMATION_CHARACTERS[0]);
  const [activeStory, setActiveStory] = useState<AICharacterAnimationStory>(PRESET_ANIMATION_STORIES[0]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [completedStories, setCompletedStories] = useState<string[]>(() => {
    const saved = localStorage.getItem('etiquette_completed_animations');
    return saved ? JSON.parse(saved) : [];
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const quickSituations = [
    { title: 'Kaip mandagiai pasiprašyti prie stalo', icon: '🍽️' },
    { title: 'Kaip pasisveikinti su nauju draugu', icon: '🤝' },
    { title: 'Kaip garbingai elgtis pralaimėjus žaidimą', icon: '⚽' },
    { title: 'Kaip pasidalinti žaislu ar pieštukais', icon: '🎨' },
    { title: 'Kaip atsiprašyti netyčia užgavus', icon: '🩹' },
    { title: 'Kaip mandagiai paklausti leidimo pasiskolinti', icon: '🔑' },
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => {
          if (prev < activeStory.frames.length - 1) {
            sounds.playPop();
            return prev + 1;
          } else {
            setIsPlaying(false);
            sounds.playCorrect();
            return prev;
          }
        });
      }, 4200);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeStory.frames.length]);

  const handleFrameChange = (index: number) => {
    speech.stop();
    sounds.playPop();
    setCurrentFrameIndex(index);
    if (index === activeStory.frames.length - 1) {
      handleCompleteStory();
    }
  };

  const handleCompleteStory = () => {
    if (!completedStories.includes(activeStory.id)) {
      sounds.playFanfare();
      fireGentleConfetti({ count: 50 });
      onAddStars(3);
      const next = [...completedStories, activeStory.id];
      setCompletedStories(next);
      localStorage.setItem('etiquette_completed_animations', JSON.stringify(next));
      onUnlockBadge('scenario_hero');
    }
  };



  // Generate custom situation with Gemini
  const handleGenerateCustomScene = async (situationText?: string) => {
    const textToUse = situationText || customPrompt.trim();
    if (!textToUse) return;

    sounds.playPop();
    setIsGenerating(true);
    setIsPlaying(false);
    setCurrentFrameIndex(0);

    try {
      const res = await fetch('/api/ai/generate-character-scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situation: textToUse,
          characterId: selectedCharacter.id,
          characterName: selectedCharacter.name,
        }),
      });

      if (!res.ok) throw new Error('Nepavyko sugeneruoti scenos.');
      const data: AICharacterAnimationStory = await res.json();
      data.isCustomGenerated = true;
      setActiveStory(data);
      sounds.playCorrect();
      fireGentleConfetti({ count: 40 });
    } catch (err) {
      console.error(err);
      // Fallback local scene
      const fallbackStory: AICharacterAnimationStory = {
        id: `custom_${Date.now()}`,
        title: textToUse,
        situation: textToUse,
        characterId: selectedCharacter.id,
        characterName: selectedCharacter.name,
        lessonSummary: 'Kiekviena situacija tampa paprastesnė, kai prisimename ramybę ir pagarbą kitiems.',
        magicPhrase: '„Ačiū, prašau ir atsiprašau – patys geriausi mano pagalbininkai!“',
        isCustomGenerated: true,
        frames: [
          {
            step: 1,
            stageTitle: '1. Iššūkio pradžia',
            characterAction: `${selectedCharacter.name} pastebi situaciją: „${textToUse}“. Reikia apsispręsti, kaip pasielgti gražiai.`,
            characterEmotion: 'thinking',
            speechBubble: 'Ką sako etiketo taisyklės? Pirmiausia nusiraminsiu ir pagalvosiu apie kitus!',
            etiquetteTip: 'Neskubėk veikti piktai ar pasimetęs – visada yra mandagus kelias.',
            visualDescription: `${selectedCharacter.name} susimąsto ir apgalvoja situaciją.`,
            bgColor: 'from-amber-100 to-orange-100'
          },
          {
            step: 2,
            stageTitle: '2. Mandagus sprendimas',
            characterAction: `${selectedCharacter.name} nusišypso, žiūri į akis ir pasirenka pagarbų elgesį.`,
            characterEmotion: 'polite',
            speechBubble: 'Aš elgsiuosi pagal Auksinę taisyklę – taip, kaip noriu, kad elgtųsi su manimi!',
            etiquetteTip: 'Šypsena ir ramus balsas padeda greičiausiai rasti bendrą kalbą.',
            visualDescription: `${selectedCharacter.name} kreipiasi į draugus su pagarba.`,
            bgColor: 'from-blue-100 to-cyan-100'
          },
          {
            step: 3,
            stageTitle: '3. Magiškas sakinys ar veiksmas',
            characterAction: `${selectedCharacter.name} pasako reikiamus mandagumo žodžius ir pasiūlo sprendimą.`,
            characterEmotion: 'happy',
            speechBubble: '„Ar galime kartu sutarti gražiai ir draugiškai?“',
            etiquetteTip: 'Stebuklingi žodžiai atveria visas širdis.',
            visualDescription: `${selectedCharacter.name} linksmai bendrauja su aplinkiniais.`,
            bgColor: 'from-emerald-100 to-teal-100'
          },
          {
            step: 4,
            stageTitle: '4. Graži pabaiga ir džiaugsmas',
            characterAction: `Visi draugai džiaugiasi, situacija išspręsta tobulai!`,
            characterEmotion: 'proud',
            speechBubble: 'Valio! Mandagus elgesys vėl nugalėjo!',
            etiquetteTip: 'Šaunuolis, tikras etiketo herojus!',
            visualDescription: `${selectedCharacter.name} mojuoja ir džiaugiasi kartu su draugais.`,
            bgColor: 'from-yellow-100 to-amber-100'
          }
        ]
      };
      setActiveStory(fallbackStory);
      sounds.playCorrect();
    } finally {
      setIsGenerating(false);
    }
  };

  const currentFrame: AnimationSceneFrame = activeStory.frames[currentFrameIndex] || activeStory.frames[0];
  const isCompleted = completedStories.includes(activeStory.id);

  return (
    <div id="ai-animator-container" className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              DI personažų animacijos
            </span>
            <span className="text-xs bg-white/20 text-white font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              Interaktyvus etiketo kinas
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Pamatyk, kaip mandagūs personažai elgiasi gyvenime!
          </h1>
          <p className="text-purple-100 text-xs sm:text-sm max-w-xl leading-relaxed">
            Pasirink mėgstamą personažą, situaciją (pvz., kaip mandagiai pasiprašyti prie stalo) arba sukurk savo situaciją su dirbtiniu intelektu.
          </p>
        </div>
      </div>

      {/* 1. Character Selector */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
        <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-600">
          Pasirink animacijos personažą
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {ANIMATION_CHARACTERS.map((char) => {
            const isSelected = selectedCharacter.id === char.id;
            return (
              <button
                key={char.id}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setSelectedCharacter(char);
                }}
                className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-50 border-purple-500 shadow-md ring-2 ring-purple-100 scale-102'
                    : 'bg-white border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${char.color} flex items-center justify-center text-2xl shadow-inner text-white`}>
                  {char.avatar}
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-xs text-slate-900 truncate">
                    {char.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">
                    {char.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Situations Quick Chips & Custom AI Generator */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Populiariausios situacijos iš knygelės
          </h3>
          <span className="text-[11px] text-slate-400">Spustelėk ir žiūrėk animaciją</span>
        </div>

        {/* Preset situation buttons */}
        <div className="flex flex-wrap gap-2">
          {PRESET_ANIMATION_STORIES.map((story) => {
            const isCurrent = activeStory.id === story.id;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => {
                  sounds.playPop();
                  setActiveStory(story);
                  setCurrentFrameIndex(0);
                  setIsPlaying(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-300'
                }`}
              >
                <span>🎬</span>
                <span>{story.title}</span>
              </button>
            );
          })}
          {quickSituations.slice(3).map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleGenerateCustomScene(q.title)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border bg-white border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-900 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{q.icon}</span>
              <span>{q.title}</span>
            </button>
          ))}
        </div>

        {/* Custom situation prompt input */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleGenerateCustomScene();
            }}
            placeholder="Pvz., Kaip mandagiai paklausti kelio parke ar pasisveikinti su pardavėju..."
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="button"
            onClick={() => handleGenerateCustomScene()}
            disabled={isGenerating || !customPrompt.trim()}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-heading font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Kuriama animacija...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-yellow-300" />
                <span>Sukurti su DI ✨</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Interactive Animated Scene Cinema Stage */}
      <div className="bg-white border-2 border-purple-200 rounded-3xl p-5 sm:p-7 shadow-lg space-y-6">
        {/* Stage Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                Personažas: {selectedCharacter.name} {selectedCharacter.avatar}
              </span>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Peržiūrėta (+3 ⭐)
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900 mt-1">
              {activeStory.title}
            </h2>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setIsPlaying(!isPlaying);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pauzė' : 'Automatinis rodymas'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playPop();
                setCurrentFrameIndex(0);
                setIsPlaying(false);
              }}
              className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600"
              title="Pradėti nuo pradžių"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Canvas / Animated Story Frame Stage */}
        <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${currentFrame.bgColor} border-2 border-white shadow-inner relative overflow-hidden transition-all duration-500`}>
          {/* Top Frame indicator */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-wide text-slate-800 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
              {currentFrame.stageTitle}
            </span>
            <span className="text-xs font-bold text-slate-600 bg-white/60 px-2.5 py-0.5 rounded-full">
              Kadras {currentFrameIndex + 1} iš {activeStory.frames.length}
            </span>
          </div>

          {/* Central Character & Comic Speech Bubble Stage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-2">
            {/* Animated Character Avatar Display */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-2">
              <div className="relative">
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr ${selectedCharacter.color} flex items-center justify-center text-6xl sm:text-7xl shadow-xl border-4 border-white animate-bounce-slow transform transition-transform`}>
                  {selectedCharacter.avatar}
                </div>
                {/* Emotion Badge */}
                <span className="absolute -bottom-2 -right-2 text-2xl bg-white p-1.5 rounded-full shadow-md border border-slate-100">
                  {currentFrame.characterEmotion === 'happy' && '😄'}
                  {currentFrame.characterEmotion === 'polite' && '✨'}
                  {currentFrame.characterEmotion === 'thinking' && '🤔'}
                  {currentFrame.characterEmotion === 'surprised' && '😮'}
                  {currentFrame.characterEmotion === 'proud' && '🏆'}
                </span>
              </div>
              <span className="font-heading font-extrabold text-sm text-slate-800">
                {selectedCharacter.name}
              </span>
            </div>

            {/* Comic Dialogue & Narrator Bubble */}
            <div className="md:col-span-8 space-y-3.5">
              {/* Character Speech Bubble */}
              <div className="bg-white rounded-3xl p-5 shadow-md border-2 border-slate-100 relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {selectedCharacter.name} sako
                    </span>
                    <p className="font-heading font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                      „{currentFrame.speechBubble}“
                    </p>
                  </div>


                </div>
                {/* Speech arrow */}
                <div className="hidden md:block absolute -left-2 top-8 w-4 h-4 bg-white transform rotate-45 border-l-2 border-b-2 border-slate-100" />
              </div>

              {/* Narrator Action Description */}
              <div className="bg-white/70 backdrop-blur-xs rounded-2xl p-3.5 border border-white/80 text-xs sm:text-sm text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                  Veiksmas
                </span>
                <p className="leading-relaxed">{currentFrame.characterAction}</p>
              </div>

              {/* Etiquette Tip */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 text-xs text-amber-950 flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Etiketo patarimas. </span>
                    <span>{currentFrame.etiquetteTip}</span>
                  </div>
                </div>


              </div>
            </div>
          </div>

          {/* Stepper Dots & Navigation Bar */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/60">
            <button
              type="button"
              disabled={currentFrameIndex === 0}
              onClick={() => handleFrameChange(currentFrameIndex - 1)}
              className="px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 disabled:opacity-40 font-heading font-semibold text-xs shadow-xs flex items-center gap-1 cursor-pointer transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Atgal</span>
            </button>

            {/* Frame step buttons */}
            <div className="flex items-center gap-1.5">
              {activeStory.frames.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleFrameChange(idx)}
                  className={`w-8 h-8 rounded-xl font-heading font-bold text-xs transition-all cursor-pointer ${
                    currentFrameIndex === idx
                      ? 'bg-slate-900 text-white scale-110 shadow-sm'
                      : 'bg-white/70 hover:bg-white text-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentFrameIndex === activeStory.frames.length - 1}
              onClick={() => handleFrameChange(currentFrameIndex + 1)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40 font-heading font-semibold text-xs shadow-xs flex items-center gap-1 cursor-pointer transition-all"
            >
              <span>Kitas kadras</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lesson Summary & Magic Phrase Bar */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase text-amber-800">
              Magiškas sakinys įsiminti
            </span>
            <p className="font-heading font-extrabold text-sm text-slate-900">
              {activeStory.magicPhrase}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCompleteStory}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>Supratau ir išmokau! (+3 ⭐)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
