import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/services"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: absoluteUrl("/work"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/process"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
