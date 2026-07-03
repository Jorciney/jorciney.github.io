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
