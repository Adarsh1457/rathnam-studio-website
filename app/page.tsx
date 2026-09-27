import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Hero } from '@/components/home/hero'
import { JsonLd } from '@/components/seo/json-ld'

const WhatWeDo = dynamic(() => import('@/components/home/what-we-do').then((mod) => mod.WhatWeDo))
const FeaturedGallery = dynamic(() =>
  import('@/components/home/featured-gallery').then((mod) => mod.FeaturedGallery)
)
const StudioStatement = dynamic(() =>
  import('@/components/home/studio-statement').then((mod) => mod.StudioStatement)
)
const FinalCta = dynamic(() => import('@/components/home/final-cta').then((mod) => mod.FinalCta))
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const tattooParlorSchema = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  name: siteConfig.name,
  alternateName: 'Rathnam Studio',
  description: siteConfig.description,
  image: `${siteConfig.url}/images/services/permanent-tattoo.jpg`,
  logo: `/images/logo.jpeg`,
  telephone: siteConfig.phone,
  url: siteConfig.url,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.state,
    postalCode: siteConfig.pinCode,
    addressCountry: 'IN',
  },
  sameAs: [siteConfig.instagramUrl],
}

export default function HomePage() {
  return (
    <main>
      <JsonLd data={tattooParlorSchema} />
      <Hero />
      <WhatWeDo />
      <FeaturedGallery />
      <StudioStatement />
      <FinalCta />
    </main>
  )
}
