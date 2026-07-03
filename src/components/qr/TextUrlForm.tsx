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
