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
