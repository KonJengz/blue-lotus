export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted/20 rounded-md ${className}`}
      aria-hidden="true"
    />
  );
}
