import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  RotateCcw,
  User
} from 'lucide-react';
import { sounds, speech } from '../utils/audio';

interface OwlAdvisorProps {
  onAddStars: (count: number) => void;
}

interface OwlMessage {
  id: string;
  question?: string;
  answer: string;
  tips: string[];
}

const QUICK_PROMPTS = [
  'Ką daryti, jei svečiuose patiekė maisto, kurio nemėgstu?',
  'Kaip mandagiai pasisveikinti su mokytoju ar draugo tėvais?',
  'Ką daryti, jei žaisdamas netyčia sulaužiau draugo daiktą?',
  'Kaip elgtis, jei per stalo žaidimą klasiokas sukčiauja?',
  'Ką daryti, jei prie stalo netyčia atsirūgau ar nusičiaudėjau?',
  'Kaip mandagiai pasakyti „Ačiū“ už dovaną, kuri man nelabai patinka?'
];

const INITIAL_MESSAGE: OwlMessage = {
  id: 'welcome',
  answer: 'Labas! Aš esu Išmintingoji Etiketo Pelėda 🦉. Užduok man bet kokį klausimą apie tai, kaip mandagiai ir gražiai elgtis mokykloje, namuose, prie stalo ar žaidžiant su draugais!',
  tips: [
    'Visada atsimink Auksinę taisyklę: elkis taip, kaip norėtum, kad elgtųsi su tavimi!',
    'Šypsena ir geri žodžiai atveria visas duris.',
    'Pasirink vieną iš paruoštų klausimų apačioje arba įrašyk savo!'
  ]
};

export const OwlAdvisor: React.FC<OwlAdvisorProps> = ({ onAddStars }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastFailedQuestion, setLastFailedQuestion] = useState<string | null>(null);
  const [messages, setMessages] = useState<OwlMessage[]>([INITIAL_MESSAGE]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 1 || loading) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, loading]);

  const handleAsk = async (queryText?: string) => {
    const q = (queryText ?? question).trim();
    if (!q || loading) return;

    speech.stop();
    sounds.playPop();
    setLoading(true);
    setErrorMsg(null);
    setLastFailedQuestion(null);
    setPendingQuestion(q);
    if (!queryText) {
      setQuestion('');
    }

    try {
      const res = await fetch('/api/ask-owl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Nepavyko gauti pelėdos atsakymo.');
      }

      const answerText = typeof data.answer === 'string' && data.answer.trim()
        ? data.answer
        : 'Pelėda paruošė patarimą, bet tekstas buvo tuščias. Pabandyk paklausti dar kartą!';
      const tipsList = Array.isArray(data.tips) ? data.tips : [];

      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now()}`,
          question: q,
          answer: answerText,
          tips: tipsList,
        },
      ]);
      sounds.playCorrect();
      onAddStars(5);
    } catch (err: unknown) {
      console.error('Ask owl error:', err);
      const msg = err instanceof Error ? err.message : 'Nepavyko susisiekti su pelėda. Patikrink interneto ryšį ir bandyk dar kartą.';
      setErrorMsg(msg);
      setLastFailedQuestion(q);
    } finally {
      setLoading(false);
      setPendingQuestion(null);
    }
  };

  return (
    <div id="owl-advisor-container" className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 rounded-3xl p-5 sm:p-6 text-white shadow-md flex items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            Išmintingasis etiketo pagalbininkas
          </span>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Klausk pelėdos
          </h1>
          <p className="text-teal-100 text-xs sm:text-sm">
            Turi klausimą apie etiketo paslaptis? Paklausk pelėdos ir gauk linksmą, išmintingą patarimą!
          </p>
        </div>

        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white/40 shrink-0 bg-teal-700/50">
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

      {/* Main Chat/Response Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-5">
        {/* Conversation Messages */}
        <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {msg.question && (
                <div className="flex items-start justify-end gap-2.5">
                  <div className="px-4 py-2.5 bg-indigo-600 text-white rounded-2xl rounded-tr-sm text-xs sm:text-sm font-medium max-w-[85%] shadow-xs">
                    {msg.question}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl overflow-hidden border border-teal-300 shadow-xs shrink-0 bg-teal-100">
                  <img 
                    src="/images/owl_teacher.jpg" 
                    alt="Pelėdos avataras" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/owl_teacher_1789803378582.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="p-4 sm:p-5 bg-teal-50/70 border border-teal-200/80 rounded-2xl text-slate-800 text-xs sm:text-sm leading-relaxed space-y-3">
                    <p className="whitespace-pre-line">{msg.answer}</p>

                    {msg.tips && msg.tips.length > 0 && (
                      <div className="pt-2 border-t border-teal-200/60 space-y-1.5">
                        <span className="font-heading font-bold text-teal-950 text-xs block">
                          ✨ Svarbiausi pelėdos žingsniai:
                        </span>
                        <ul className="space-y-1">
                          {msg.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-xs text-teal-900">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && pendingQuestion && (
            <div className="space-y-3">
              <div className="flex items-start justify-end gap-2.5">
                <div className="px-4 py-2.5 bg-indigo-600 text-white rounded-2xl rounded-tr-sm text-xs sm:text-sm font-medium max-w-[85%] shadow-xs">
                  {pendingQuestion}
                </div>
                <div className="w-8 h-8 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl overflow-hidden border border-teal-300 shadow-xs shrink-0 bg-teal-100">
                  <img 
                    src="/images/owl_teacher.jpg" 
                    alt="Pelėdos avataras" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/owl_teacher_1789803378582.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 bg-teal-50/70 border border-teal-200/80 rounded-2xl flex-1">
                  <div className="flex items-center gap-2 text-teal-800 py-1 font-medium text-xs sm:text-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-teal-600 shrink-0" />
                    <span>Pelėda varto etiketo knygą ir galvoja patarimą...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-rose-900">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
              {lastFailedQuestion && (
                <button
                  type="button"
                  onClick={() => handleAsk(lastFailedQuestion)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Bandyti dar kartą</span>
                </button>
              )}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="owl-input"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Parašyk savo klausimą apie etiketą (pvz. kaip pasveikinti draugą?)..."
              disabled={loading}
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              id="btn-ask-owl"
              type="submit"
              disabled={loading || !question.trim()}
              className={`px-5 py-3 rounded-2xl font-heading font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                loading || !question.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:scale-102'
              }`}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Klausti</span>
            </button>
          </form>
        </div>

        {/* Quick Question Pills */}
        <div className="pt-2 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            💡 Populiarūs klausimai iš knygos (paspausk):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                id={`quick-prompt-${idx}`}
                type="button"
                disabled={loading}
                onClick={() => handleAsk(prompt)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 hover:border-teal-300 rounded-xl text-xs text-slate-700 text-left transition-colors cursor-pointer disabled:opacity-50"
              >
                💬 {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
