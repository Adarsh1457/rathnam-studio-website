import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'
import { siteConfig } from '@/lib/site-config'
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider'
import { Navbar } from '@/components/layout/navbar'
import { FloatingActions } from '@/components/layout/floating-actions'
import { RouteTransition } from '@/components/layout/route-transition'
import { RoutePreloader } from '@/components/layout/route-preloader'

// Purely decorative and desktop-only; split out of the initial bundle so it
// never delays first paint or the main thread on first load.
const CustomCursor = dynamic(() =>
  import('@/components/layout/custom-cursor').then((mod) => mod.CustomCursor)
)

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Vijayawada`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  generator: 'v0.app',
  keywords: [
    'tattoo studio Vijayawada',
    'custom tattoo Andhra Pradesh',
    'piercing Vijayawada',
    'scar cover-up tattoo',
    'tattoo removal Vijayawada',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} — Ink Your Story`,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/images/services/permanent-tattoo.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — custom tattoo work`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Ink Your Story`,
    description: siteConfig.description,
    images: ['/images/services/permanent-tattoo.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ backgroundColor: '#0a0a0a' }}>
      <head>
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
      </head>
      <body
        className={`${anton.variable} ${inter.variable} antialiased bg-background text-foreground`}
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <RoutePreloader />
          <RouteTransition>{children}</RouteTransition>
          <FloatingActions />
          <div className="film-grain" aria-hidden="true" />
        </SmoothScrollProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
