import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    lang: siteConfig.lang,
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: siteConfig.themeColor,
    categories: ["business", "productivity", "utilities"],
    shortcuts: [
      { name: "Sign in", url: "/login" },
      { name: "Book a service", url: "/customer/create-booking" },
      { name: "My profile", url: "/profile" },
    ],
  };
}
