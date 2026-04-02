import type { MetadataRoute } from "next";
import { getCars } from "@/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://goodcarmarket.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/car-valuation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/car-selling`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/loan-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic car detail pages
  let carPages: MetadataRoute.Sitemap = [];
  const result = await getCars({ page: 1, pageSize: 1000 });

  if (result.success) {
    carPages = result.data.items
      .filter((car) => car.isActive)
      .map((car) => ({
        url: `${baseUrl}/cars/${car.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  }

  return [...staticPages, ...carPages];
}
