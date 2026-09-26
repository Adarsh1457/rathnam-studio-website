'use client'

import { useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Loader2 } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

type Status = 'idle' | 'loading' | 'success' | 'error'

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+\d][\d\s-]{6,16}$/

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  function validate(data: FormData): Errors {
    const next: Errors = {}
    const name = String(data.get('from_name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const email = String(data.get('from_email') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name) next.name = 'Please enter your name.'
    if (!phone) next.phone = 'Please enter your phone number.'
    else if (!phonePattern.test(phone)) next.phone = 'Please enter a valid phone number.'
    if (!email) next.email = 'Please enter your email.'
    else if (!emailPattern.test(email)) next.email = 'Please enter a valid email address.'
    if (!message) next.message = 'Please tell us a little about your idea.'

    return next
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    const form = e.currentTarget
    const data = new FormData(form)
    const nextErrors = validate(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    try {
      if (siteConfig.emailjs.publicKey.startsWith('YOUR_')) {
        throw new Error('EmailJS public key not configured')
      }
      await emailjs.sendForm(
        siteConfig.emailjs.serviceId,
        siteConfig.emailjs.templateId,
        form,
        siteConfig.emailjs.publicKey
      )
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label htmlFor="from_name" className="micro-label mb-2 block text-bone/70">
          Name
        </label>
        <input
          id="from_name"
          name="from_name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'from_name-error' : undefined}
          className="w-full border-b border-bone/25 bg-transparent py-3 text-bone outline-none transition-colors focus:border-gold"
        />
        {errors.name && (
          <p id="from_name-error" className="mt-1 text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="micro-label mb-2 block text-bone/70">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          className="w-full border-b border-bone/25 bg-transparent py-3 text-bone outline-none transition-colors focus:border-gold"
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-destructive">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="from_email" className="micro-label mb-2 block text-bone/70">
          Email
        </label>
        <input
          id="from_email"
          name="from_email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'from_email-error' : undefined}
          className="w-full border-b border-bone/25 bg-transparent py-3 text-bone outline-none transition-colors focus:border-gold"
        />
        {errors.email && (
          <p id="from_email-error" className="mt-1 text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="micro-label mb-2 block text-bone/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full resize-none border-b border-bone/25 bg-transparent py-3 text-bone outline-none transition-colors focus:border-gold"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        data-cursor="interactive"
        className="micro-label mt-2 flex items-center justify-center gap-2 rounded-full border border-gold bg-gold px-8 py-4 text-[#0a0a0a] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
        SEND ENQUIRY
      </button>

      <div role="status" aria-live="polite">
        {status === 'success' && (
          <p className="text-sm text-gold">
            Thank you! Your enquiry has been sent successfully. We&apos;ll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-destructive">
            Something went wrong while sending your enquiry. Please try again or contact us on WhatsApp.
          </p>
        )}
      </div>
    </form>
  )
}
