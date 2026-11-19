import React, { useState } from 'react';
import { TABLE_SLOTS, TABLE_ITEMS, TableItemOption, TableSlot } from '../data/tableGameData';
import { 
  UtensilsCrossed, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Info, 
  HelpCircle,
  Trophy
} from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TableSettingGameProps {
  onAddStars: (count: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

export const TableSettingGame: React.FC<TableSettingGameProps> = ({ onAddStars, onUnlockBadge }) => {
  // Map slotId -> TableItemOption.id
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [activeFact, setActiveFact] = useState<string | null>(null);

  // Remaining items not placed anywhere
  const placedItemIds = Object.values(placements);
  const unplacedItems = TABLE_ITEMS.filter((item) => !placedItemIds.includes(item.id));

  const handleSelectItem = (item: TableItemOption) => {
    sounds.playPop();
    if (selectedItemId === item.id) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(item.id);
      setActiveFact(item.etiquetteFact);
    }
  };

  const handleSlotClick = (slot: TableSlot) => {
    if (selectedItemId) {
      // Place selected item in this slot
      const nextPlacements = { ...placements };
      
      // If something was in this slot, remove it
      nextPlacements[slot.id] = selectedItemId;

      setPlacements(nextPlacements);
      setSelectedItemId(null);
      setHasChecked(false);
      sounds.playPop();
    } else if (placements[slot.id]) {
      // Remove item from slot back to tray
      const nextPlacements = { ...placements };
      delete nextPlacements[slot.id];
      setPlacements(nextPlacements);
      setHasChecked(false);
      sounds.playPop();
    }
  };

  const handleReset = () => {
    sounds.playPop();
    setPlacements({});
    setSelectedItemId(null);
    setHasChecked(false);
    setIsCompleted(false);
  };

  const handleCheck = () => {
    setHasChecked(true);
    let correctCount = 0;
    
    TABLE_SLOTS.forEach((slot) => {
      if (placements[slot.id] === slot.expectedItemId) {
        correctCount++;
      }
    });

    if (correctCount === TABLE_SLOTS.length) {
      setIsCompleted(true);
      sounds.playFanfare();
      onAddStars(25);
      onUnlockBadge('dining_master');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    } else {
      sounds.playIncorrect();
    }
  };

  const getItemById = (id: string): TableItemOption | undefined => {
    return TABLE_ITEMS.find((it) => it.id === id);
  };

  const renderItemVisual = (item: TableItemOption, size: 'sm' | 'md' | 'lg' = 'md') => {
    switch (item.id) {
      case 'plate':
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-amber-200 bg-white shadow-inner flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-amber-300 flex items-center justify-center bg-amber-50/50">
                <span className="text-xl">🍽️</span>
              </div>
            </div>
          </div>
        );
      case 'fork':
        return (
          <div className="flex flex-col items-center justify-center py-2 text-slate-700">
            <div className="text-3xl sm:text-4xl select-none">🍴</div>
            <span className="text-[10px] font-bold text-slate-500 mt-1">Šakutė</span>
          </div>
        );
      case 'knife':
        return (
          <div className="flex flex-col items-center justify-center py-2 text-slate-700">
            <div className="text-3xl sm:text-4xl select-none transform scale-x-[-1]">🔪</div>
            <span className="text-[10px] font-bold text-slate-500 mt-1">Peilis (ašmenys į vidų)</span>
          </div>
        );
      case 'spoon':
        return (
          <div className="flex flex-col items-center justify-center py-2 text-slate-700">
            <div className="text-3xl sm:text-4xl select-none">🥄</div>
            <span className="text-[10px] font-bold text-slate-500 mt-1">Šaukštas</span>
          </div>
        );
      case 'glass':
        return (
          <div className="flex flex-col items-center justify-center py-1 text-slate-700">
            <div className="text-3xl sm:text-4xl select-none">🥛</div>
            <span className="text-[10px] font-bold text-slate-500">Stiklinė</span>
          </div>
        );
      case 'napkin':
        return (
          <div className="flex flex-col items-center justify-center py-2">
            <div className="w-10 h-16 sm:w-12 sm:h-20 bg-rose-100 border-2 border-rose-300 rounded-sm shadow-xs flex items-center justify-center">
              <span className="text-lg">🧣</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 mt-1">Servetėlė</span>
          </div>
        );
      default:
        return <span>{item.name}</span>;
    }
  };

  return (
    <div id="table-game-container" className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-4 sm:p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wide">
              Interaktyvus mini žaidimas
            </span>
            <span className="text-xs bg-yellow-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
              +25 ⭐
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            🍽️ Padenk stalą taisyklingai!
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm">
            Pagal knygą „Good Manners for Today's Kids“ (Setting a Table 101). 
            Pasirink įrankį apačioje ir padėk jį į teisingą stalo vietą!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white/30 hidden sm:block bg-blue-700/50">
            <img 
              src="/images/kids_dining_table.jpg" 
              alt="Pietų stalo padengimas" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/src/assets/images/kids_dining_table_1789803389882.jpg';
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
            <button
              id="btn-toggle-table-guide"
              onClick={() => {
                sounds.playPop();
                setShowGuide(!showGuide);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold text-white border border-white/20 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{showGuide ? 'Slėpti taisykles' : 'Kaip padengti stalą?'}</span>
            </button>

            <button
              id="btn-reset-table"
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors cursor-pointer"
              title="Išvalyti stalą"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Iš naujo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Etiquette Guide Accordion */}
      {showGuide && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 animate-in fade-in duration-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-heading font-bold text-base">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Auksinės stalo dengimo taisyklės</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-amber-950">
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              <strong className="text-blue-700">1. Šakutė – kairėje.</strong> Šakutės visada dedamos lėkštės kairėje pusėje.
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              <strong className="text-emerald-700">2. Peilis – dešinėje.</strong> Peilis dedamas dešinėje, o ašmenys visada atsukti į lėkštę!
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              <strong className="text-indigo-700">3. Šaukštas – šalia peilio.</strong> Sriubos šaukštas dedamas peilio dešinėje (išorėje).
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              <strong className="text-amber-700">4. Stiklinė – viršuje dešinėje.</strong> Vandens stiklinė stovi ties peilio viršūne.
            </div>
          </div>
        </div>
      )}

      {/* Interactive Table Canvas */}
      <div className="relative bg-gradient-to-b from-amber-100/70 to-amber-200/50 border-4 border-amber-300/80 rounded-3xl p-4 sm:p-8 shadow-inner overflow-hidden min-h-[380px] flex flex-col items-center justify-center">
        {/* Table Placemat */}
        <div className="relative w-full max-w-2xl bg-white/90 rounded-2xl p-4 sm:p-6 border-2 border-dashed border-amber-300 shadow-md">
          <div className="text-center pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Tavo pietų vieta (Pagalvok: Kairė ar Dešinė?)
            </span>
          </div>

          {/* Top Row: Glass Slot */}
          <div className="flex justify-end pr-4 sm:pr-8 mb-2">
            {(() => {
              const glassSlot = TABLE_SLOTS.find((s) => s.id === 'slot-glass')!;
              const placedGlassId = placements[glassSlot.id];
              const placedItem = placedGlassId ? getItemById(placedGlassId) : null;
              const isCorrect = hasChecked && placedGlassId === glassSlot.expectedItemId;
              const isWrong = hasChecked && placedGlassId && placedGlassId !== glassSlot.expectedItemId;

              return (
                <div
                  id="slot-slot-glass"
                  onClick={() => handleSlotClick(glassSlot)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedItemId ? 'ring-2 ring-blue-400 bg-blue-50/50' : ''
                  } ${
                    placedItem
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50'
                        : isWrong
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-slate-300 bg-slate-50'
                      : 'border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 bg-slate-50/50'
                  }`}
                >
                  {placedItem ? (
                    renderItemVisual(placedItem)
                  ) : (
                    <div className="text-center">
                      <span className="text-slate-400 text-xs font-medium">🥛 Stiklinė</span>
                      <p className="text-[9px] text-slate-400">Viršuje dešinėje</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Center Dining Row: Napkin, Fork, Plate, Knife, Spoon */}
          <div className="grid grid-cols-5 items-center justify-items-center gap-1 sm:gap-3 py-2">
            {/* Slot 1: Far Left Napkin */}
            {(() => {
              const slot = TABLE_SLOTS.find((s) => s.id === 'slot-napkin')!;
              const placedId = placements[slot.id];
              const placedItem = placedId ? getItemById(placedId) : null;
              const isCorrect = hasChecked && placedId === slot.expectedItemId;
              const isWrong = hasChecked && placedId && placedId !== slot.expectedItemId;

              return (
                <div
                  id="slot-slot-napkin"
                  onClick={() => handleSlotClick(slot)}
                  className={`w-14 sm:w-20 h-28 sm:h-36 rounded-xl border-2 flex flex-col items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedItemId ? 'ring-2 ring-blue-400 bg-blue-50/50' : ''
                  } ${
                    placedItem
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50'
                        : isWrong
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-slate-300 bg-slate-50'
                      : 'border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 bg-slate-50/50'
                  }`}
                >
                  {placedItem ? (
                    renderItemVisual(placedItem)
                  ) : (
                    <div className="text-center p-1">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Servetėlė</span>
                      <p className="text-[8px] text-slate-400">Kairėje</p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Slot 2: Left Fork */}
            {(() => {
              const slot = TABLE_SLOTS.find((s) => s.id === 'slot-fork')!;
              const placedId = placements[slot.id];
              const placedItem = placedId ? getItemById(placedId) : null;
              const isCorrect = hasChecked && placedId === slot.expectedItemId;
              const isWrong = hasChecked && placedId && placedId !== slot.expectedItemId;

              return (
                <div
                  id="slot-slot-fork"
                  onClick={() => handleSlotClick(slot)}
                  className={`w-14 sm:w-20 h-28 sm:h-36 rounded-xl border-2 flex flex-col items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedItemId ? 'ring-2 ring-blue-400 bg-blue-50/50' : ''
                  } ${
                    placedItem
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50'
                        : isWrong
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-slate-300 bg-slate-50'
                      : 'border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 bg-slate-50/50'
                  }`}
                >
                  {placedItem ? (
                    renderItemVisual(placedItem)
                  ) : (
                    <div className="text-center p-1">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Šakutė</span>
                      <p className="text-[8px] text-slate-400">Kairėje</p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Slot 3: Center Plate */}
            {(() => {
              const slot = TABLE_SLOTS.find((s) => s.id === 'slot-plate')!;
              const placedId = placements[slot.id];
              const placedItem = placedId ? getItemById(placedId) : null;
              const isCorrect = hasChecked && placedId === slot.expectedItemId;
              const isWrong = hasChecked && placedId && placedId !== slot.expectedItemId;

              return (
                <div
                  id="slot-slot-plate"
                  onClick={() => handleSlotClick(slot)}
                  className={`w-28 sm:w-36 h-28 sm:h-36 rounded-full border-2 flex flex-col items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedItemId ? 'ring-2 ring-blue-400 bg-blue-50/50' : ''
                  } ${
                    placedItem
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50'
                        : isWrong
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-slate-300 bg-slate-50'
                      : 'border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 bg-slate-50/50'
                  }`}
                >
                  {placedItem ? (
                    renderItemVisual(placedItem)
                  ) : (
                    <div className="text-center p-1">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Lėkštė</span>
                      <p className="text-[8px] text-slate-400">Centre</p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Slot 4: Right Knife */}
            {(() => {
              const slot = TABLE_SLOTS.find((s) => s.id === 'slot-knife')!;
              const placedId = placements[slot.id];
              const placedItem = placedId ? getItemById(placedId) : null;
              const isCorrect = hasChecked && placedId === slot.expectedItemId;
              const isWrong = hasChecked && placedId && placedId !== slot.expectedItemId;

              return (
                <div
                  id="slot-slot-knife"
                  onClick={() => handleSlotClick(slot)}
                  className={`w-14 sm:w-20 h-28 sm:h-36 rounded-xl border-2 flex flex-col items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedItemId ? 'ring-2 ring-blue-400 bg-blue-50/50' : ''
                  } ${
                    placedItem
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50'
                        : isWrong
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-slate-300 bg-slate-50'
                      : 'border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 bg-slate-50/50'
                  }`}
                >
                  {placedItem ? (
                    renderItemVisual(placedItem)
                  ) : (
                    <div className="text-center p-1">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Peilis</span>
                      <p className="text-[8px] text-slate-400">Dešinėje</p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Slot 5: Far Right Spoon */}
            {(() => {
              const slot = TABLE_SLOTS.find((s) => s.id === 'slot-spoon')!;
              const placedId = placements[slot.id];
              const placedItem = placedId ? getItemById(placedId) : null;
              const isCorrect = hasChecked && placedId === slot.expectedItemId;
              const isWrong = hasChecked && placedId && placedId !== slot.expectedItemId;

              return (
                <div
                  id="slot-slot-spoon"
                  onClick={() => handleSlotClick(slot)}
                  className={`w-14 sm:w-20 h-28 sm:h-36 rounded-xl border-2 flex flex-col items-center justify-center p-1 cursor-pointer transition-all ${
                    selectedItemId ? 'ring-2 ring-blue-400 bg-blue-50/50' : ''
                  } ${
                    placedItem
                      ? isCorrect
                        ? 'border-emerald-500 bg-emerald-50'
                        : isWrong
                        ? 'border-rose-500 bg-rose-50'
                        : 'border-slate-300 bg-slate-50'
                      : 'border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 bg-slate-50/50'
                  }`}
                >
                  {placedItem ? (
                    renderItemVisual(placedItem)
                  ) : (
                    <div className="text-center p-1">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-400">Šaukštas</span>
                      <p className="text-[8px] text-slate-400">Dešinėje</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Items Tray */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
            <span>📦 Įrankių ir indų dėklas</span>
            <span className="text-xs font-normal text-slate-500">
              (Paspausk daiktą, tada paspausk vietą ant stalo)
            </span>
          </h3>
          <span className="text-xs font-bold text-slate-500">
            Liko padėti: {unplacedItems.length}
          </span>
        </div>

        {unplacedItems.length === 0 ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Visi įrankiai padėti ant stalo! Paspausk „Patikrinti padengimą“.</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {unplacedItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  id={`item-btn-${item.id}`}
                  onClick={() => handleSelectItem(item)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 shadow-sm scale-105 ring-2 ring-blue-400'
                      : 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 bg-white'
                  }`}
                >
                  <div className="text-2xl">{item.id === 'plate' ? '🍽️' : item.id === 'fork' ? '🍴' : item.id === 'knife' ? '🔪' : item.id === 'spoon' ? '🥄' : item.id === 'glass' ? '🥛' : '🧣'}</div>
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Item Etiquette Fact Tip */}
        {activeFact && (
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Etiketo paslaptis.</strong> {activeFact}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-slate-400" />
          <span>Teisingai padengus stalą laukia Stalo meistro ženklelis!</span>
        </div>

        <button
          id="btn-check-table"
          onClick={handleCheck}
          disabled={placedItemIds.length === 0}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-heading font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
            placedItemIds.length === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white hover:scale-102'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Patikrinti padengimą</span>
        </button>
      </div>

      {/* Success Modal / Banner */}
      {isCompleted && (
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-xl space-y-3 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <h4 className="text-lg font-heading font-extrabold">Valio! Tobulas stalo padengimas!</h4>
              <p className="text-emerald-100 text-xs sm:text-sm">
                Tu teisingai padėjai šakutę kairėje, peilį ir šaukštą dešinėje, o stiklinę viršuje!
              </p>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-xs flex items-center justify-between">
            <span>Uždirbta: <strong>+25 ⭐ žvaigždutės</strong> ir <strong>Stalo meistro ženklelis</strong></span>
            <span className="font-bold">100% teisingai</span>
          </div>
        </div>
      )}
    </div>
  );
};
