import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div aria-busy="true">
      {/* Hero skeleton */}
      <section className="relative min-h-[85svh] bg-surface-muted">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        <div className="relative z-10 mx-auto flex min-h-[85svh] max-w-6xl items-end px-6 pb-20 lg:items-center lg:pb-0">
          <div className="w-full max-w-lg space-y-5">
            <Skeleton className="h-4 w-28 bg-surface/60" />
            <Skeleton className="h-16 w-full bg-surface/60" />
            <Skeleton className="h-14 w-4/5 bg-surface/60" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-36 bg-surface/60" />
              <Skeleton className="h-12 w-40 bg-surface/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights strip skeleton */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-3 px-6 py-8">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full max-w-xs" />
            </div>
          ))}
        </div>
      </section>

      {/* About skeleton */}
      <section className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-2">
        <div className="space-y-4 px-6 py-20 lg:pr-16">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Skeleton className="min-h-[400px] w-full rounded-none" />
      </section>

      {/* Services skeleton */}
      <section className="bg-surface-muted">
        <div className="mx-auto max-w-6xl space-y-8 px-6 py-20">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-3/4 w-full rounded-md" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
