import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

export const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

let isSigningIn = false;
// Store the Workspace OAuth access token strictly in memory (never in localStorage/sessionStorage).
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess?.(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        onAuthFailure?.(user);
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure?.(null);
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Nepavyko gauti prieigos rakto iš „Google“ paskyros.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const clearCachedToken = () => {
  cachedAccessToken = null;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function utf8ToBase64Url(str: string): string {
  return utf8ToBase64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface SendDiplomaEmailParams {
  accessToken: string;
  toEmail: string;
  studentName: string;
  schoolClass: string;
  stars: number;
  unlockedBadgeCount: number;
  date: string;
}

export class GmailAuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function sendDiplomaEmail({
  accessToken,
  toEmail,
  studentName,
  schoolClass,
  stars,
  unlockedBadgeCount,
  date,
}: SendDiplomaEmailParams): Promise<{ id: string }> {
  const cleanEmail = toEmail.replace(/[\r\n]/g, '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    throw new Error('Įvesk taisyklingą el. pašto adresą.');
  }

  const safeName = (studentName || 'Šaunus Mokinys').replace(/[\r\n]/g, '').trim();
  const safeClass = schoolClass.replace(/[\r\n]/g, '').trim();

  const subjectText = `Etiketo diplomas – ${safeName} (${safeClass})`;
  const encodedSubject = `=?UTF-8?B?${utf8ToBase64(subjectText)}?=`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="lt">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:24px;background-color:#fffbeb;font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:6px double #f59e0b;border-radius:20px;padding:36px 28px;text-align:center;">
    <div style="font-size:36px;margin-bottom:8px;">👑</div>
    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#92400e;">
      MANDAGAUS ELGESIO MOKYKLĖLĖ
    </p>
    <h1 style="margin:8px 0 6px;font-size:28px;color:#0f172a;">ETIKETO DIPLOMAS</h1>
    <p style="margin:0 0 24px;font-size:12px;color:#b45309;">
      Pagal Bob &amp; Emilie Barnes knygą „Good Manners for Today's Kids“
    </p>

    <p style="margin:0 0 8px;font-size:13px;color:#475569;">Šis garbingas diplomas patvirtina, kad</p>
    <div style="border-bottom:2px dashed #f59e0b;padding-bottom:8px;margin:0 auto 16px;max-width:380px;">
      <span style="font-size:24px;font-weight:800;color:#78350f;">${escapeHtml(safeName)}</span>
      <span style="font-size:13px;color:#64748b;margin-left:6px;">(${escapeHtml(safeClass)})</span>
    </div>

    <p style="margin:0 0 22px;font-size:13px;line-height:1.6;color:#334155;">
      sėkmingai išmoko stalo etiketo taisyklių, garbingo žaidimo, svetingumo, švaros bei mandagaus bendravimo principų ir yra oficialiai paskelbtas<br/>
      <strong style="display:inline-block;margin-top:8px;color:#78350f;">🌟 MANDAGUMO IR ETIKETO ČEMPIONU 🌟</strong>
    </p>

    <table role="presentation" style="margin:0 auto 24px;border-collapse:collapse;">
      <tr>
        <td style="padding:8px 20px;text-align:center;border-right:1px solid #fcd34d;">
          <div style="font-size:18px;font-weight:800;color:#78350f;">${stars} ⭐</div>
          <div style="font-size:11px;color:#64748b;">Etiketo žvaigždutės</div>
        </td>
        <td style="padding:8px 20px;text-align:center;">
          <div style="font-size:18px;font-weight:800;color:#78350f;">${unlockedBadgeCount} / 8 🏆</div>
          <div style="font-size:11px;color:#64748b;">Pelnyti ženkleliai</div>
        </td>
      </tr>
    </table>

    <table role="presentation" style="width:100%;border-top:1px solid #fcd34d;padding-top:16px;font-size:12px;color:#475569;">
      <tr>
        <td style="text-align:left;padding-top:14px;">
          <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;font-weight:700;">Data</div>
          <div style="font-weight:700;color:#1e293b;">${escapeHtml(date)}</div>
        </td>
        <td style="text-align:right;padding-top:14px;">
          <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;font-weight:700;">Patvirtino</div>
          <div style="font-weight:700;color:#92400e;">🦉 Išmintingoji Etiketo Pelėda</div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`.trim();

  const mimeMessage = [
    `To: ${cleanEmail}`,
    `Subject: ${encodedSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    utf8ToBase64(htmlBody),
  ].join('\r\n');

  const raw = utf8ToBase64Url(mimeMessage);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  });

  if (!response.ok) {
    let message = 'Nepavyko išsiųsti diplomo per „Gmail“.';
    try {
      const errData = await response.json();
      if (errData?.error?.message) {
        message = errData.error.message;
      }
    } catch {
      // ignore json parse error
    }
    if (response.status === 401 || response.status === 403) {
      clearCachedToken();
      throw new GmailAuthError(
        'Baigėsi „Google“ prisijungimo sesija arba trūksta leidimo siųsti laišką. Prisijunkite iš naujo.',
        response.status
      );
    }
    throw new Error(message);
  }

  return response.json();
}
