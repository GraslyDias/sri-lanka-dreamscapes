export function FloatingConcierge() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/94000000000"
        className="size-12 rounded-full bg-jungle text-paper grid place-items-center shadow-lift hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
          <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.5 0 .2 5.3.2 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.36-1.67a11.83 11.83 0 0 0 5.7 1.45h.01c6.56 0 11.87-5.3 11.87-11.86 0-3.17-1.23-6.15-3.42-8.44Zm-8.46 18.24h-.01a9.87 9.87 0 0 1-5.02-1.38l-.36-.21-3.77.99 1.01-3.67-.24-.38a9.85 9.85 0 0 1-1.51-5.21c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.98 2.9a9.79 9.79 0 0 1 2.89 6.98c0 5.45-4.43 9.86-9.86 9.86Zm5.42-7.4c-.3-.14-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07-.3-.14-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.45.13-.6.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.24 5.15 4.55 1.86.8 2.59.87 3.52.73.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </a>
      <a
        href="tel:+94112345678"
        className="size-12 rounded-full bg-ocean text-paper grid place-items-center shadow-lift hover:scale-105 transition-transform"
        aria-label="Call concierge"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </div>
  );
}
