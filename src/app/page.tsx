"use client";

import { useEffect } from "react";
import { defaultLocale } from "@/i18n/locales";

/**
 * The bare "/" route. Static export can't use middleware, so we redirect to the
 * default locale on the client. This works in both `bun dev` and the export.
 */
export default function RootRedirect() {
  const target = `/${defaultLocale}/`;

  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <p className="text-sm text-muted">
        Redirecting to{" "}
        <a href={target} className="font-medium text-accent hover:underline">
          Blue Lotus
        </a>
        …
      </p>
    </div>
  );
}
