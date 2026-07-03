# QR Generator Page (`/qr`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a client-side `/qr` page to jorciney.dev with three QR modes (Text/URL, WiFi, SEPA payment), a 4-language UI (en/nl/pt/fr), and PNG/SVG download — a safer rebuild of the reference `qr-generator.html`.

**Architecture:** Next.js App Router page (`src/app/qr/page.tsx`, static export) renders a `'use client'` orchestrator `QrGeneratorSection`. Pure logic lives in `src/lib/qr/*` (IBAN, amount, payload builders, translations, download helpers). Presentational form/preview components live in `src/components/qr/*` and reuse existing `Button`/`Input`/`Card` UI + Tailwind theme tokens.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind, `qrcode` npm package (canvas rendering — no CDN script, no `innerHTML`).

**Verification note:** No test runner is configured in this repo, and the spec did not add one. Correctness of pure modules is verified with `npx tsc --noEmit` (typecheck) plus explicit manual assertions run via `node` on compiled snippets where noted, and the whole feature is verified at the end with `npm run build`, `npm run lint`, and manual browser checks. Do NOT introduce a test framework — it is out of scope.

---

### Task 1: Add the `qrcode` dependency

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install runtime + types**

Run:
```bash
npm install qrcode
npm install -D @types/qrcode
```
Expected: `qrcode` appears under `dependencies` and `@types/qrcode` under `devDependencies` in `package.json`; lockfile updated. No CDN script tag anywhere.

- [ ] **Step 2: Verify it imports and typechecks**

Run:
```bash
node -e "const q=require('qrcode'); console.log(typeof q.toCanvas, typeof q.toString)"
```
Expected: `function function`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add qrcode dependency for QR generator page"
```

---

### Task 2: IBAN utilities (`src/lib/qr/iban.ts`)

**Files:**
- Create: `src/lib/qr/iban.ts`

- [ ] **Step 1: Write the module**

```typescript
// src/lib/qr/iban.ts
// Pure IBAN helpers. mod-97 validation ported from the reference implementation.

export function cleanIban(raw: string): string {
  return raw.replace(/\s/g, '').toUpperCase()
}

export function formatIban(iban: string): string {
  return cleanIban(iban).replace(/(.{4})/g, '$1 ').trim()
}

export function isValidIban(raw: string): boolean {
  const iban = cleanIban(raw)
  // Accept all SEPA lengths 15-34; structure: 2 letters, 2 digits, then 11-30 alnum
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false

  // Move first 4 chars to end, convert letters (A=10..Z=35), mod 97 must equal 1
  const rearranged = iban.slice(4) + iban.slice(0, 4)
  const numeric = rearranged.replace(/[A-Z]/g, (c) => (c.charCodeAt(0) - 55).toString())

  let remainder = 0
  for (let i = 0; i < numeric.length; i += 7) {
    const chunk = remainder + numeric.substring(i, i + 7)
    remainder = parseInt(chunk, 10) % 97
  }
  return remainder === 1
}
```

- [ ] **Step 2: Verify logic with a throwaway node check**

Run:
```bash
node --input-type=module -e "
const cleanIban = (r) => r.replace(/\s/g,'').toUpperCase();
const isValidIban = (raw) => {
  const iban = cleanIban(raw);
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}\$/.test(iban)) return false;
  const re = iban.slice(4)+iban.slice(0,4);
  const num = re.replace(/[A-Z]/g, c => (c.charCodeAt(0)-55).toString());
  let rem = 0;
  for (let i=0;i<num.length;i+=7){ rem = parseInt(rem+num.substring(i,i+7),10)%97; }
  return rem===1;
};
console.log('valid BE68', isValidIban('BE68 5390 0754 7034') === true);
console.log('invalid BE00', isValidIban('BE00 0000 0000 0000') === false);
console.log('too short', isValidIban('BE68') === false);
console.log('valid NL', isValidIban('NL91ABNA0417164300') === true);
"
```
Expected: all four lines print `... true`.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/qr/iban.ts
git commit -m "feat: add IBAN validation/formatting utilities"
```

---

### Task 3: Amount utilities (`src/lib/qr/amount.ts`)

**Files:**
- Create: `src/lib/qr/amount.ts`

- [ ] **Step 1: Write the module**

```typescript
// src/lib/qr/amount.ts
// Parse/format euro amounts. Accepts comma or dot as decimal separator.

export const MAX_AMOUNT = 999999999.99

export function parseAmount(raw: string): number {
  if (!raw) return NaN
  const cleaned = raw.replace(/[^\d.,]/g, '').replace(',', '.')
  return parseFloat(cleaned)
}

export function formatAmount(n: number): string {
  return n.toFixed(2).replace('.', ',')
}

export function isValidAmount(n: number): boolean {
  return !Number.isNaN(n) && n > 0 && n <= MAX_AMOUNT
}
```

- [ ] **Step 2: Verify logic with a throwaway node check**

Run:
```bash
node -e "
const parseAmount = (raw) => raw ? parseFloat(raw.replace(/[^\d.,]/g,'').replace(',','.')) : NaN;
const formatAmount = (n) => n.toFixed(2).replace('.',',');
console.log('comma', parseAmount('50,00') === 50);
console.log('dot', parseAmount('50.00') === 50);
console.log('junk', Number.isNaN(parseAmount('abc')) === true);
console.log('format', formatAmount(50) === '50,00');
"
```
Expected: all lines print `... true`.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/qr/amount.ts
git commit -m "feat: add euro amount parse/format utilities"
```

---

### Task 4: Payload builders (`src/lib/qr/payloads.ts`)

**Files:**
- Create: `src/lib/qr/payloads.ts`

- [ ] **Step 1: Write the module**

```typescript
// src/lib/qr/payloads.ts
// Pure builders that turn form data into QR content strings.
import { cleanIban } from './iban'

export interface SepaData {
  name: string
  iban: string
  amount: number
  reference: string
}

// EPC069-12 SEPA Credit Transfer payload (version 002, charset UTF-8=1, SCT)
export function buildEpcPayload({ name, iban, amount, reference }: SepaData): string {
  return [
    'BCD',
    '002',
    '1',
    'SCT',
    '',
    name.substring(0, 70),
    cleanIban(iban),
    `EUR${amount.toFixed(2)}`,
    '',
    '',
    (reference || '').substring(0, 140),
  ].join('\n')
}

export type WifiEncryption = 'WPA' | 'WEP' | 'nopass'

export interface WifiData {
  ssid: string
  password: string
  encryption: WifiEncryption
  hidden: boolean
}

// Escape reserved characters for the WIFI: URI scheme.
function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, '\\$1')
}

export function buildWifiPayload({ ssid, password, encryption, hidden }: WifiData): string {
  const parts = [
    `WIFI:T:${encryption}`,
    `S:${escapeWifi(ssid)}`,
    encryption === 'nopass' ? '' : `P:${escapeWifi(password)}`,
    hidden ? 'H:true' : '',
  ].filter(Boolean)
  return parts.join(';') + ';;'
}
```

- [ ] **Step 2: Verify escaping + structure with a throwaway node check**

Run:
```bash
node -e "
const esc = (v) => v.replace(/([\\\\;,:\"])/g,'\\\\\$1');
const buildWifi = ({ssid,password,encryption,hidden}) => {
  const parts = ['WIFI:T:'+encryption, 'S:'+esc(ssid), encryption==='nopass'?'':'P:'+esc(password), hidden?'H:true':''].filter(Boolean);
  return parts.join(';')+';;';
};
console.log(buildWifi({ssid:'My;Net',password:'p:a,ss',encryption:'WPA',hidden:false}));
console.log(buildWifi({ssid:'Open',password:'',encryption:'nopass',hidden:true}));
"
```
Expected first line: `WIFI:T:WPA;S:My\;Net;P:p\:a\,ss;;`
Expected second line: `WIFI:T:nopass;S:Open;H:true;;`

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/qr/payloads.ts
git commit -m "feat: add EPC069-12 and WiFi QR payload builders"
```

---

### Task 5: Translations (`src/lib/qr/translations.ts`)

**Files:**
- Create: `src/lib/qr/translations.ts`

- [ ] **Step 1: Write the typed dictionary**

```typescript
// src/lib/qr/translations.ts
// Feature-local i18n. Not a site-wide framework. Wire formats are never translated.

export type Language = 'en' | 'nl' | 'pt' | 'fr'
export type QrMode = 'text' | 'wifi' | 'sepa'

export interface Translations {
  pageTitle: string
  pageLede: string
  languageLabel: string
  modes: Record<QrMode, string>
  // Text/URL
  textLabel: string
  textHint: string
  textPlaceholder: string
  textTooLong: string
  // WiFi
  wifiSsidLabel: string
  wifiPasswordLabel: string
  wifiEncryptionLabel: string
  wifiHiddenLabel: string
  wifiShow: string
  wifiHide: string
  encryption: Record<WifiEncryptionKey, string>
  wifiSsidRequired: string
  wifiPasswordRequired: string
  // SEPA
  sepaNameLabel: string
  sepaNameHint: string
  sepaIbanLabel: string
  sepaIbanHint: string
  sepaAmountLabel: string
  sepaAmountHint: string
  sepaRefLabel: string
  sepaRefHint: string
  sepaIbanInvalid: string
  sepaIbanValid: string
  sepaAmountInvalid: string
  sepaNameRequired: string
  // Preview / download
  previewLabel: string
  previewPlaceholder: string
  contentTooLong: string
  downloadPng: string
  downloadSvg: string
  // Help
  helpSummary: string
  helpBody: string
  privacyNote: string
}

export type WifiEncryptionKey = 'WPA' | 'WEP' | 'nopass'

export const translations: Record<Language, Translations> = {
  en: {
    pageTitle: 'QR Code Generator',
    pageLede: 'Generate a QR code for a link, a WiFi network, or a SEPA payment. Everything runs in your browser — nothing is uploaded or stored.',
    languageLabel: 'Language',
    modes: { text: 'Text / URL', wifi: 'WiFi', sepa: 'SEPA Payment' },
    textLabel: 'Text or URL',
    textHint: 'anything you want to encode',
    textPlaceholder: 'https://jorciney.dev',
    textTooLong: 'Too long — shorten to fit a scannable QR code',
    wifiSsidLabel: 'Network name (SSID)',
    wifiPasswordLabel: 'Password',
    wifiEncryptionLabel: 'Security',
    wifiHiddenLabel: 'Hidden network',
    wifiShow: 'Show',
    wifiHide: 'Hide',
    encryption: { WPA: 'WPA/WPA2', WEP: 'WEP', nopass: 'None (open)' },
    wifiSsidRequired: 'Enter a network name',
    wifiPasswordRequired: 'Enter a password',
    sepaNameLabel: 'Beneficiary',
    sepaNameHint: 'name on the account',
    sepaIbanLabel: 'IBAN',
    sepaIbanHint: 'account number',
    sepaAmountLabel: 'Amount',
    sepaAmountHint: 'in euro',
    sepaRefLabel: 'Reference',
    sepaRefHint: 'optional · max 140 chars',
    sepaIbanInvalid: 'This IBAN is not valid (check digits do not match)',
    sepaIbanValid: '✓ Valid IBAN',
    sepaAmountInvalid: 'Enter a valid amount',
    sepaNameRequired: 'Enter the beneficiary name',
    previewLabel: 'Scan with your app',
    previewPlaceholder: 'Fill in the form to see the QR code',
    contentTooLong: 'Content is too long to fit in a QR code',
    downloadPng: 'Download PNG',
    downloadSvg: 'Download SVG',
    helpSummary: 'How does this work?',
    helpBody: 'The QR code encodes your input in a standard format your phone recognises. For SEPA it follows the EPC069-12 standard used by European banking apps.',
    privacyNote: 'Privacy: everything happens in your browser. No server, no tracking, no storage.',
  },
  nl: {
    pageTitle: 'QR-code Generator',
    pageLede: 'Maak een QR-code voor een link, een WiFi-netwerk of een SEPA-betaling. Alles gebeurt in je browser — niets wordt geüpload of opgeslagen.',
    languageLabel: 'Taal',
    modes: { text: 'Tekst / URL', wifi: 'WiFi', sepa: 'SEPA-betaling' },
    textLabel: 'Tekst of URL',
    textHint: 'alles wat je wil coderen',
    textPlaceholder: 'https://jorciney.dev',
    textTooLong: 'Te lang — kort in voor een scanbare QR-code',
    wifiSsidLabel: 'Netwerknaam (SSID)',
    wifiPasswordLabel: 'Wachtwoord',
    wifiEncryptionLabel: 'Beveiliging',
    wifiHiddenLabel: 'Verborgen netwerk',
    wifiShow: 'Toon',
    wifiHide: 'Verberg',
    encryption: { WPA: 'WPA/WPA2', WEP: 'WEP', nopass: 'Geen (open)' },
    wifiSsidRequired: 'Voer een netwerknaam in',
    wifiPasswordRequired: 'Voer een wachtwoord in',
    sepaNameLabel: 'Begunstigde',
    sepaNameHint: 'naam op de rekening',
    sepaIbanLabel: 'IBAN',
    sepaIbanHint: 'rekeningnummer',
    sepaAmountLabel: 'Bedrag',
    sepaAmountHint: 'in euro',
    sepaRefLabel: 'Mededeling',
    sepaRefHint: 'optioneel · max 140 tekens',
    sepaIbanInvalid: 'Dit IBAN is niet geldig (controlecijfers kloppen niet)',
    sepaIbanValid: '✓ Geldig IBAN',
    sepaAmountInvalid: 'Voer een geldig bedrag in',
    sepaNameRequired: 'Voer de naam van de begunstigde in',
    previewLabel: 'Scan met je app',
    previewPlaceholder: 'Vul het formulier in om de QR-code te zien',
    contentTooLong: 'Inhoud is te lang voor een QR-code',
    downloadPng: 'PNG downloaden',
    downloadSvg: 'SVG downloaden',
    helpSummary: 'Hoe werkt dit?',
    helpBody: 'De QR-code codeert je invoer in een standaardformaat dat je telefoon herkent. Voor SEPA volgt het de EPC069-12-standaard die Europese banking apps gebruiken.',
    privacyNote: 'Privacy: alles gebeurt in je browser. Geen server, geen tracking, geen opslag.',
  },
  pt: {
    pageTitle: 'Gerador de Código QR',
    pageLede: 'Gere um código QR para um link, uma rede WiFi ou um pagamento SEPA. Tudo acontece no seu navegador — nada é enviado ou armazenado.',
    languageLabel: 'Idioma',
    modes: { text: 'Texto / URL', wifi: 'WiFi', sepa: 'Pagamento SEPA' },
    textLabel: 'Texto ou URL',
    textHint: 'qualquer coisa que queira codificar',
    textPlaceholder: 'https://jorciney.dev',
    textTooLong: 'Demasiado longo — encurte para um código QR legível',
    wifiSsidLabel: 'Nome da rede (SSID)',
    wifiPasswordLabel: 'Palavra-passe',
    wifiEncryptionLabel: 'Segurança',
    wifiHiddenLabel: 'Rede oculta',
    wifiShow: 'Mostrar',
    wifiHide: 'Ocultar',
    encryption: { WPA: 'WPA/WPA2', WEP: 'WEP', nopass: 'Nenhuma (aberta)' },
    wifiSsidRequired: 'Introduza um nome de rede',
    wifiPasswordRequired: 'Introduza uma palavra-passe',
    sepaNameLabel: 'Beneficiário',
    sepaNameHint: 'nome na conta',
    sepaIbanLabel: 'IBAN',
    sepaIbanHint: 'número da conta',
    sepaAmountLabel: 'Montante',
    sepaAmountHint: 'em euros',
    sepaRefLabel: 'Referência',
    sepaRefHint: 'opcional · máx 140 caracteres',
    sepaIbanInvalid: 'Este IBAN não é válido (dígitos de controlo não correspondem)',
    sepaIbanValid: '✓ IBAN válido',
    sepaAmountInvalid: 'Introduza um montante válido',
    sepaNameRequired: 'Introduza o nome do beneficiário',
    previewLabel: 'Digitalize com a sua aplicação',
    previewPlaceholder: 'Preencha o formulário para ver o código QR',
    contentTooLong: 'O conteúdo é demasiado longo para um código QR',
    downloadPng: 'Descarregar PNG',
    downloadSvg: 'Descarregar SVG',
    helpSummary: 'Como funciona?',
    helpBody: 'O código QR codifica os seus dados num formato padrão que o seu telemóvel reconhece. Para SEPA segue a norma EPC069-12 usada pelas aplicações bancárias europeias.',
    privacyNote: 'Privacidade: tudo acontece no seu navegador. Sem servidor, sem rastreamento, sem armazenamento.',
  },
  fr: {
    pageTitle: 'Générateur de code QR',
    pageLede: 'Générez un code QR pour un lien, un réseau WiFi ou un paiement SEPA. Tout se passe dans votre navigateur — rien n\'est envoyé ni stocké.',
    languageLabel: 'Langue',
    modes: { text: 'Texte / URL', wifi: 'WiFi', sepa: 'Paiement SEPA' },
    textLabel: 'Texte ou URL',
    textHint: 'tout ce que vous voulez encoder',
    textPlaceholder: 'https://jorciney.dev',
    textTooLong: 'Trop long — raccourcissez pour un code QR lisible',
    wifiSsidLabel: 'Nom du réseau (SSID)',
    wifiPasswordLabel: 'Mot de passe',
    wifiEncryptionLabel: 'Sécurité',
    wifiHiddenLabel: 'Réseau caché',
    wifiShow: 'Afficher',
    wifiHide: 'Masquer',
    encryption: { WPA: 'WPA/WPA2', WEP: 'WEP', nopass: 'Aucune (ouvert)' },
    wifiSsidRequired: 'Saisissez un nom de réseau',
    wifiPasswordRequired: 'Saisissez un mot de passe',
    sepaNameLabel: 'Bénéficiaire',
    sepaNameHint: 'nom sur le compte',
    sepaIbanLabel: 'IBAN',
    sepaIbanHint: 'numéro de compte',
    sepaAmountLabel: 'Montant',
    sepaAmountHint: 'en euros',
    sepaRefLabel: 'Communication',
    sepaRefHint: 'optionnel · max 140 caractères',
    sepaIbanInvalid: 'Cet IBAN n\'est pas valide (les chiffres de contrôle ne correspondent pas)',
    sepaIbanValid: '✓ IBAN valide',
    sepaAmountInvalid: 'Saisissez un montant valide',
    sepaNameRequired: 'Saisissez le nom du bénéficiaire',
    previewLabel: 'Scannez avec votre application',
    previewPlaceholder: 'Remplissez le formulaire pour voir le code QR',
    contentTooLong: 'Le contenu est trop long pour un code QR',
    downloadPng: 'Télécharger PNG',
    downloadSvg: 'Télécharger SVG',
    helpSummary: 'Comment ça marche ?',
    helpBody: 'Le code QR encode vos données dans un format standard que votre téléphone reconnaît. Pour SEPA, il suit la norme EPC069-12 utilisée par les applications bancaires européennes.',
    privacyNote: 'Confidentialité : tout se passe dans votre navigateur. Pas de serveur, pas de suivi, pas de stockage.',
  },
}
```

- [ ] **Step 2: Typecheck (guarantees all 4 languages implement the full interface)**

Run: `npx tsc --noEmit`
Expected: no errors. (A missing key in any language is a compile error.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/qr/translations.ts
git commit -m "feat: add en/nl/pt/fr translations for QR generator"
```

---

### Task 6: Download helpers (`src/lib/qr/download.ts`)

**Files:**
- Create: `src/lib/qr/download.ts`

- [ ] **Step 1: Write the module**

```typescript
// src/lib/qr/download.ts
// Browser-only helpers for turning a payload into downloadable PNG/SVG files.
import QRCode from 'qrcode'
import type { QrMode } from './translations'

export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadCanvasPng(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (blob) triggerDownload(blob, filename)
  }, 'image/png')
}

export async function downloadSvg(payload: string, filename: string): Promise<void> {
  const svgString = await QRCode.toString(payload, {
    type: 'svg',
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
    errorCorrectionLevel: 'M',
  })
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  triggerDownload(blob, filename)
}

export function makeFilename(mode: QrMode, ext: 'png' | 'svg'): string {
  const base = mode === 'sepa' ? 'payment-qr' : mode === 'wifi' ? 'wifi-qr' : 'qr-code'
  return `${base}.${ext}`
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/qr/download.ts
git commit -m "feat: add PNG/SVG download helpers for QR generator"
```

---

### Task 7: QR preview + download component (`src/components/qr/QrPreview.tsx`)

**Files:**
- Create: `src/components/qr/QrPreview.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/qr/QrPreview.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { downloadCanvasPng, downloadSvg, makeFilename } from '@/lib/qr/download'
import type { QrMode, Translations } from '@/lib/qr/translations'

interface QrPreviewProps {
  payload: string | null
  mode: QrMode
  t: Translations
}

export default function QrPreview({ payload, mode, t }: QrPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState(false)
  const ready = Boolean(payload) && !error

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !payload) {
      setError(false)
      return
    }
    QRCode.toCanvas(canvas, payload, {
      width: 240,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    })
      .then(() => setError(false))
      .catch(() => setError(true))
  }, [payload])

  return (
    <Card className="p-8 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{t.previewLabel}</p>

      <div className="inline-flex items-center justify-center rounded-lg bg-white p-4 min-w-[272px] min-h-[272px]">
        {/* Canvas is always mounted so the ref is stable; hidden until valid */}
        <canvas ref={canvasRef} className={ready ? 'block' : 'hidden'} />
        {!ready && (
          <span className="max-w-[220px] text-sm text-gray-400 italic">
            {error ? t.contentTooLong : t.previewPlaceholder}
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="default"
          disabled={!ready}
          onClick={() => canvasRef.current && downloadCanvasPng(canvasRef.current, makeFilename(mode, 'png'))}
        >
          <Download className="w-4 h-4" />
          {t.downloadPng}
        </Button>
        <Button
          variant="outline"
          disabled={!ready}
          onClick={() => payload && downloadSvg(payload, makeFilename(mode, 'svg'))}
        >
          <Download className="w-4 h-4" />
          {t.downloadSvg}
        </Button>
      </div>
    </Card>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/qr/QrPreview.tsx
git commit -m "feat: add QR canvas preview + download component"
```

---

### Task 8: Mode tabs (`src/components/qr/ModeTabs.tsx`)

**Files:**
- Create: `src/components/qr/ModeTabs.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/qr/ModeTabs.tsx
'use client'

import { cn } from '@/lib/utils'
import type { QrMode, Translations } from '@/lib/qr/translations'

interface ModeTabsProps {
  mode: QrMode
  onChange: (mode: QrMode) => void
  t: Translations
}

const MODES: QrMode[] = ['text', 'wifi', 'sepa']

export default function ModeTabs({ mode, onChange, t }: ModeTabsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6" role="tablist">
      {MODES.map((m) => (
        <button
          key={m}
          role="tab"
          aria-selected={mode === m}
          onClick={() => onChange(m)}
          className={cn(
            'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
            mode === m
              ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300'
              : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'
          )}
        >
          {t.modes[m]}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/qr/ModeTabs.tsx
git commit -m "feat: add QR mode tabs component"
```

---

### Task 9: Language selector (`src/components/qr/LanguageSelector.tsx`)

**Files:**
- Create: `src/components/qr/LanguageSelector.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/qr/LanguageSelector.tsx
'use client'

import type { Language, Translations } from '@/lib/qr/translations'

interface LanguageSelectorProps {
  language: Language
  onChange: (language: Language) => void
  t: Translations
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
]

export default function LanguageSelector({ language, onChange, t }: LanguageSelectorProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <span className="sr-only sm:not-sr-only">{t.languageLabel}</span>
      <select
        value={language}
        onChange={(e) => onChange(e.target.value as Language)}
        aria-label={t.languageLabel}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/qr/LanguageSelector.tsx
git commit -m "feat: add QR language selector component"
```

---

### Task 10: Shared field UI helper (`src/components/qr/Field.tsx`)

A small labelled-field wrapper reused by all three forms (label + hint + inline message). Keeps forms DRY.

**Files:**
- Create: `src/components/qr/Field.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/qr/Field.tsx
'use client'

import { cn } from '@/lib/utils'

export type FieldStatus = 'idle' | 'error' | 'success'

interface FieldProps {
  label: string
  hint?: string
  message?: string
  status?: FieldStatus
  htmlFor?: string
  children: React.ReactNode
}

export default function Field({ label, hint, message, status = 'idle', htmlFor, children }: FieldProps) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
          {label}
        </label>
        {hint && <span className="text-xs italic text-gray-400">{hint}</span>}
      </div>
      {children}
      {message && (
        <p
          className={cn(
            'mt-1.5 text-xs min-h-[16px]',
            status === 'error' && 'text-red-600 dark:text-red-400',
            status === 'success' && 'text-green-600 dark:text-green-400'
          )}
        >
          {message}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/qr/Field.tsx
git commit -m "feat: add shared Field wrapper for QR forms"
```

---

### Task 11: Text/URL form (`src/components/qr/TextUrlForm.tsx`)

**Files:**
- Create: `src/components/qr/TextUrlForm.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/qr/TextUrlForm.tsx
'use client'

import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/Input'
import Field from './Field'
import type { Translations } from '@/lib/qr/translations'

const MAX_TEXT_LENGTH = 1000

interface TextUrlFormProps {
  t: Translations
  onPayloadChange: (payload: string | null) => void
}

export default function TextUrlForm({ t, onPayloadChange }: TextUrlFormProps) {
  const [value, setValue] = useState('')
  const tooLong = value.length > MAX_TEXT_LENGTH

  useEffect(() => {
    const trimmed = value.trim()
    onPayloadChange(trimmed.length > 0 && !tooLong ? trimmed : null)
  }, [value, tooLong, onPayloadChange])

  return (
    <Field
      label={t.textLabel}
      hint={t.textHint}
      htmlFor="qr-text"
      message={tooLong ? t.textTooLong : undefined}
      status={tooLong ? 'error' : 'idle'}
    >
      <Textarea
        id="qr-text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t.textPlaceholder}
        className="min-h-[120px]"
      />
    </Field>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/qr/TextUrlForm.tsx
git commit -m "feat: add Text/URL QR form"
```

---

### Task 12: WiFi form (`src/components/qr/WifiForm.tsx`)

**Files:**
- Create: `src/components/qr/WifiForm.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/qr/WifiForm.tsx
'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Field from './Field'
import { buildWifiPayload, type WifiEncryption } from '@/lib/qr/payloads'
import type { Translations, WifiEncryptionKey } from '@/lib/qr/translations'

const ENCRYPTIONS: WifiEncryptionKey[] = ['WPA', 'WEP', 'nopass']

interface WifiFormProps {
  t: Translations
  onPayloadChange: (payload: string | null) => void
}

export default function WifiForm({ t, onPayloadChange }: WifiFormProps) {
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState<WifiEncryption>('WPA')
  const [hidden, setHidden] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const needsPassword = encryption !== 'nopass'
  const ssidOk = ssid.trim().length > 0
  const passwordOk = !needsPassword || password.length > 0

  useEffect(() => {
    if (ssidOk && passwordOk) {
      onPayloadChange(buildWifiPayload({ ssid: ssid.trim(), password, encryption, hidden }))
    } else {
      onPayloadChange(null)
    }
  }, [ssid, password, encryption, hidden, ssidOk, passwordOk, onPayloadChange])

  return (
    <div>
      <Field label={t.wifiSsidLabel} htmlFor="wifi-ssid">
        <Input id="wifi-ssid" value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="MyNetwork" />
      </Field>

      <Field label={t.wifiEncryptionLabel} htmlFor="wifi-enc">
        <select
          id="wifi-enc"
          value={encryption}
          onChange={(e) => setEncryption(e.target.value as WifiEncryption)}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        >
          {ENCRYPTIONS.map((enc) => (
            <option key={enc} value={enc}>
              {t.encryption[enc]}
            </option>
          ))}
        </select>
      </Field>

      {needsPassword && (
        <Field label={t.wifiPasswordLabel} htmlFor="wifi-pass">
          <div className="flex gap-2">
            <Input
              id="wifi-pass"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="button" variant="outline" size="md" onClick={() => setShowPassword((s) => !s)}>
              {showPassword ? t.wifiHide : t.wifiShow}
            </Button>
          </div>
        </Field>
      )}

      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} />
        {t.wifiHiddenLabel}
      </label>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/qr/WifiForm.tsx
git commit -m "feat: add WiFi QR form"
```

---

### Task 13: SEPA form (`src/components/qr/SepaForm.tsx`)

**Files:**
- Create: `src/components/qr/SepaForm.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/qr/SepaForm.tsx
'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/Input'
import Field, { type FieldStatus } from './Field'
import { cleanIban, formatIban, isValidIban } from '@/lib/qr/iban'
import { parseAmount, formatAmount, isValidAmount } from '@/lib/qr/amount'
import { buildEpcPayload } from '@/lib/qr/payloads'
import type { Translations } from '@/lib/qr/translations'

interface SepaFormProps {
  t: Translations
  onPayloadChange: (payload: string | null) => void
}

export default function SepaForm({ t, onPayloadChange }: SepaFormProps) {
  const [name, setName] = useState('')
  const [iban, setIban] = useState('')
  const [amountRaw, setAmountRaw] = useState('')
  const [reference, setReference] = useState('')

  const nameOk = name.trim().length >= 2
  const ibanOk = isValidIban(iban)
  const ibanCleanLen = cleanIban(iban).length
  const amount = parseAmount(amountRaw)
  const amountOk = isValidAmount(amount)

  useEffect(() => {
    if (nameOk && ibanOk && amountOk) {
      onPayloadChange(buildEpcPayload({ name: name.trim(), iban, amount, reference: reference.trim() }))
    } else {
      onPayloadChange(null)
    }
  }, [name, iban, amountRaw, reference, nameOk, ibanOk, amountOk, amount, onPayloadChange])

  // IBAN inline status
  let ibanStatus: FieldStatus = 'idle'
  let ibanMsg: string | undefined
  if (ibanOk) {
    ibanStatus = 'success'
    ibanMsg = t.sepaIbanValid
  } else if (ibanCleanLen >= 15) {
    ibanStatus = 'error'
    ibanMsg = t.sepaIbanInvalid
  }

  const amountShownInvalid = amountRaw.length > 0 && !amountOk

  return (
    <div>
      <Field label={t.sepaNameLabel} hint={t.sepaNameHint} htmlFor="sepa-name">
        <Input
          id="sepa-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jan Janssens"
          maxLength={70}
        />
      </Field>

      <Field label={t.sepaIbanLabel} hint={t.sepaIbanHint} htmlFor="sepa-iban" message={ibanMsg} status={ibanStatus}>
        <Input
          id="sepa-iban"
          value={iban}
          onChange={(e) => setIban(formatIban(e.target.value))}
          placeholder="BE68 5390 0754 7034"
          className="font-mono"
          autoCapitalize="characters"
          maxLength={42}
        />
      </Field>

      <Field
        label={t.sepaAmountLabel}
        hint={t.sepaAmountHint}
        htmlFor="sepa-amount"
        message={amountShownInvalid ? t.sepaAmountInvalid : undefined}
        status={amountShownInvalid ? 'error' : 'idle'}
      >
        <Input
          id="sepa-amount"
          value={amountRaw}
          onChange={(e) => setAmountRaw(e.target.value)}
          onBlur={() => {
            if (amountOk) setAmountRaw(formatAmount(amount))
          }}
          inputMode="decimal"
          placeholder="50,00"
        />
      </Field>

      <Field label={t.sepaRefLabel} hint={t.sepaRefHint} htmlFor="sepa-ref">
        <Input
          id="sepa-ref"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Invoice 2026-001"
          maxLength={140}
        />
      </Field>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/qr/SepaForm.tsx
git commit -m "feat: add SEPA payment QR form"
```

---

### Task 14: Orchestrator (`src/components/sections/QrGeneratorSection.tsx`)

**Files:**
- Create: `src/components/sections/QrGeneratorSection.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/sections/QrGeneratorSection.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import ModeTabs from '@/components/qr/ModeTabs'
import LanguageSelector from '@/components/qr/LanguageSelector'
import TextUrlForm from '@/components/qr/TextUrlForm'
import WifiForm from '@/components/qr/WifiForm'
import SepaForm from '@/components/qr/SepaForm'
import QrPreview from '@/components/qr/QrPreview'
import { translations, type Language, type QrMode } from '@/lib/qr/translations'

const LANG_KEY = 'qr-lang'
const VALID_LANGS: Language[] = ['en', 'nl', 'pt', 'fr']

export default function QrGeneratorSection() {
  const [language, setLanguage] = useState<Language>('en')
  const [mode, setMode] = useState<QrMode>('text')
  const [payload, setPayload] = useState<string | null>(null)

  // Restore persisted language on mount
  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored && (VALID_LANGS as string[]).includes(stored)) {
      setLanguage(stored as Language)
    }
  }, [])

  function changeLanguage(next: Language) {
    setLanguage(next)
    localStorage.setItem(LANG_KEY, next)
  }

  // Reset payload when switching modes so a stale QR never shows
  function changeMode(next: QrMode) {
    setMode(next)
    setPayload(null)
  }

  const t = translations[language]

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
        <LanguageSelector language={language} onChange={changeLanguage} t={t} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t.pageLede}</p>

      <Card className="p-6 mb-6">
        <ModeTabs mode={mode} onChange={changeMode} t={t} />
        {mode === 'text' && <TextUrlForm t={t} onPayloadChange={setPayload} />}
        {mode === 'wifi' && <WifiForm t={t} onPayloadChange={setPayload} />}
        {mode === 'sepa' && <SepaForm t={t} onPayloadChange={setPayload} />}
      </Card>

      <QrPreview payload={payload} mode={mode} t={t} />

      <details className="mt-8 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">{t.helpSummary}</summary>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>{t.helpBody}</p>
          <p>{t.privacyNote}</p>
        </div>
      </details>
    </section>
  )
}
```

Note: the mode-switch child components unmount/remount when `mode` changes, so their local state resets and each fires its own `onPayloadChange` on mount — combined with `setPayload(null)` in `changeMode`, the preview is always consistent with the active form.

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/QrGeneratorSection.tsx
git commit -m "feat: add QR generator orchestrator section"
```

---

### Task 15: Route page (`src/app/qr/page.tsx`)

**Files:**
- Create: `src/app/qr/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// src/app/qr/page.tsx
import type { Metadata } from 'next'
import QrGeneratorSection from '@/components/sections/QrGeneratorSection'

export const metadata: Metadata = {
  title: 'QR Code Generator - Jorciney Dias Chaveiro',
  description: 'Free client-side QR code generator for links, WiFi networks, and SEPA payments (EPC069-12). Nothing is uploaded or stored.',
  keywords: 'QR code generator, WiFi QR, SEPA payment QR, EPC069-12, IBAN QR',
}

export default function QrPage() {
  return (
    <div className="pt-16">
      <QrGeneratorSection />
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/qr/page.tsx
git commit -m "feat: add /qr route page"
```

---

### Task 16: Add nav link to Header

**Files:**
- Modify: `src/components/layout/Header.tsx:15-22` (the `navLinks` array)

- [ ] **Step 1: Add the QR link**

Find:
```typescript
    { href: 'blog', label: 'Blog' },
    { href: 'bookmarks', label: 'Bookmarks' },
    { href: '#contact', label: 'Contact' }
```
Replace with:
```typescript
    { href: 'blog', label: 'Blog' },
    { href: 'bookmarks', label: 'Bookmarks' },
    { href: 'qr', label: 'QR' },
    { href: '#contact', label: 'Contact' }
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat: add QR page to site navigation"
```

---

### Task 17: Full build, lint, and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: no errors, no new warnings.

- [ ] **Step 2: Production build (static export)**

Run: `npm run build`
Expected: build succeeds; output includes a `qr` route; no errors. Confirm `out/qr/index.html` exists:
```bash
ls out/qr/index.html
```
Expected: path prints (file exists).

- [ ] **Step 3: Manual browser verification**

Run: `npm run dev`, open `http://localhost:3000/qr`, and confirm:
  - **Text/URL:** typing `https://jorciney.dev` renders a QR; clearing the field hides it. Pasting >1000 chars shows the too-long message and hides the QR.
  - **WiFi:** entering SSID + password (WPA) renders a QR; switching to "None (open)" hides the password field and still renders; show/hide toggle reveals the password; scanning with a phone offers to join the network.
  - **SEPA:** `BE68 5390 0754 7034` shows "✓ Valid IBAN"; a bad IBAN of ≥15 chars shows the invalid message; amount `50` reformats to `50,00` on blur; a valid name+IBAN+amount renders a QR that a Belgian banking app opens as a pre-filled payment.
  - **Language:** switching to Nederlands/Português/Français updates all labels, hints, and messages; reloading the page keeps the chosen language (localStorage).
  - **Downloads:** PNG downloads and opens; SVG downloads and opens with a white background.
  - **Theme:** toggle dark/light — the page, card, tabs, and preview all render correctly in both.
  - **Nav:** the "QR" header link navigates to `/qr` on desktop and mobile menus.

- [ ] **Step 4: Final commit (if any manual-fix tweaks were needed)**

```bash
git add -A
git commit -m "chore: finalize QR generator page after verification"
```
(If no changes were needed, skip this commit.)

---

## Notes for the implementer

- **Do not** re-introduce a CDN `<script>` for QR generation — the `qrcode` npm package is bundled at build time on purpose (supply-chain safety).
- **Do not** use `dangerouslySetInnerHTML` / `innerHTML` to inject QR SVG — the preview renders to `<canvas>`; SVG is only produced on download via `QRCode.toString`.
- All logic modules under `src/lib/qr/` are pure and browser-agnostic except `download.ts` (uses `document`/`URL`) and are imported only by client components.
- The EPC069-12 and `WIFI:` formats are fixed wire protocols and are never translated — only UI copy is.
