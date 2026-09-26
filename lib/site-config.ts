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
    image: "/images/services/permanent-tattoo.jpg",
  },
  {
    number: "02",
    slug: "piercing",
    title: "PIERCING",
    description:
      "Professional piercing services with attention to precision, hygiene and aftercare.",
    extra: null,
    image: "/images/services/piercing/piercing-1.jpg",
    gallery: [
      "/images/services/piercing/piercing-1.jpg",
      "/images/services/piercing/piercing-2.jpg",
      "/images/services/piercing/piercing-3.jpg",
      "/images/services/piercing/piercing-4.jpg",
      "/images/services/piercing/piercing-5.jpg",
      "/images/services/piercing/piercing-6.jpg",
      "/images/services/piercing/piercing-7.jpg",
      "/images/services/piercing/piercing-8.jpg",
      "/images/services/piercing/piercing-9.jpg",
      "/images/services/piercing/piercing-10.jpeg",
    ],
  },
  {
    number: "03",
    slug: "scar-coverup",
    title: "SCAR COVER-UP",
    description:
      "Thoughtfully designed tattoo work that incorporates existing scars into a new visual composition.",
    extra: "Every scar is different. Cover-up possibilities are discussed individually during consultation.",
    image: "/images/services/scar-coverup/scar-coverup-1.jpg",
    gallery: [
      "/images/services/scar-coverup/scar-coverup-1.jpg",
      "/images/services/scar-coverup/scar-coverup-2.jpg",
      "/images/services/scar-coverup/scar-coverup-3.jpg",
      "/images/services/scar-coverup/scar-coverup-4.jpg",
      "/images/services/scar-coverup/scar-coverup-5.jpg",
      "/images/services/scar-coverup/scar-coverup-6.jpg",
    ],
  },
  {
    number: "04",
    slug: "tattoo-removal",
    title: "TATTOO REMOVAL",
    description:
      "Removal requirements vary depending on the tattoo and individual circumstances. Contact the studio to discuss available options.",
    extra: null,
    image: "/images/services/tattoo-removal/tattoo-removal-1.jpg",
    gallery: [
      "/images/services/tattoo-removal/tattoo-removal-1.jpg",
      "/images/services/tattoo-removal/tattoo-removal-2.jpg",
      "/images/services/tattoo-removal/tattoo-removal-3.jpg",
      "/images/services/tattoo-removal/tattoo-removal-4.jpg",
      "/images/services/tattoo-removal/tattoo-removal-5.jpg",
      "/images/services/tattoo-removal/tattoo-removal-6.jpg",
      "/images/services/tattoo-removal/tattoo-removal-7.jpg",
    ],
  },
] as const

const galleryFiles = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg",
  "img6.jpg",
  "img7.jpg",
  "img8.jpg",
  "img9.jpg",
  "img10.jpg",
  "img11.jpg",
  "img12.jpg",
  "img13.jpg",
  "img14.jpg",
  "img15.jpg",
  "img16.jpg",
  "img17.jpg",
  "img18.jpg",
  "img19.jpg",
  "img20.jpg",
  "img21.jpg",
  "img22.jpg",
  "img23.jpeg",
  "img24.jpeg",
  "img25.jpeg",
  "img27.jpg",
  "img28.jpg",
  "img29.jpg",
  "img39.jpg",
  "new1.jpeg",
  "new2.jpeg",
  "new3.jpeg",
  "new4.jpeg",
  "new5.jpeg",
  "new6.jpeg",
  "new7.jpeg",
  "new8.jpeg",
  "new9.jpeg",
  "new10.jpeg",
  "new11.jpeg",
  "new12.jpeg",
  "new13.jpeg",
  "new14.jpeg",
  "new15.jpeg",
  "new16.jpeg",
  "new17.jpeg",
]

export const galleryImages = galleryFiles.map((file, index) => ({
  id: index + 1,
  src: `/images/gallery/${file}`,
  alt: `Custom tattoo work, portfolio piece ${index + 1} — Rathnam Tattoos Studio, Vijayawada`,
}))

export const about = {
  name: "RAJA",
  role: "FOUNDER & LEAD ARTIST",
  mainImage: "/images/about/owner-1.jpeg",
  secondaryImage: "/images/about/owner-2.jpeg",
  statement:
    "Every piece that leaves this studio carries intention, precision and a story worth keeping forever.",
  stats: [
    { value: "5+", label: "YEARS EXPERIENCE" },
    { value: "500+", label: "PROJECTS DONE" },
  ],
} as const

const reviewFiles = [
  "rev1.png",
  "rev2.png",
  "rev3.png",
  "rev4.png",
  "rev5.png",
  "rev6.png",
  "rev7.png",
  "rev8.png",
  "rev9.png",
]

export const reviewImages = reviewFiles.map((file, index) => ({
  id: index + 1,
  src: `/images/reviews/${file}`,
  alt: `Client testimonial screenshot ${index + 1} for Rathnam Tattoos Studio, Vijayawada`,
}))
