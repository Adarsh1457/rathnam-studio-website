import type { Metadata } from 'next'
import { InkBackdrop } from '@/components/realm/ink-backdrop'
import { GalleryView } from '@/components/gallery/gallery-view'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld'
import { JsonLd } from '@/components/seo/json-ld'
import { galleryImages, siteConfig } from '@/lib/site-config'

const description =
  'Real tattoo work from Rathnam Tattoos Studio in Vijayawada — every line, shadow and detail tells a story.'

export const metadata: Metadata = {
  title: 'Gallery',
  description,
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: `Gallery | ${siteConfig.name}`,
    description,
    url: '/gallery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Gallery | ${siteConfig.name}`,
    description,
  },
}

const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: `${siteConfig.name} — Gallery`,
  url: `${siteConfig.url}/gallery`,
  image: galleryImages.map((img) => ({
    '@type': 'ImageObject',
    contentUrl: `${siteConfig.url}${img.src}`,
    name: img.alt,
  })),
}

export default function GalleryPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }]} />
      <JsonLd data={gallerySchema} />
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-[#0a0a0a] pb-14 pt-32 md:min-h-[58vh]">
        <InkBackdrop mood="gallery" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <p className="micro-label mb-4 text-gold">102 / 104</p>
          <h1 className="font-display text-6xl leading-none tracking-tight text-bone md:text-8xl">
            OUR WORK
          </h1>
          <p className="mt-5 max-w-md text-base text-bone/70 md:text-lg">
            Every line, shadow and detail is part of the story.
          </p>
        </div>
      </section>

      <div className="bg-[#0a0a0a] py-16 md:py-24">
        <GalleryView />
      </div>
    </main>
  )
}
