/**
 * Route-level skeleton for the Services page (shown during client navigation
 * while the route's payload loads). Dimensions mirror the real layout to avoid
 * layout shift. Uses Tailwind's `animate-pulse` per AGENTS.md.
 */
export default function ServicesLoading() {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>

      {/* Header skeleton */}
      <div className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="mx-auto h-9 w-2/3 animate-pulse rounded bg-border" />
          <div className="mx-auto mt-4 h-4 w-5/6 animate-pulse rounded bg-border" />
          <div className="mx-auto mt-2 h-4 w-1/2 animate-pulse rounded bg-border" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Table skeleton (desktop) */}
        <div className="hidden overflow-hidden rounded-lg border border-border md:block">
          <div className="flex gap-4 bg-surface-muted px-5 py-4">
            <div className="h-4 flex-1 animate-pulse rounded bg-border" />
            <div className="h-4 w-16 animate-pulse rounded bg-border" />
            <div className="h-4 w-16 animate-pulse rounded bg-border" />
            <div className="h-4 w-16 animate-pulse rounded bg-border" />
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 border-t border-border px-5 py-4"
            >
              <div className="h-4 flex-1 animate-pulse rounded bg-border" />
              <div className="h-4 w-16 animate-pulse rounded bg-border" />
              <div className="h-4 w-16 animate-pulse rounded bg-border" />
              <div className="h-4 w-16 animate-pulse rounded bg-border" />
            </div>
          ))}
        </div>

        {/* Cards skeleton (mobile) */}
        <ul className="space-y-4 md:hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <div className="h-5 w-2/3 animate-pulse rounded bg-border" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((__, j) => (
                  <div
                    key={j}
                    className="h-14 animate-pulse rounded-md bg-surface-muted"
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
