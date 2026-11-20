import React, { useEffect, useState } from 'react';
import { X, Printer, Award, Download, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface DiplomaModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  unlockedBadgeCount: number;
}

const GRADES = ['1', '2', '3', '4'] as const;
const CLASS_LETTERS = ['k', 'l', 'm', 'n', 'o'] as const;

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
  }
  return currentY;
}

export const DiplomaModal: React.FC<DiplomaModalProps> = ({
  isOpen,
  onClose,
  stars,
  unlockedBadgeCount,
}) => {
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('etiquette_student_name') ?? '';
  });
  const [grade, setGrade] = useState<string>(() => {
    return localStorage.getItem('etiquette_student_grade') ?? '3';
  });
  const [classLetter, setClassLetter] = useState<string>(() => {
    return localStorage.getItem('etiquette_student_letter') ?? 'k';
  });
  const [downloadedNotice, setDownloadedNotice] = useState(false);

  const schoolClass = `${grade}${classLetter} klasė`;
  const todayDate = new Date().toLocaleDateString('lt-LT');
  const displayStudentName = studentName.trim() || 'Šaunus Mokinys';

  useEffect(() => {
    localStorage.setItem('etiquette_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('etiquette_student_grade', grade);
  }, [grade]);

  useEffect(() => {
    localStorage.setItem('etiquette_student_letter', classLetter);
  }, [classLetter]);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  const handleDownloadDiploma = () => {
    sounds.playFanfare();

    const width = 1400;
    const height = 1000;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Warm parchment background gradient
    const bgGrad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      100,
      width / 2,
      height / 2,
      width * 0.75
    );
    bgGrad.addColorStop(0, '#FFFDF5');
    bgGrad.addColorStop(0.65, '#FEF9E7');
    bgGrad.addColorStop(1, '#FDECC8');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Double golden border
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 10;
    ctx.strokeRect(38, 38, width - 76, height - 76);

    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 3;
    ctx.strokeRect(56, 56, width - 112, height - 112);

    // Corner flourishes
    ctx.fillStyle = '#F59E0B';
    ctx.font = '44px Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText('❧', 76, 108);
    ctx.textAlign = 'right';
    ctx.fillText('❧', width - 76, 108);
    ctx.textAlign = 'left';
    ctx.fillText('❧', 76, height - 76);
    ctx.textAlign = 'right';
    ctx.fillText('❧', width - 76, height - 76);

    // Crown badge circle
    ctx.beginPath();
    ctx.arc(width / 2, 165, 48, 0, Math.PI * 2);
    const badgeGrad = ctx.createLinearGradient(width / 2 - 48, 117, width / 2 + 48, 213);
    badgeGrad.addColorStop(0, '#FBBF24');
    badgeGrad.addColorStop(1, '#FDE047');
    ctx.fillStyle = badgeGrad;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#D97706';
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = '48px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
    ctx.fillText('👑', width / 2, 182);

    // Header text
    ctx.fillStyle = '#92400E';
    ctx.font = '700 22px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('MANDAGAUS ELGESIO MOKYKLĖLĖ', width / 2, 260);

    ctx.fillStyle = '#0F172A';
    ctx.font = '800 66px "Outfit", "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('ETIKETO DIPLOMAS', width / 2, 336);

    ctx.fillStyle = '#B45309';
    ctx.font = '600 22px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText(
      'Pagal Bobo ir Emilės Barns knygą „Etiketas šiandienos vaikams“',
      width / 2,
      380
    );

    // Student section
    ctx.fillStyle = '#475569';
    ctx.font = '500 24px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('Šis garbingas diplomas patvirtina, kad', width / 2, 452);

    ctx.fillStyle = '#78350F';
    ctx.font = '800 50px "Outfit", "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText(`${displayStudentName} (${schoolClass})`, width / 2, 524);

    // Dashed underline under name
    ctx.save();
    ctx.setLineDash([10, 8]);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 340, 548);
    ctx.lineTo(width / 2 + 340, 548);
    ctx.stroke();
    ctx.restore();

    // Description
    ctx.fillStyle = '#334155';
    ctx.font = '500 24px "Plus Jakarta Sans", Arial, sans-serif';
    const nextY = wrapCanvasText(
      ctx,
      'sėkmingai išmoko stalo etiketo taisyklių, garbingo žaidimo, svetingumo, švaros bei mandagaus bendravimo principų ir yra oficialiai paskelbtas',
      width / 2,
      606,
      980,
      36
    );

    ctx.fillStyle = '#78350F';
    ctx.font = '800 28px "Outfit", "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('🌟 MANDAGUMO IR ETIKETO ČEMPIONU 🌟', width / 2, nextY + 54);

    // Stats box
    ctx.fillStyle = '#78350F';
    ctx.font = '800 32px "Outfit", Arial, sans-serif';
    ctx.fillText(`${stars} ⭐`, width / 2 - 150, 775);
    ctx.fillText(`${unlockedBadgeCount} / 8 🏆`, width / 2 + 150, 775);

    ctx.fillStyle = '#64748B';
    ctx.font = '600 18px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('Etiketo žvaigždutės', width / 2 - 150, 806);
    ctx.fillText('Pelnyti ženkleliai', width / 2 + 150, 806);

    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2, 745);
    ctx.lineTo(width / 2, 812);
    ctx.stroke();

    // Footer divider
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(110, 845);
    ctx.lineTo(width - 110, 845);
    ctx.stroke();

    // Date & signature
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 18px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('DATA', 110, 882);
    ctx.fillStyle = '#1E293B';
    ctx.font = '700 24px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText(todayDate, 110, 916);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 18px "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('PATVIRTINO', width - 110, 882);
    ctx.fillStyle = '#92400E';
    ctx.font = '700 24px "Outfit", "Plus Jakarta Sans", Arial, sans-serif';
    ctx.fillText('🦉 Išmintingoji Etiketo Pelėda', width - 110, 916);

    // Trigger file download
    const safeFileName = displayStudentName
      .toLowerCase()
      .replace(/[^a-z0-9ąčęėįšųūž_-]+/gi, '_')
      .replace(/^_+|_+$/g, '') || 'mokinys';

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `etiketo_diplomas_${safeFileName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadedNotice(true);
      setTimeout(() => setDownloadedNotice(false), 4000);
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-amber-200 overflow-hidden my-auto relative">
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
            aria-label="Uždaryti"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Edit Form Bar (Hidden on print) */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/80 space-y-3 print:hidden">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[160px]">
              <label
                htmlFor="diploma-student-name"
                className="text-[10px] font-bold text-slate-600 uppercase block mb-1"
              >
                Vardas
              </label>
              <div className="relative">
                <input
                  id="diploma-student-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Įrašyk vaiko vardą..."
                  maxLength={40}
                  className="w-full px-3 py-1.5 pr-8 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                {studentName && (
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setStudentName('');
                    }}
                    aria-label="Išvalyti vardą"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-amber-100 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="w-20">
              <label htmlFor="diploma-grade" className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                Klasė
              </label>
              <select
                id="diploma-grade"
                value={grade}
                onChange={(e) => {
                  sounds.playPop();
                  setGrade(e.target.value);
                }}
                className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g} kl.
                  </option>
                ))}
              </select>
            </div>

            <div className="w-20">
              <label htmlFor="diploma-letter" className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                Raidė
              </label>
              <select
                id="diploma-letter"
                value={classLetter}
                onChange={(e) => {
                  sounds.playPop();
                  setClassLetter(e.target.value);
                }}
                className="w-full px-2.5 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {CLASS_LETTERS.map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-download-diploma"
                type="button"
                onClick={handleDownloadDiploma}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-102"
              >
                <Download className="w-4 h-4" />
                <span>Atsisiųsti diplomą</span>
              </button>

              <button
                id="btn-print-diploma"
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-102"
              >
                <Printer className="w-4 h-4" />
                <span>Spausdinti</span>
              </button>
            </div>
          </div>

          {downloadedNotice && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Diplomas sėkmingai paruoštas ir atsisiųstas kaip paveikslėlis!</span>
            </div>
          )}
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
              Pagal Bobo ir Emilės Barns knygą „Etiketas šiandienos vaikams“
            </p>
          </div>

          {/* Student Info */}
          <div className="space-y-2 py-2">
            <p className="text-xs text-slate-600">Šis garbingas diplomas patvirtina, kad</p>
            <div className="border-b-2 border-dashed border-amber-400 pb-1 max-w-sm mx-auto">
              <span className="text-xl sm:text-2xl font-heading font-extrabold text-amber-900">
                {displayStudentName}
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
