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
