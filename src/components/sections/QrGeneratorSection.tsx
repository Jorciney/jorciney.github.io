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
