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
