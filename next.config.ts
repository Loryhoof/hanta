import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    const extraDomains = (process.env.REDIRECT_DOMAINS ?? "")
      .split(",")
      .map((domain) => domain.trim())
      .filter(Boolean);

    return [
      {
        source: "/news/who-disease-outbreak-news-watch",
        destination: "/news/2026-DON599",
        permanent: true,
      },
      ...extraDomains.map((domain) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: domain }],
        destination: "https://hantavirusprevention.org/:path*",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
