import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a fully static site (HTML/CSS/JS in `out/`) that can be hosted anywhere.
  output: "export",
  // Static export cannot use the default image optimizer, so serve images as-is.
  images: { unoptimized: true },
  // Emit folder-style routes (`/services/index.html`) for clean static hosting.
  trailingSlash: true,
  // Keep the React Compiler enabled (already configured for this project).
  reactCompiler: true,
};

export default nextConfig;
