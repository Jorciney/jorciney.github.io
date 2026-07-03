// src/app/qr/page.tsx
import type { Metadata } from 'next'
import QrGeneratorSection from '@/components/sections/QrGeneratorSection'

export const metadata: Metadata = {
  title: 'QR Code Generator - Jorciney Dias Chaveiro',
  description: 'Free client-side QR code generator for links, WiFi networks, and SEPA payments (EPC069-12). Nothing is uploaded or stored.',
  keywords: 'QR code generator, WiFi QR, SEPA payment QR, EPC069-12, IBAN QR',
}

export default function QrPage() {
  return (
    <div className="pt-16">
      <QrGeneratorSection />
    </div>
  )
}
