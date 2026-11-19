export type ActiveTab = 
  | 'handbook' 
  | 'daily-mission'
  | 'scenarios' 
  | 'ai-animator'
  | 'games' 
  | 'glossary-tips' 
  | 'card-maker' 
  | 'owl-advisor' 
  | 'achievements';

export interface QuizQuestion {
  id: number;
  question: string;
  correctAnswer: boolean; // true = Taip, false = Ne
  explanation: string;
  category: 'table' | 'friends' | 'communication' | 'hygiene' | 'public' | 'sports';
  hint?: string;
}

export interface ScenarioChoice {
  text: string;
  isCorrect: boolean;
  feedback: string;
  etiquetteLesson: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: 'dining' | 'presentation' | 'visiting' | 'sports' | 'hygiene' | 'communication';
  categoryLabel: string;
  icon: string;
  situation: string;
  character: string;
  choices: ScenarioChoice[];
  difficulty: 'Pradedantysis' | 'Vidutinis';
}

export interface DailyMission {
  id: string;
  dayIndex: number;
  title: string;
  category: 'bendravimas' | 'namai' | 'stalas' | 'mokykla' | 'draugai' | 'sportas' | 'higiena';
  categoryLabel: string;
  icon: string;
  goal: string;
  context: string;
  goldenRuleQuote: string;
  steps: string[];
  starsReward: number;
}

export interface DailyMissionLog {
  date: string; // YYYY-MM-DD
  missionId: string;
  completed: boolean;
  completedAt?: string;
  reflection?: string;
  moodEmoji?: string;
}

export interface AnimationCharacter {
  id: string;
  name: string;
  role: string;
  avatar: string;
  personality: string;
  color: string;
}

export interface AnimationSceneFrame {
  step: number;
  stageTitle: string;
  characterAction: string;
  characterEmotion: 'happy' | 'thinking' | 'polite' | 'surprised' | 'proud';
  speechBubble: string;
  etiquetteTip: string;
  visualDescription: string;
  bgColor: string;
}

export interface AICharacterAnimationStory {
  id: string;
  title: string;
  situation: string;
  characterId: string;
  characterName: string;
  lessonSummary: string;
  magicPhrase: string;
  frames: AnimationSceneFrame[];
  videoOperationName?: string;
  videoUrl?: string;
  isCustomGenerated?: boolean;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  englishOrigin?: string;
  category: 'bendras' | 'stalas' | 'svetingumas' | 'sportas' | 'bendraujant';
  categoryLabel: string;
  definition: string;
  example: string;
  situation: string;
  icon: string;
}

export interface DailyTip {
  id: string;
  dayTime: 'Rytas' | 'Mokykla' | 'Pietūs' | 'Svečiuose' | 'Vakaras' | 'Vieša vieta';
  title: string;
  tip: string;
  actionableStep: string;
  icon: string;
  quote?: string;
}

export interface SortingItem {
  id: string;
  text: string;
  isPolite: boolean; // true = Mandagu, false = Nemandagu
  explanation: string;
  category: string;
}

export interface ThemedQuiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ChapterSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  badgeId: string;
  rules: {
    title: string;
    description: string;
    doText: string;
    dontText: string;
    icon?: string;
  }[];
  funFact: string;
  kidQuote: string;
}

export interface TableItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  targetSlot: 'left-fork' | 'center-plate' | 'right-knife' | 'right-spoon' | 'top-right-glass' | 'far-left-napkin';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
}

export interface ThankYouCardData {
  recipientName: string;
  occasion: string;
  message: string;
  senderName: string;
  theme: 'gold' | 'garden' | 'royal' | 'stars';
  sticker: string;
}

