// src/lib/qr/download.ts
// Browser-only helpers for turning a payload into downloadable PNG/SVG files.
import QRCode from 'qrcode'
import type { QrMode } from './translations'

export function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadCanvasPng(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (blob) triggerDownload(blob, filename)
  }, 'image/png')
}

export async function downloadSvg(payload: string, filename: string): Promise<void> {
  const svgString = await QRCode.toString(payload, {
    type: 'svg',
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
    errorCorrectionLevel: 'M',
  })
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  triggerDownload(blob, filename)
}

export function makeFilename(mode: QrMode, ext: 'png' | 'svg'): string {
  const base = mode === 'sepa' ? 'payment-qr' : mode === 'wifi' ? 'wifi-qr' : 'qr-code'
  return `${base}.${ext}`
}
