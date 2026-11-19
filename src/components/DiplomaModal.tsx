import React, { useEffect, useState } from 'react';
import {
  X,
  Printer,
  Award,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { sounds } from '../utils/audio';
import {
  initAuth,
  googleSignIn,
  getAccessToken,
  logout,
  sendDiplomaEmail,
  GmailAuthError,
} from '../utils/googleAuth';

interface DiplomaModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  unlockedBadgeCount: number;
}

const GRADES = ['1', '2', '3', '4'] as const;
const CLASS_LETTERS = ['k', 'l', 'm', 'n', 'o'] as const;

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
  const schoolClass = `${grade}${classLetter} klasė`;
  const todayDate = new Date().toLocaleDateString('lt-LT');

  useEffect(() => {
    localStorage.setItem('etiquette_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('etiquette_student_grade', grade);
  }, [grade]);

  useEffect(() => {
    localStorage.setItem('etiquette_student_letter', classLetter);
  }, [classLetter]);

  // Email & Google Auth state
  const [showEmailPanel, setShowEmailPanel] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(() => !getAccessToken());
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessEmail, setSendSuccessEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (signedInUser) => {
        setUser(signedInUser);
        setNeedsAuth(false);
      },
      (firebaseUser) => {
        setUser(firebaseUser);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playPop();
    window.print();
  };

  const handleGoogleLogin = async () => {
    sounds.playPop();
    setIsLoggingIn(true);
    setEmailError(null);
    try {
      const result = await googleSignIn();
      setUser(result.user);
      setNeedsAuth(false);
      if (!recipientEmail && result.user.email) {
        setRecipientEmail(result.user.email);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Nepavyko prisijungti prie „Google“ paskyros.';
      setEmailError(message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    sounds.playPop();
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setSendSuccessEmail(null);
    setEmailError(null);
    setShowConfirmDialog(false);
  };

  const handleRequestSend = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playPop();
    setEmailError(null);
    setSendSuccessEmail(null);

    const trimmedEmail = recipientEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError('Įvesk taisyklingą gavėjo el. pašto adresą.');
      return;
    }

    const token = getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      setEmailError('Pirmiausia prisijunkite per „Google“, kad galėtumėte siųsti laišką.');
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmSend = async () => {
    const token = getAccessToken();
    if (!token) {
      setShowConfirmDialog(false);
      setNeedsAuth(true);
      setEmailError('Reikia prisijungti per „Google“ iš naujo.');
      return;
    }

    setIsSending(true);
    setEmailError(null);
    try {
      const targetEmail = recipientEmail.trim();
      await sendDiplomaEmail({
        accessToken: token,
        toEmail: targetEmail,
        studentName: studentName.trim() || 'Šaunus Mokinys',
        schoolClass,
        stars,
        unlockedBadgeCount,
        date: todayDate,
      });
      sounds.playFanfare();
      setShowConfirmDialog(false);
      setSendSuccessEmail(targetEmail);
    } catch (err: unknown) {
      sounds.playIncorrect();
      setShowConfirmDialog(false);
      if (err instanceof GmailAuthError) {
        setNeedsAuth(true);
      }
      setEmailError(
        err instanceof Error ? err.message : 'Nepavyko išsiųsti diplomo el. paštu.'
      );
    } finally {
      setIsSending(false);
    }
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
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/80 flex flex-wrap items-end gap-3 print:hidden">
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
              onClick={handlePrint}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-102"
            >
              <Printer className="w-4 h-4" />
              <span>Spausdinti</span>
            </button>

            <button
              id="btn-toggle-email-diploma"
              onClick={() => {
                sounds.playPop();
                setShowEmailPanel((prev) => !prev);
                setEmailError(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all ${
                showEmailPanel
                  ? 'bg-indigo-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Siųsti el. paštu</span>
            </button>
          </div>
        </div>

        {/* Email Sending Drawer (Hidden on print) */}
        {showEmailPanel && (
          <div className="p-4 bg-indigo-50/80 border-b border-indigo-200 space-y-3 print:hidden animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-indigo-950 font-heading font-bold text-xs sm:text-sm">
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>Išsiųsti diplomą per „Gmail“</span>
              </div>
              {user && !needsAuth && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-[11px] font-semibold text-slate-600 hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Atsijungti ({user.email})</span>
                </button>
              )}
            </div>

            {needsAuth || !user ? (
              <div className="bg-white rounded-2xl p-4 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-600 space-y-0.5 text-center sm:text-left">
                  <p className="font-bold text-slate-800">Reikalingas „Google“ prisijungimas</p>
                  <p>Prisijunkite savo paskyra, kad galėtumėte išsiųsti šį diplomą el. paštu.</p>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button shrink-0"
                >
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="block"
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        />
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        />
                        <path fill="none" d="M0 0h48v48H0z" />
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      {isLoggingIn ? 'Jungiamasi...' : 'Prisijungti su Google'}
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestSend} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5">
                <div className="flex-1">
                  <label htmlFor="diploma-recipient-email" className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Gavėjo el. pašto adresas
                  </label>
                  <input
                    id="diploma-recipient-email"
                    type="email"
                    required
                    value={recipientEmail}
                    onChange={(e) => {
                      setRecipientEmail(e.target.value);
                      setEmailError(null);
                      setSendSuccessEmail(null);
                    }}
                    placeholder="pvz., teveliai@pastas.lt arba mokytoja@mokykla.lt"
                    className="w-full px-3 py-2 bg-white border border-indigo-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                {user.email && recipientEmail !== user.email && (
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playPop();
                      setRecipientEmail(user.email || '');
                      setEmailError(null);
                    }}
                    className="px-3 py-2 bg-white border border-indigo-200 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Siųsti sau
                  </button>
                )}

                <button
                  type="submit"
                  disabled={!recipientEmail.trim() || isSending}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Išsiųsti diplomą</span>
                </button>
              </form>
            )}

            {emailError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{emailError}</span>
              </div>
            )}

            {sendSuccessEmail && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Diplomas sėkmingai išsiųstas adresu <strong>{sendSuccessEmail}</strong>!
                </span>
              </div>
            )}
          </div>
        )}

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

        {/* Mandatory User Confirmation Dialog before sending email */}
        {showConfirmDialog && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 print:hidden">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-indigo-200 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-extrabold text-base text-slate-900">
                    Patvirtinkite diplomo siuntimą
                  </h3>
                  <p className="text-xs text-slate-600">
                    Ar tikrai norite išsiųsti šį etiketo diplomą el. paštu per savo „Gmail“ paskyrą?
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <div>
                  <span className="font-bold text-slate-500">Gavėjas</span>{' '}
                  <strong className="text-slate-900">{recipientEmail.trim()}</strong>
                </div>
                <div>
                  <span className="font-bold text-slate-500">Mokinys</span>{' '}
                  <strong>{studentName.trim() || 'Šaunus Mokinys'}</strong> ({schoolClass})
                </div>
                <div>
                  <span className="font-bold text-slate-500">Siuntėjas</span>{' '}
                  <span>{user?.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  disabled={isSending}
                  onClick={() => {
                    sounds.playPop();
                    setShowConfirmDialog(false);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Atšaukti
                </button>
                <button
                  type="button"
                  disabled={isSending}
                  onClick={handleConfirmSend}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-heading font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Siunčiama...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Patvirtinti ir išsiųsti</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
