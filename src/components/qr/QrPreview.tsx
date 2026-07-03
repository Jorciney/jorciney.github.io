// src/components/qr/QrPreview.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { downloadCanvasPng, downloadSvg, makeFilename } from '@/lib/qr/download'
import type { QrMode, Translations } from '@/lib/qr/translations'

interface QrPreviewProps {
  payload: string | null
  mode: QrMode
  t: Translations
}

export default function QrPreview({ payload, mode, t }: QrPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState(false)
  const [rendered, setRendered] = useState(false)
  // Only "ready" once the async render for the current payload has actually completed,
  // so the download buttons never act on a stale or not-yet-drawn canvas.
  const ready = rendered && !error
  // Payment QRs are scanned specifically by a bank app, not a generic scanner.
  const scanLabel = mode === 'sepa' ? t.sepaPreviewLabel : t.previewLabel

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !payload) {
      setError(false)
      setRendered(false)
      return
    }
    // Guard against out-of-order resolution when payload changes rapidly (per keystroke).
    let cancelled = false
    setRendered(false)
    QRCode.toCanvas(canvas, payload, {
      width: 240,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    })
      .then(() => {
        if (cancelled) return
        setError(false)
        setRendered(true)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setRendered(false)
      })
    return () => {
      cancelled = true
    }
  }, [payload])

  return (
    <Card className="p-8 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{scanLabel}</p>

      <div className="inline-flex items-center justify-center rounded-lg bg-white p-4 min-w-[272px] min-h-[272px]">
        {/* Canvas is always mounted so the ref is stable; hidden until valid */}
        <canvas ref={canvasRef} role="img" aria-label={scanLabel} className={ready ? 'block' : 'hidden'} />
        {!ready && (
          <span className="max-w-[220px] text-sm text-gray-400 italic">
            {error ? t.contentTooLong : t.previewPlaceholder}
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="default"
          disabled={!ready}
          onClick={() => canvasRef.current && downloadCanvasPng(canvasRef.current, makeFilename(mode, 'png'))}
        >
          <Download className="w-4 h-4" />
          {t.downloadPng}
        </Button>
        <Button
          variant="outline"
          disabled={!ready}
          onClick={() => payload && downloadSvg(payload, makeFilename(mode, 'svg'))}
        >
          <Download className="w-4 h-4" />
          {t.downloadSvg}
        </Button>
      </div>
    </Card>
  )
}
