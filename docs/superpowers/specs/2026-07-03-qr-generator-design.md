# QR Generator Page (`/qr`) — Design

**Date:** 2026-07-03
**Status:** Approved for planning

## Summary

Add a `/qr` page to jorciney.dev: a client-side QR code generator with three
content modes — plain **Text/URL**, **WiFi** network, and **SEPA payment**
(EPC069-12) — a **language selector** (English, Dutch, Portuguese, French), and
PNG/SVG download. It is a rebuilt, safer version of the standalone reference
file at `~/Downloads/qr-generator.html`, integrated into the site's Next.js /
Tailwind / dark-light design system.

Everything runs in the browser. No input is ever sent to a server, logged, or
persisted (except the chosen UI language in `localStorage`).

## Goals

- General-purpose QR generation with three modes, SEPA being the most involved.
- Consistent with the rest of the site (Header/Footer, Tailwind tokens, theme).
- Multi-language UI (en/nl/pt/fr) via a lightweight, feature-local dictionary.
- Higher code quality and safety than the reference file (see below).

## Non-goals

- Site-wide i18n framework — translation is scoped to this feature only.
- Translating the EPC069-12 / WiFi wire formats (fixed protocols).
- QR styling options (logos, colors, error-correction picker) — YAGNI for v1.
- Server-side anything.

## Safety & quality improvements over the reference file

1. **No runtime CDN script.** Reference loads `qrcode-generator` from cdnjs at
   runtime (supply-chain / MITM exposure). We add the `qrcode` npm package as a
   build-time dependency, bundled by Next.js.
2. **No `dangerouslySetInnerHTML` / `innerHTML`.** Reference injects an SVG
   string into the DOM. We render to a `<canvas>` via the library's async
   `toCanvas` API for the on-screen preview, and only serialize a string when
   the user clicks "Download SVG".
3. **Proper WiFi payload escaping** for `\ ; , : "` in SSID/password (the
   `WIFI:` URI scheme). Not present in the reference (it has no WiFi mode).
4. **Typed, isolated modules** with single responsibilities and no cross-import
   of DOM globals into logic — validation/payload code is pure and unit-testable.

## Architecture

### Route & page
- `src/app/qr/page.tsx` — server component. Exports `Metadata`
  (title/description/keywords), renders `<QrGeneratorSection />` inside a
  `<div className="pt-16">` wrapper (matches `bookmarks/page.tsx` convention).

### Components (`src/components/`)
- `sections/QrGeneratorSection.tsx` (**client**, `'use client'`) — orchestrator.
  Owns state: `mode` (`'text' | 'wifi' | 'sepa'`), `language`, and the current
  payload string. Wires forms → payload → preview. Follows existing
  `*Section.tsx` naming.
- `qr/ModeTabs.tsx` — three tab buttons; controlled by parent.
- `qr/LanguageSelector.tsx` — dropdown (en/nl/pt/fr); persists to `localStorage`
  key `qr-lang`, defaults to `en`.
- `qr/TextUrlForm.tsx` — single `Textarea`; emits payload = raw text.
- `qr/WifiForm.tsx` — SSID, password (masked, show/hide toggle), encryption
  select (`WPA` | `WEP` | `nopass`), "hidden network" checkbox; emits WiFi URI.
- `qr/SepaForm.tsx` — name, IBAN (live 4-group formatting + mod-97 validation),
  amount (comma/dot accepted), reference; emits EPC069-12 payload + a summary.
- `qr/QrPreview.tsx` — renders payload to `<canvas>`; shows placeholder when no
  valid payload; hosts PNG + SVG download buttons (disabled until valid).

Each form receives `t` (the active translation object) and an
`onPayloadChange(payload: string | null)` callback. `null` = invalid/empty,
which disables the preview and downloads.

### Lib (`src/lib/qr/`)
- `iban.ts` — `cleanIban`, `formatIban`, `isValidIban` (mod-97 in 7-char chunks,
  ported verbatim from the reference; already correct).
- `payloads.ts` —
  - `buildEpcPayload({ name, iban, amount, reference }): string` (EPC069-12,
    BCD/002/1/SCT, EUR + `amount.toFixed(2)`).
  - `buildWifiPayload({ ssid, password, encryption, hidden }): string` with
    escaping of `\ ; , : "`.
  - Text mode needs no builder (identity).
- `amount.ts` — `parseAmount` (strip non-numeric, comma→dot), `formatAmount`
  (`toFixed(2)`, dot→comma), range check `0 < n <= 999999999.99`.
- `download.ts` — `downloadCanvasPng(canvas, filename)`,
  `downloadSvg(payload, filename)` (build standalone SVG string with white bg
  via the `qrcode` API), `makeFilename(mode, data, ext)`, `triggerDownload`.
- `translations.ts` — `type Language = 'en' | 'nl' | 'pt' | 'fr'`; a typed
  `Translations` interface; `const translations: Record<Language, Translations>`.
  Covers all UI labels, hints, placeholders, help text, validation messages, and
  mode/encryption labels.

### Navigation
- Add `{ href: 'qr', label: 'QR' }` to `navLinks` in
  `src/components/layout/Header.tsx` (routes via existing `window.location.href`
  logic for non-`#` links).

### Dependency
- `npm install qrcode` + `npm install -D @types/qrcode`.

## Data flow

```
ModeTabs ──selects──▶ mode state
   │
   ▼
active form (Text|Wifi|Sepa) ──validates──▶ onPayloadChange(payload | null)
   │                                              │
   └── shows inline validation via `t` msgs       ▼
                                        QrPreview: qrcode.toCanvas(canvas, payload)
                                              │
                                        enables PNG / SVG download
LanguageSelector ──sets──▶ language state ──re-renders all labels via `t`
```

## Error handling & validation

- **Text/URL:** non-empty after trim → valid. (No URL-format enforcement; QR of
  arbitrary text is legitimate.) Enforce a sane max length (e.g. 1000 chars) to
  avoid unscannable dense codes; show a message past the limit.
- **WiFi:** SSID required; password required unless encryption is `nopass`.
- **SEPA:** name ≥ 2 chars; IBAN passes mod-97 and length 15–34; amount is a
  number in range. Inline per-field messages, all pulled from `t`.
- **Rendering:** `qrcode.toCanvas` is async; on error (payload too long for QR
  capacity) show a translated "content too long for a QR code" message instead
  of throwing. PNG generation reads from the already-rendered canvas.

## Testing

No test runner is currently configured in the repo. The pure lib modules
(`iban`, `payloads`, `amount`) are written to be trivially unit-testable if a
runner is added later. For v1, verification is:

- `npm run build` succeeds (static export).
- `npm run lint` passes with no new violations.
- Manual verification via the dev server: each mode produces a scannable QR,
  language switch updates all copy, IBAN validation matches known-good/bad
  IBANs, PNG and SVG downloads open correctly, dark/light theme both render.

## File manifest

```
src/app/qr/page.tsx                         (new)
src/components/sections/QrGeneratorSection.tsx (new)
src/components/qr/ModeTabs.tsx              (new)
src/components/qr/LanguageSelector.tsx      (new)
src/components/qr/TextUrlForm.tsx           (new)
src/components/qr/WifiForm.tsx              (new)
src/components/qr/SepaForm.tsx              (new)
src/components/qr/QrPreview.tsx             (new)
src/lib/qr/iban.ts                          (new)
src/lib/qr/payloads.ts                      (new)
src/lib/qr/amount.ts                        (new)
src/lib/qr/download.ts                      (new)
src/lib/qr/translations.ts                  (new)
src/components/layout/Header.tsx            (edit: add nav link)
package.json / package-lock.json            (edit: add qrcode dep)
```
