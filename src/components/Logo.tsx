/**
 * Brand mark: a simple lotus inside a ring, paired with the wordmark.
 * Placeholder for the official logo (785836.jpg) — swap in the real asset later.
 * Colors follow `currentColor` so it adapts to light/dark automatically.
 */
export function LotusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="24" cy="24" r="21" opacity="0.6" />
      {/* center petal */}
      <path d="M24 12c2.6 3 4 6.4 4 9.8 0 3-1.4 5.6-4 7.4-2.6-1.8-4-4.4-4-7.4 0-3.4 1.4-6.8 4-9.8Z" />
      {/* side petals */}
      <path d="M24 30c-3 2.4-6.6 3.4-10 3 .6-3.4 2.6-6.4 5.6-8" />
      <path d="M24 30c3 2.4 6.6 3.4 10 3-.6-3.4-2.6-6.4-5.6-8" />
      <path d="M16 20.5c-2.4 1-4.2 2.8-5.2 5.2 2.6.4 5-.2 7-1.7" />
      <path d="M32 20.5c2.4 1 4.2 2.8 5.2 5.2-2.6.4-5-.2-7-1.7" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LotusMark className="h-9 w-9 shrink-0 text-accent" />
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-[0.18em] text-foreground">
          BLUE LOTUS
        </span>
        <span className="mt-1 text-[10px] font-medium tracking-[0.22em] text-muted">
          THAI THERAPEUTIC MASSAGE
        </span>
      </span>
    </span>
  );
}
