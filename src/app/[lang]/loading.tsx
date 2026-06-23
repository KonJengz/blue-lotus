import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Hero Skeleton */}
      <div className="mb-16 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-14 w-3/4 sm:text-5xl" />
          <Skeleton className="h-20 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
        <Skeleton className="hidden h-96 w-full rounded-2xl lg:block" />
      </div>

      {/* Services Skeleton */}
      <div className="space-y-8">
        <Skeleton className="mx-auto h-8 w-48" />
        <div className="grid gap-6 sm:grid-cols-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
}
