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
