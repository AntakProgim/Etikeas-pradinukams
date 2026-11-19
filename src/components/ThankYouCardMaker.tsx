import React, { useState } from 'react';
import { ThankYouCardData } from '../types';
import { 
  Send, 
  Printer, 
  Copy, 
  Check, 
  Sparkles, 
  Heart, 
  Palette, 
  Smile, 
  Share2,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface ThankYouCardMakerProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

const TEMPLATES = [
  {
    occasion: 'Gimtadienio dovana',
    title: 'Už dovaną',
    recipient: 'Krikšto mamai / Močiutei / Draugui',
    message: 'Nuoširdžiai ačiū už nuostabią dovaną! Ji man labai patiko ir suteikė daugybę džiaugsmo. Labai vertinu Tavo dėmesį!',
    sticker: '🎁'
  },
  {
    occasion: 'Viešnagė svečiuose / Nakvynė',
    title: 'Už viešnagę',
    recipient: 'Jokūbui ir jo tėveliams',
    message: 'Labai ačiū už nuostabų savaitgalį Jūsų namuose! Man buvo be galo linksma žaisti ir ragauti skanios vakarienės. Ačiū už Jūsų šiltą svetingumą!',
    sticker: '🏡'
  },
  {
    occasion: 'Mokytojo ar Pagalbininko padėka',
    title: 'Mokytojai / Treneriui',
    recipient: 'Mielai Mokytojai',
    message: 'Ačiū Jums už kantrybę, įdomias pamokas ir palaikymą! Jūs padedate man augti ir išmokti daugybę naujų dalykų.',
    sticker: '🌟'
  },
  {
    occasion: 'Draugystė ir pagalba',
    title: 'Geriausiam draugui',
    recipient: 'Mano geriausiam draugui',
    message: 'Ačiū, kad esi toks nuostabus ir ištikimas draugas! Su tavimi visada drąsu, linksma ir smagu.',
    sticker: '🌸'
  }
];

export const ThankYouCardMaker: React.FC<ThankYouCardMakerProps> = ({
  onAddStars,
  onUnlockBadge,
}) => {
  const [cardData, setCardData] = useState<ThankYouCardData>({
    recipientName: 'Mielai močiutei',
    occasion: 'Už dovaną ir šilumą',
    message: 'Nuoširdžiai ačiū už nuostabią dovaną ir skanius blynus! Labai tave myliu ir džiaugiuosi mūsų draugyste.',
    senderName: 'Tavo anūkas Lukas',
    theme: 'gold',
    sticker: '🎁'
  });

  const [copied, setCopied] = useState(false);
  const [hasCreated, setHasCreated] = useState(false);

  const STICKERS = ['🎁', '💌', '🌸', '🌟', '🎂', '🧸', '🍪', '🐱', '💖'];

  const THEMES = [
    { id: 'gold' as const, name: 'Auksinė šventė', bg: 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-300 text-amber-950' },
    { id: 'garden' as const, name: 'Pavasario sodas', bg: 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-300 text-emerald-950' },
    { id: 'royal' as const, name: 'Karališkoji mėlyna', bg: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-300 text-indigo-950' },
    { id: 'stars' as const, name: 'Švelni rožinė', bg: 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-300 text-rose-950' }
  ];

  const handleApplyTemplate = (tmpl: typeof TEMPLATES[0]) => {
    sounds.playPop();
    setCardData((prev) => ({
      ...prev,
      recipientName: tmpl.recipient,
      occasion: tmpl.occasion,
      message: tmpl.message,
      sticker: tmpl.sticker
    }));
  };

  const handleCopyText = () => {
    sounds.playPop();
    const fullText = `💌 Padėkos laiškelis\n\nKam: ${cardData.recipientName}\n\n${cardData.message}\n\nSu meile ir dėkingumu,\n${cardData.senderName} ${cardData.sticker}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    if (!hasCreated) {
      setHasCreated(true);
      onAddStars(15);
      onUnlockBadge('words_master');
      sounds.playCorrect();
    }
  };

  const handlePrint = () => {
    sounds.playPop();
    if (!hasCreated) {
      setHasCreated(true);
      onAddStars(15);
      onUnlockBadge('words_master');
    }
    window.print();
  };

  const currentThemeObj = THEMES.find((t) => t.id === cardData.theme) || THEMES[0];

  return (
    <div id="card-maker-container" className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              💌 Knygos skyrius. Padėkos galia
            </span>
            <span className="text-xs bg-yellow-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
              +15 ⭐
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            Ačiū atvirukas
          </h1>
          <p className="text-rose-100 text-xs sm:text-sm">
            Knygoje pabrėžiama, kad ranka rašytas padėkos laiškelis yra gražiausia dovana už gautą dovaną ar šiltą viešnagę!
          </p>
        </div>

        {/* Thank You Card Illustration */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-white/40 shrink-0 bg-rose-700/50">
          <img 
            src="/images/thank_you_card.jpg" 
            alt="Padėkos atviruko iliustracija" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/src/assets/images/thank_you_card_1789805071249.jpg';
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Templates Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              💡 Greiti pavyzdžiai pagal progą:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyTemplate(tmpl)}
                  className="p-2 rounded-xl text-left border border-slate-200 hover:border-rose-400 hover:bg-rose-50/50 text-xs font-medium text-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-base">{tmpl.sticker}</span>
                  <span className="truncate">{tmpl.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Inputs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kam skirtas laiškelis (gavėjas)
              </label>
              <input
                type="text"
                value={cardData.recipientName}
                onChange={(e) => setCardData({ ...cardData, recipientName: e.target.value })}
                placeholder="Pvz., Mielai močiutei, gerb. mokytojai..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Padėkos žodžiai
              </label>
              <textarea
                rows={4}
                value={cardData.message}
                onChange={(e) => setCardData({ ...cardData, message: e.target.value })}
                placeholder="Parašyk nuoširdžius žodžius..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tavo vardas (siuntėjas)
              </label>
              <input
                type="text"
                value={cardData.senderName}
                onChange={(e) => setCardData({ ...cardData, senderName: e.target.value })}
                placeholder="Pvz., Tavo anūkas Lukas..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>

            {/* Sticker picker */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Papuošimo lipdukas
              </label>
              <div className="flex flex-wrap gap-1.5">
                {STICKERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      sounds.playPop();
                      setCardData({ ...cardData, sticker: s });
                    }}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-transform cursor-pointer ${
                      cardData.sticker === s
                        ? 'border-rose-500 bg-rose-100 scale-110 shadow-xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme picker */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Atviruko stilius
              </label>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      sounds.playPop();
                      setCardData({ ...cardData, theme: theme.id });
                    }}
                    className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      cardData.theme === theme.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ✨ Tavo atviruko peržiūra
            </span>
          </div>

          {/* Card Visual */}
          <div
            id="printable-thank-you-card"
            className={`border-4 rounded-3xl p-6 sm:p-8 shadow-xl min-h-[320px] flex flex-col justify-between relative overflow-hidden transition-all ${currentThemeObj.bg}`}
          >
            {/* Top Header */}
            <div className="flex items-start justify-between border-b border-black/10 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">
                  Padėkos atvirukas
                </span>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl pt-1">
                  {cardData.recipientName || 'Mielas drauge,'}
                </h3>
              </div>
              <span className="text-4xl animate-bounce">{cardData.sticker}</span>
            </div>

            {/* Body */}
            <div className="py-4">
              <p className="text-sm sm:text-base italic leading-relaxed font-sans">
                „{cardData.message || 'Nuoširdžiai ačiū už viską!'}“
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-black/10 pt-3 flex items-center justify-between">
              <span className="text-xs opacity-70 font-medium">Su didele pagarba ir dėkingumu,</span>
              <span className="font-heading font-bold text-sm sm:text-base">
                {cardData.senderName || 'Aš'}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              id="btn-copy-card"
              onClick={handleCopyText}
              className="flex-1 px-4 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Nukopijuota!' : 'Kopijuoti tekstą'}</span>
            </button>

            <button
              id="btn-print-card"
              onClick={handlePrint}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-102"
            >
              <Printer className="w-4 h-4" />
              <span>Atsispausdinti atviruką 🖨️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
