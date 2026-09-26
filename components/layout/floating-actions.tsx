'use client'

import { Phone } from 'lucide-react'
import { siteConfig, whatsappHref } from '@/lib/site-config'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.85.5 3.58 1.37 5.07L2 22l5.11-1.34a9.94 9.94 0 0 0 4.93 1.3h.01c5.52 0 10-4.48 10-10s-4.49-9.96-10.01-9.96Zm0 18.05h-.01a8.3 8.3 0 0 1-4.24-1.16l-.3-.18-3.03.8.81-2.95-.2-.31a8.27 8.27 0 0 1-1.27-4.4c0-4.58 3.73-8.31 8.31-8.31 2.22 0 4.3.87 5.87 2.44a8.24 8.24 0 0 1 2.43 5.87c-.01 4.58-3.74 8.2-8.37 8.2Zm4.55-6.2c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.12-.12.27-.31.4-.47.14-.16.18-.27.28-.45.09-.18.05-.34-.02-.47-.08-.13-.6-1.45-.83-1.98-.22-.51-.44-.44-.6-.45-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.96.94-.96 2.28 0 1.35.98 2.65 1.12 2.83.14.18 1.9 2.9 4.63 3.96 2.28.88 2.28.59 2.69.55.41-.04 1.34-.55 1.53-1.08.19-.53.19-.98.13-1.08-.05-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <a
        href={siteConfig.phoneHref}
        aria-label={`Call ${siteConfig.name}`}
        data-cursor="interactive"
        className="group flex h-13 w-13 items-center justify-center rounded-full border border-gold/40 bg-[#111111]/90 text-gold shadow-lg backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ height: 52, width: 52 }}
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        data-cursor="interactive"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
