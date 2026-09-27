// Central configuration for the studio. Keep every business detail,
// contact channel and third-party ID here — never hardcode these values
// inside individual components.

export const siteConfig = {
  name: "RATHNAM TATTOOS STUDIO",
  shortName: "RATHNAM",
  tagline: "INK YOUR STORY",
  description:
    "Custom tattoos, piercing, scar cover-up and tattoo removal in Vijayawada, Andhra Pradesh.",
  url: "https://rathnamstudio-iota.vercel.app",

  phone: "+91 97004 77001",
  phoneHref: "tel:+919700477001",
  phone2: "+91 99124 38123",
  phoneHref2: "tel:+919912438123",
  whatsappNumber: "919700477001",
  whatsappMessage:
    "Hi, I'm interested in getting a tattoo. I'd like to discuss a design and booking.",
  instagramHandle: "@rathnamtattoos",
  instagramUrl: "https://instagram.com/rathnamtattoos",

  address: {
    line1: "Crem Stone, beside Partha Dental",
    line2: "Teacher's Colony, Guru Nanak Colony",
    line3: "Vijayawada, Andhra Pradesh 520008",
    line4: "India",
    full: "Crem Stone, beside Partha Dental, Teacher's Colony, Guru Nanak Colony, Vijayawada, Andhra Pradesh 520008, India",
  },
  city: "Vijayawada",
  state: "Andhra Pradesh",
  pinCode: "520008",

  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Rathnam%20Tattoos%20Studio%20Crem%20Stone%20beside%20Partha%20Dental%20Teacher%27s%20Colony%20Guru%20Nanak%20Colony%20Vijayawada%20Andhra%20Pradesh%20520008&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Rathnam+Tattoos+Studio+Crem+Stone+beside+Partha+Dental+Teacher%27s+Colony+Guru+Nanak+Colony+Vijayawada+Andhra+Pradesh+520008",

  locations: [
    {
      label: "STUDIO 1",
      line1: "Crem Stone, beside Partha Dental",
      line2: "Teacher's Colony, Guru Nanak Colony",
      line3: "Vijayawada, Andhra Pradesh 520008",
      line4: "India",
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=Rathnam%20Tattoos%20Studio%20Crem%20Stone%20beside%20Partha%20Dental%20Teacher%27s%20Colony%20Guru%20Nanak%20Colony%20Vijayawada%20Andhra%20Pradesh%20520008&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapsDirectionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Rathnam+Tattoos+Studio+Crem+Stone+beside+Partha+Dental+Teacher%27s+Colony+Guru+Nanak+Colony+Vijayawada+Andhra+Pradesh+520008",
    },
    {
      label: "STUDIO 2",
      line1: "PNB, Bus Stand, opposite E3 Food Court",
      line2: "Opp. APSRTC Bus Stand, Krishnalanka",
      line3: "Vijayawada, Andhra Pradesh 520013",
      line4: "India",
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=PNB%20Bus%20Stand%20opposite%20E3%20Food%20Court%20Opp%20APSRTC%20Bus%20Stand%20Krishnalanka%20Vijayawada%20Andhra%20Pradesh%20520013&t=&z=15&ie=UTF8&iwloc=&output=embed",
      mapsDirectionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=PNB+Bus+Stand+opposite+E3+Food+Court+Opp+APSRTC+Bus+Stand+Krishnalanka+Vijayawada+Andhra+Pradesh+520013",
    },
  ],

  emailjs: {
    serviceId: "service_ooj39wj",
    templateId: "template_p02awel",
    publicKey: "7qC3ByXVcUzh-Edwy",
  },

  nav: [
    { label: "HOME", href: "/", number: "100" },
    { label: "SERVICES", href: "/services", number: "101" },
    { label: "GALLERY", href: "/gallery", number: "102" },
    { label: "ABOUT US", href: "/about-us", number: "103" },
    { label: "CONTACT", href: "/contact", number: "104" },
  ],
} as const

export const whatsappHref = () =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`

export const services = [
  {
    number: "01",
    slug: "permanent-tattoo",
    title: "PERMANENT TATTOO",
    description:
      "Custom tattoo designs created around your idea, preferred style and placement.",
    extra: null,
    image: "/images/services/permanent-tattoo/permanent-tattoo-1.webp",
    gallery: [
      "/images/services/permanent-tattoo/permanent-tattoo-1.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-2.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-3.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-4.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-5.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-6.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-7.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-8.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-9.webp",
      "/images/services/permanent-tattoo/permanent-tattoo-10.webp",
    ],
  },
  {
    number: "02",
    slug: "piercing",
    title: "PIERCING",
    description:
      "Professional piercing services with attention to precision, hygiene and aftercare.",
    extra: null,
    image: "/images/services/piercing/piercing-1.webp",
    gallery: [
      "/images/services/piercing/piercing-1.webp",
      "/images/services/piercing/piercing-2.webp",
      "/images/services/piercing/piercing-3.webp",
      "/images/services/piercing/piercing-4.webp",
      "/images/services/piercing/piercing-5.webp",
      "/images/services/piercing/piercing-6.webp",
      "/images/services/piercing/piercing-7.webp",
      "/images/services/piercing/piercing-8.webp",
      "/images/services/piercing/piercing-9.webp",
    ],
  },
  {
    number: "03",
    slug: "scar-coverup",
    title: "SCAR COVER-UP",
    description:
      "Thoughtfully designed tattoo work that incorporates existing scars into a new visual composition.",
    extra: "Every scar is different. Cover-up possibilities are discussed individually during consultation.",
    image: "/images/services/scar-coverup/scar-coverup-1.webp",
    gallery: [
      "/images/services/scar-coverup/scar-coverup-1.webp",
      "/images/services/scar-coverup/scar-coverup-2.webp",
      "/images/services/scar-coverup/scar-coverup-3.webp",
      "/images/services/scar-coverup/scar-coverup-4.webp",
      "/images/services/scar-coverup/scar-coverup-5.webp",
      "/images/services/scar-coverup/scar-coverup-6.webp",
    ],
  },
  {
    number: "04",
    slug: "tattoo-removal",
    title: "TATTOO REMOVAL",
    description:
      "Removal requirements vary depending on the tattoo and individual circumstances. Contact the studio to discuss available options.",
    extra: null,
    image: "/images/services/tattoo-removal/tattoo-removal-1.webp",
    gallery: [
      "/images/services/tattoo-removal/tattoo-removal-1.webp",
      "/images/services/tattoo-removal/tattoo-removal-2.webp",
      "/images/services/tattoo-removal/tattoo-removal-3.webp",
      "/images/services/tattoo-removal/tattoo-removal-4.webp",
      "/images/services/tattoo-removal/tattoo-removal-5.webp",
      "/images/services/tattoo-removal/tattoo-removal-6.webp",
      "/images/services/tattoo-removal/tattoo-removal-7.webp",
    ],
  },
] as const

const gallerySources = [
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2%20%281%29-mL83snsco7yvlZ2cFWcuuQP4IfKB1N.webp',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1%20%281%29-JHPUToUYBNjQCSULJtRWWK6R5KbaRr.webp',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-ULWGFfYcTIOF8bpgo5DLq2rwwT1PAM.webp',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-ZNBbTg99xqRczWHyBVL5JpUwgxQn5g.webp',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/101-GUj4grMppuiY8HTWDN8jxddXqVZNIm.webp',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-jsxqbGeO43RbETjwvDPg5ksu5ulr5Z.webp',
  ...Array.from({ length: 39 }, (_, i) => `/images/gallery/img${i + 7}.webp`),
]

export const galleryImages = gallerySources.map((src, index) => ({
  id: index + 1,
  src,
  alt: `Custom tattoo work, portfolio piece ${index + 1} — Rathnam Tattoos Studio, Vijayawada`,
}))

export const about = {
  name: "RAJA",
  role: "FOUNDER & LEAD ARTIST",
  mainImage: "/images/about/owner-1.webp",
  secondaryImage: "/images/about/owner-2.webp",
  statement:
    "Every piece that leaves this studio carries intention, precision and a story worth keeping forever.",
  stats: [
    { value: "5+", label: "YEARS EXPERIENCE" },
    { value: "500+", label: "PROJECTS DONE" },
  ],
} as const

const reviewFiles = Array.from({ length: 9 }, (_, i) => `rev${i + 1}.webp`)

export const reviewImages = reviewFiles.map((file, index) => ({
  id: index + 1,
  src: `/images/reviews/${file}`,
  alt: `Client testimonial screenshot ${index + 1} for Rathnam Tattoos Studio, Vijayawada`,
}))
