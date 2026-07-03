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
