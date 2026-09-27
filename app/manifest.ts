export const dynamic = "force-static";
import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vv9k5t5o3FSPL9wAOt8aCOSX9ne8O9.webp',
        sizes: '192x192',
        type: 'image/jpeg',
      },
    ],
  }
}
