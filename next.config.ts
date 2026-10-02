import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  register: true,
  reloadOnOnline: true,
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  turbopack: {},
};

export default withSerwist(nextConfig);
