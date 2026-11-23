import type { Metadata } from "next";

import { site } from "@/content/site";

/** Absolute, trailing-slash-free base URL used for canonicals and sitemaps. */
export const siteUrl = site.url.replace(/\/+$/, "");

export function absoluteUrl(path = "/"): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalised === "/" ? "" : normalised}`;
}

type OpenGraphType = "website" | "article" | "profile";

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical URL. */
  path: string;
  type?: OpenGraphType;
  noIndex?: boolean;
}

/**
 * Builds consistent per-page metadata.
 *
 * Open Graph / Twitter images are supplied by each route's `opengraph-image`
 * file convention, so they are intentionally not set here.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  // Social cards are often shown without page context, so they always carry
  // the brand name. `<title>` is handled by the root layout template.
  const socialTitle = title.includes(site.name) ? title : `${title} — ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      title: socialTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}

type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    description: site.description,
    email: site.contact.email,
    ...(site.foundingYear ? { foundingDate: String(site.foundingYear) } : {}),
    ...(site.socials.length > 0
      ? { sameAs: (site.socials as readonly { href: string }[]).map((social) => social.href) }
      : {}),
    knowsAbout: [
      "Custom Website Design",
      "Custom Mobile Apps",
      "UI/UX design",
    ],
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    description: site.description,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
  };
}

interface ServiceJsonLdInput {
  name: string;
  description: string;
  path: string;
}

export function serviceJsonLd({
  name,
  description,
  path,
}: ServiceJsonLdInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "IN",
  };
}

export function faqJsonLd(
  faqs: readonly { question: string; answer: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface CreativeWorkJsonLdInput {
  name: string;
  description: string;
  path: string;
  liveUrl?: string;
  tags: readonly string[];
}

export function creativeWorkJsonLd({
  name,
  description,
  path,
  liveUrl,
  tags,
}: CreativeWorkJsonLdInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: absoluteUrl(path),
    creator: { "@id": `${siteUrl}/#organization` },
    keywords: tags.join(", "),
    ...(liveUrl ? { sameAs: liveUrl } : {}),
  };
}

export function contactPageJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: absoluteUrl("/contact"),
    about: { "@id": `${siteUrl}/#organization` },
  };
}
