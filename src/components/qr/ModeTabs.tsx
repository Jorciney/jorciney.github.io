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
