import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div aria-busy="true">
      {/* Hero Skeleton */}
      <section className="relative h-[calc(86svh-4rem)] min-h-[480px] max-h-[760px] overflow-hidden border-b border-border bg-surface-muted">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 py-10 sm:px-6 sm:py-12 lg:items-center lg:py-16">
          <div className="w-full max-w-2xl space-y-5">
            <Skeleton className="h-4 w-36 bg-surface/70" />
            <Skeleton className="h-24 w-full max-w-xl bg-surface/70 sm:h-32" />
            <Skeleton className="h-20 w-full max-w-xl bg-surface/70" />
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-12 w-36 bg-surface/70" />
              <Skeleton className="h-12 w-44 bg-surface/70" />
            </div>
            <Skeleton className="h-5 w-56 bg-surface/70" />
          </div>
        </div>
      </section>

      {/* Services Skeleton */}
      <section className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6">
        <Skeleton className="mx-auto h-8 w-48" />
        <div className="grid gap-6 sm:grid-cols-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </section>
    </div>
  );
}
