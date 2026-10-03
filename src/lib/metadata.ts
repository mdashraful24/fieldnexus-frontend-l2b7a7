import type { Metadata } from "next";

const DEFAULT_SITE_URL = "http://localhost:3000";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(
  /\/+$/,
  "",
);

export const siteConfig = {
  name: "Field Nexus",
  shortName: "Field Nexus",
  url: siteUrl,
  locale: "en_US",
  lang: "en",
  themeColor: "#007AFF",
  tagline: "Field service management for vendors, technicians, and customers",
  description:
    "Field Nexus is a field service management platform where customers raise work orders, admins approve and assign them, vendor teams dispatch technicians, and every job is tracked from the first request to the final payment.",
  keywords: [
    "field service management",
    "work order management",
    "technician dispatch",
    "vendor management",
    "service booking platform",
    "field operations software",
    "Field Nexus",
  ],
} as const;

export type PageMetadata = {
  title: NonNullable<Metadata["title"]>;
  description: string;
  path?: string;
  noIndex?: boolean;
};

const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const privateRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
};

function resolveTitle(title: NonNullable<Metadata["title"]>): string {
  if (typeof title === "string") {
    return `${title} | ${siteConfig.name}`;
  }

  if ("absolute" in title) {
    return title.absolute;
  }

  return title.default ?? siteConfig.name;
}

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: PageMetadata): Metadata {
  const socialTitle = resolveTitle(title);

  return {
    title,
    description,
    ...(noIndex
      ? { robots: privateRobots }
      : { alternates: { canonical: path }, robots: indexableRobots }),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}
