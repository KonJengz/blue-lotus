import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LotusMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <LotusMark className="mb-8 h-24 w-24 text-accent opacity-50" />
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-md text-muted">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
        removed or you entered the wrong URL.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Return Home
      </Link>
    </div>
  );
}
