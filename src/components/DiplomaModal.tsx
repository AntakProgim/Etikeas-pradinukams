import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake 
} from 'lucide-react';
import { sounds } from '../utils/audio';

interface DiplomaModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  unlockedBadgeCount: number;
}

export const DiplomaModal: React.FC<DiplomaModalProps> = ({
  isOpen,
  onClose,
  stars,
  unlockedBadgeCount,
}) => {
  const [studentName, setStudentName] = useState('Matas');
  const [schoolClass, setSchoolClass] = useState('3b klasė');
  const todayDate = new Date().toLocaleDateString('lt-LT');

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-amber-200 overflow-hidden my-auto">
        {/* Modal Top Controls (Hidden on print) */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="font-heading font-bold text-sm">Oficialus etiketo diplomas</span>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Edit Form Bar (Hidden on print) */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/80 flex flex-wrap items-center gap-3 print:hidden">
          <div className="flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-slate-500 uppercase block">
              Mokinio vardas:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Įrašyk savo vardą..."
              className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="w-28">
            <label className="text-[10px] font-bold text-slate-500 uppercase block">
              Klasė:
            </label>
            <input
              type="text"
              value={schoolClass}
              onChange={(e) => setSchoolClass(e.target.value)}
              placeholder="Pvz. 3a"
              className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="pt-3.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-102"
            >
              <Printer className="w-4 h-4" />
              <span>Spausdinti diplomą 🖨️</span>
            </button>
          </div>
        </div>

        {/* THE DIPLOMA CERTIFICATE (Printable Area) */}
        <div 
          id="diploma-certificate"
          className="p-8 sm:p-12 bg-radial from-amber-50/90 via-yellow-50/50 to-amber-100/40 border-8 border-double border-amber-400 m-4 sm:m-6 rounded-2xl text-center space-y-6 relative overflow-hidden shadow-inner"
        >
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 text-amber-400 text-2xl font-serif select-none">❧</div>
          <div className="absolute top-2 right-2 text-amber-400 text-2xl font-serif select-none">❧</div>
          <div className="absolute bottom-2 left-2 text-amber-400 text-2xl font-serif select-none">❧</div>
          <div className="absolute bottom-2 right-2 text-amber-400 text-2xl font-serif select-none">❧</div>

          {/* Header */}
          <div className="space-y-1">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-amber-500 flex items-center justify-center text-3xl mx-auto shadow-md">
              👑
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-800">
              MANDAGAUS ELGESIO MOKYKLĖLĖ
            </p>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              ETIKETO DIPLOMAS
            </h1>
            <p className="text-xs text-amber-700 font-medium">
              Pagal Bob & Emilie Barnes knygą „Good Manners for Today's Kids“
            </p>
          </div>

          {/* Student Info */}
          <div className="space-y-2 py-2">
            <p className="text-xs text-slate-600">Šis garbingas diplomas patvirtina, kad</p>
            <div className="border-b-2 border-dashed border-amber-400 pb-1 max-w-sm mx-auto">
              <span className="text-xl sm:text-2xl font-heading font-extrabold text-amber-900">
                {studentName || 'Šaunus Mokinys'}
              </span>
              {schoolClass && (
                <span className="text-xs text-slate-500 ml-2">({schoolClass})</span>
              )}
            </div>
            <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed pt-2">
              sėkmingai išmoko stalo etiketo taisyklių, garbingo žaidimo, svetingumo, švaros bei mandagaus bendravimo principų ir yra oficialiai paskelbtas 
              <strong className="text-amber-900 block pt-1">🌟 MANDAGUMO IR ETIKETO ČEMPIONU 🌟</strong>
            </p>
          </div>

          {/* Stats Badges inside diploma */}
          <div className="flex items-center justify-center gap-6 py-1 text-xs">
            <div className="text-center">
              <span className="text-base font-heading font-bold text-amber-900 block">{stars} ⭐</span>
              <span className="text-[10px] text-slate-500">Etiketo žvaigždutės</span>
            </div>
            <div className="h-6 w-px bg-amber-300" />
            <div className="text-center">
              <span className="text-base font-heading font-bold text-amber-900 block">{unlockedBadgeCount} / 8 🏆</span>
              <span className="text-[10px] text-slate-500">Pelnyti ženkleliai</span>
            </div>
          </div>

          {/* Signature & Date */}
          <div className="grid grid-cols-2 pt-6 border-t border-amber-300 text-xs text-slate-600">
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Data</p>
              <p className="font-bold text-slate-800">{todayDate}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Patvirtino</p>
              <p className="font-bold text-amber-800 font-heading">🦉 Išmintingoji Etiketo Pelėda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
