import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'Jorciney Dias Chaveiro - Technology Lead & Full Stack Developer',
  description: 'Technology Lead specializing in Angular, Micro-Frontends, and AWS with 9+ years of experience.',
  keywords: 'Technology Lead, Angular, React, AWS, Micro-Frontends, Full Stack Developer',
  authors: [{ name: 'Jorciney Dias Chaveiro' }],
  creator: 'Jorciney Dias Chaveiro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jorciney.dev',
    title: 'Jorciney Dias Chaveiro - Technology Lead',
    description: 'Technology Lead specializing in Angular, Micro-Frontends, and AWS',
    siteName: 'Jorciney Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jorciney Dias Chaveiro - Technology Lead',
    description: 'Technology Lead specializing in Angular, Micro-Frontends, and AWS',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}