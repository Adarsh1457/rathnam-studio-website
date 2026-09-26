import type { Metadata } from 'next'
import { InkBackdrop } from '@/components/realm/ink-backdrop'
import { ServicesSections } from '@/components/services/services-sections'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld'
import { services, galleryImages, siteConfig } from '@/lib/site-config'

const description =
  'Permanent tattoo, piercing, scar cover-up and tattoo removal services at Rathnam Tattoos Studio in Vijayawada.'

export const metadata: Metadata = {
  title: 'Services',
  description,
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: `Services | ${siteConfig.name}`,
    description,
    url: '/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Services | ${siteConfig.name}`,
    description,
  },
}

const bandDurations = [72, 60, 80, 66]

export default function ServicesPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]} />
      <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-[#0a0a0a] pb-16 pt-32 md:min-h-[64vh]">
        <InkBackdrop mood="services" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <p className="micro-label mb-4 text-gold">101 / 104</p>
          <h1 className="font-display text-6xl leading-none tracking-tight text-bone md:text-8xl">
            SERVICES
          </h1>
        </div>
      </section>

      <div className="relative bg-[#0a0a0a]">
        <ServicesSections
          sections={services.map((service, i) => {
            const customGallery = "gallery" in service ? service.gallery : undefined
            const band = customGallery
              ? Array.from({ length: 8 }, (_, j) => ({
                  src: customGallery[j % customGallery.length],
                  alt: `${service.title} example ${j + 1}`,
                }))
              : Array.from({ length: 8 }, (_, j) => {
                  const start = i * 4
                  return galleryImages[(start + j) % galleryImages.length]
                })
            return { service, bandImages: band, bandDuration: bandDurations[i] }
          })}
        />
      </div>
    </main>
  )
}
