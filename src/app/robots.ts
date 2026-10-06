import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/customer",
          "/technician",
          "/profile",
          "/login",
          "/register",
          "/apply",
          "/forgot-password",
          "/vendors/details",
          "/api/",
        ],
      },
    ],
  };
}
