"use client";

import { useEffect } from "react";

export function RootLocaleRedirect({ target }: { target: string }) {
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
