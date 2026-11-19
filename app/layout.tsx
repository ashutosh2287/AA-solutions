import type { Metadata, Viewport } from "next";

import "./globals.css";

import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { site } from "@/content/site";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { organizationJsonLd, siteUrl, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: siteUrl,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#131420" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} h-full`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ThemeProvider>
          <a
            href="#main-content"
            className="bg-primary text-primary-foreground sr-only rounded-lg px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
          >
            Skip to content
          </a>

          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Analytics vercel={process.env.VERCEL === "1"} />
      </body>
    </html>
  );
}
