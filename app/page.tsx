import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { WhatWeDo } from '@/components/home/what-we-do'
import { FeaturedGallery } from '@/components/home/featured-gallery'
import { StudioStatement } from '@/components/home/studio-statement'
import { FinalCta } from '@/components/home/final-cta'
import { JsonLd } from '@/components/seo/json-ld'
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
  logo: `${siteConfig.url}/images/logo.jpeg`,
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
