import type { Metadata } from 'next'
import Image from 'next/image'
import { InkBackdrop } from '@/components/realm/ink-backdrop'
import { ContactForm } from '@/components/contact/contact-form'
import { MapSection } from '@/components/contact/map-section'
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld'
import { siteConfig } from '@/lib/site-config'

const description = `Book a tattoo, ask a question, or plan a visit to ${siteConfig.name} in ${siteConfig.city}.`

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description,
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact | ${siteConfig.name}`,
    description,
  },
}

export default function ContactPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
      <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-[#0a0a0a] pb-14 pt-32">
        <InkBackdrop mood="contact" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10">
          <p className="micro-label mb-4 text-gold">104 / 104</p>
          <h1 className="font-display max-w-3xl text-4xl leading-[1.05] tracking-tight text-bone md:text-6xl">
            LET&apos;S TALK ABOUT YOUR TATTOO.
          </h1>
          <p className="mt-5 max-w-md text-base text-bone/70 md:text-lg">
            Have an idea, reference or simply a concept in mind? Tell us about it and we&apos;ll help
            you take the next step.
          </p>
        </div>
      </section>

      <section className="cv-auto relative overflow-hidden bg-[#0a0a0a] py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vv9k5t5o3FSPL9wAOt8aCOSX9ne8O9.webp"
            alt=""
            fill
            className="object-cover opacity-[0.14] mix-blend-luminosity"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-5 md:grid-cols-2 md:gap-12 md:px-10">
          <div>
            <h2 className="font-display mb-8 text-2xl tracking-tight text-bone md:text-3xl">
              SEND AN ENQUIRY
            </h2>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-12">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-gold/50 shadow-[0_0_18px_rgba(201,162,75,0.25)]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vv9k5t5o3FSPL9wAOt8aCOSX9ne8O9.webp"
                    alt={`${siteConfig.name} logo`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </span>
                <h2 className="font-display text-2xl tracking-tight text-bone md:text-3xl">
                  STUDIO DETAILS
                </h2>
              </div>
              <dl className="flex flex-col gap-6 text-bone/80">
                <div>
                  <dt className="micro-label mb-1 text-bone/50">Phone</dt>
                  <dd className="flex flex-col gap-1">
                    <a
                      href={siteConfig.phoneHref}
                      data-cursor="interactive"
                      className="text-lg transition-colors hover:text-gold"
                    >
                      {siteConfig.phone}
                    </a>
                    <a
                      href={siteConfig.phoneHref2}
                      data-cursor="interactive"
                      className="text-lg transition-colors hover:text-gold"
                    >
                      {siteConfig.phone2}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="micro-label mb-1 text-bone/50">Instagram</dt>
                  <dd>
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="interactive"
                      className="text-lg transition-colors hover:text-gold"
                    >
                      {siteConfig.instagramHandle}
                    </a>
                  </dd>
                </div>
                {siteConfig.locations.map((location) => (
                  <div key={location.label}>
                    <dt className="micro-label mb-1 text-bone/50">{location.label}</dt>
                    <dd className="max-w-xs text-lg leading-relaxed">
                      {location.line1}
                      <br />
                      {location.line2}
                      <br />
                      {location.line3}
                      <br />
                      {location.line4}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-10">
              {siteConfig.locations.map((location) => (
                <MapSection key={location.label} location={location} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
